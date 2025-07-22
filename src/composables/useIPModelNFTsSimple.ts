// composables/useIPModelNFTsSimple.ts
import { ref, watch, computed, type Ref } from 'vue';
import { ethers, type BrowserProvider } from 'ethers';
import type {
    IPModelNFT,
    IPModelGroup,
    GroupedNFTs
} from '../types/type.ts';

// ERC1155 IP Model contract address
const IP_MODEL_CONTRACT_ADDRESS = '0xC27c894F4661A0FE5fF36341F298d33cd4876B44';

// 简化的 ABI，只包含我们需要的函数
const SIMPLIFIED_ABI = [
    'function getGroupCount() view returns (uint256)',
    'function getGroupInfo(uint256 groupId) view returns (string, string, uint256, uint256, bool, uint256, address)',
    'function balanceOf(address account, uint256 id) view returns (uint256)',
    'function uri(uint256 tokenId) view returns (string)',
];

export function useIPModelNFTsSimple(
    provider: Ref<BrowserProvider | null>,
    address: Ref<string | null>
) {
    // 响应式状态
    const nfts = ref<IPModelNFT[]>([]);
    const groups = ref<IPModelGroup[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // 计算属性：分组后的NFT
    const groupedNFTs = computed<GroupedNFTs>(() => {
        const result: GroupedNFTs = {
            active: [],
            inactive: [],
            highSupply: [],
            lowSupply: [],
            free: [],
            paid: [],
        };

        nfts.value.forEach(nft => {
            if (nft.groupInfo) {
                // 按活跃状态分类
                if (nft.groupInfo.isActive) {
                    result.active.push(nft);
                } else {
                    result.inactive.push(nft);
                }

                // 按供应量分类
                const supplyRatio = Number(nft.groupInfo.currentSupply) / Number(nft.groupInfo.maxSupply);
                if (supplyRatio > 0.8) {
                    result.highSupply.push(nft);
                } else {
                    result.lowSupply.push(nft);
                }

                // 按价格分类
                if (nft.groupInfo.price === '0') {
                    result.free.push(nft);
                } else {
                    result.paid.push(nft);
                }
            }
        });

        return result;
    });

    // 获取合约实例
    const getContract = () => {
        if (!provider.value) {
            console.log('No provider available');
            return null;
        }
        try {
            console.log('Creating contract with address:', IP_MODEL_CONTRACT_ADDRESS);
            return new ethers.Contract(
                IP_MODEL_CONTRACT_ADDRESS,
                SIMPLIFIED_ABI,
                provider.value
            );
        } catch (err) {
            console.error('Failed to create contract:', err);
            return null;
        }
    };

    // 获取所有群组信息
    const fetchGroups = async () => {
        const contract = getContract();
        if (!contract) {
            console.log('No contract available for fetchGroups');
            return [];
        }

        try {
            console.log('Fetching group count...');
            const groupCount = await contract.getGroupCount();
            const groupCountNumber = Number(groupCount);
            console.log('Total groups found:', groupCountNumber);

            if (groupCountNumber === 0) {
                console.log('No groups found in contract');
                return [];
            }

            const groupPromises = [];
            // 群组从1开始，不是0
            for (let i = 1; i <= groupCountNumber; i++) {
                groupPromises.push(
                    (async () => {
                        try {
                            console.log(`Fetching group ${i}...`);
                            const groupInfo = await contract.getGroupInfo(i);
                            console.log(`Group ${i} info:`, groupInfo);
                            return {
                                groupId: i.toString(),
                                name: groupInfo[0],
                                description: groupInfo[1],
                                maxSupply: groupInfo[2].toString(),
                                currentSupply: groupInfo[3].toString(),
                                isActive: groupInfo[4],
                                price: groupInfo[5].toString(),
                                payToken: groupInfo[6],
                            } as IPModelGroup;
                        } catch (err) {
                            console.error(`Failed to fetch group ${i}:`, err);
                            return null;
                        }
                    })()
                );
            }

            const results = await Promise.all(groupPromises);
            const validGroups = results.filter((group): group is IPModelGroup => group !== null);
            console.log('Valid groups fetched:', validGroups);
            return validGroups;
        } catch (err) {
            console.error('Failed to fetch groups:', err);
            return [];
        }
    };

    // 获取用户在指定群组的NFT余额
    const fetchUserNFTsInGroup = async (groupId: string) => {
        const contract = getContract();
        if (!contract || !address.value) return [];

        try {
            // 对于ERC1155，tokenId通常与groupId相同
            const balance = await contract.balanceOf(address.value, groupId);
            console.log(`Balance for group ${groupId}:`, balance.toString());

            if (balance > 0) {
                const uri = await contract.uri(groupId);
                console.log(`URI for group ${groupId}:`, uri);

                return [{
                    tokenId: groupId,
                    groupId: groupId,
                    balance: balance.toString(),
                    uri: uri,
                }] as IPModelNFT[];
            }

            return [];
        } catch (err) {
            console.error(`Failed to fetch NFTs for group ${groupId}:`, err);
            return [];
        }
    };

    // 获取用户所有NFT
    const fetchUserNFTs = async () => {
        if (!provider.value || !address.value) {
            console.log('No provider or address available:', {
                provider: !!provider.value,
                address: !!address.value
            });
            nfts.value = []; // 清空用户NFT，但保留群组数据
            return;
        }

        try {
            console.log('Starting fetchUserNFTs for address:', address.value);
            loading.value = true;
            error.value = null;

            // 先获取所有群组
            const allGroups = await fetchGroups();
            console.log('All groups fetched:', allGroups.length);
            groups.value = allGroups;

            if (allGroups.length === 0) {
                console.log('No groups found, setting empty NFTs array');
                nfts.value = [];
                return;
            }

            // 为每个群组检查用户是否拥有NFT
            const nftPromises = allGroups.map(group =>
                fetchUserNFTsInGroup(group.groupId)
            );

            const nftResults = await Promise.all(nftPromises);
            const userNFTs = nftResults.flat();
            console.log('User NFTs found:', userNFTs.length);

            // 为每个NFT添加群组信息和元数据
            const enrichedNFTs = await Promise.all(
                userNFTs.map(async (nft) => {
                    const groupInfo = allGroups.find(g => g.groupId === nft.groupId);

                    // 尝试获取元数据
                    let metadata = null;
                    try {
                        if (nft.uri && nft.uri !== '' && !nft.uri.includes('undefined')) {
                            console.log(`Fetching metadata from URI: ${nft.uri}`);
                            const response = await fetch(nft.uri);
                            if (response.ok) {
                                metadata = await response.json();
                                console.log(`Metadata fetched for NFT ${nft.tokenId}:`, metadata);
                            }
                        }
                    } catch (err) {
                        console.warn(`Failed to fetch metadata for NFT ${nft.tokenId}:`, err);
                    }

                    return {
                        ...nft,
                        groupInfo,
                        metadata,
                    } as IPModelNFT;
                })
            );

            console.log('Enriched NFTs:', enrichedNFTs);
            nfts.value = enrichedNFTs;

        } catch (err: any) {
            console.error('Failed to fetch IP Model NFTs:', err);
            error.value = err.message || 'Failed to fetch IP Model NFTs';
        } finally {
            loading.value = false;
        }
    };

    // 仅获取群组信息（不需要钱包连接）
    const fetchGroupsOnly = async () => {
        if (!provider.value) {
            console.log('No provider available for fetchGroupsOnly');
            return;
        }

        try {
            console.log('Starting fetchGroupsOnly...');
            loading.value = true;
            error.value = null;

            const allGroups = await fetchGroups();
            console.log('Groups fetched:', allGroups.length);
            groups.value = allGroups;

        } catch (err: any) {
            console.error('Failed to fetch groups:', err);
            error.value = err.message || 'Failed to fetch groups';
        } finally {
            loading.value = false;
        }
    };

    // 获取指定群组的详细信息
    const getGroupInfo = async (groupId: string): Promise<IPModelGroup | null> => {
        const contract = getContract();
        if (!contract) return null;

        try {
            const groupInfo = await contract.getGroupInfo(groupId);
            return {
                groupId,
                name: groupInfo[0],
                description: groupInfo[1],
                maxSupply: groupInfo[2].toString(),
                currentSupply: groupInfo[3].toString(),
                isActive: groupInfo[4],
                price: groupInfo[5].toString(),
                payToken: groupInfo[6],
            } as IPModelGroup;
        } catch (err) {
            console.error(`Failed to fetch group info for ${groupId}:`, err);
            return null;
        }
    };

    // 检查用户在指定群组的余额
    const checkBalance = async (groupId: string): Promise<string> => {
        const contract = getContract();
        if (!contract || !address.value) return '0';

        try {
            const balance = await contract.balanceOf(address.value, groupId);
            return balance.toString();
        } catch (err) {
            console.error(`Failed to check balance for group ${groupId}:`, err);
            return '0';
        }
    };

    // 监听 provider 和 address 变化
    watch([provider, address], ([newProvider, newAddress]) => {
        if (newProvider && newAddress) {
            // 有钱包连接时，获取用户NFT和群组信息
            fetchUserNFTs();
        } else if (newProvider) {
            // 只有provider时，仅获取群组信息
            fetchGroupsOnly();
        } else {
            // 没有provider时重置状态
            groups.value = [];
            nfts.value = [];
        }
    }, { immediate: true });

    return {
        nfts,
        groups,
        groupedNFTs,
        loading,
        error,
        refetch: fetchUserNFTs,
        getGroupInfo,
        checkBalance,
    };
}