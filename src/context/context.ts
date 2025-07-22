import {
    inject,
    provide,
    ref,
    reactive,
    watch,
    computed,
    ComputedRef,
    Ref as VueRef, type InjectionKey
} from 'vue';
import type {ethers} from 'ethers';
import type {IPModelNFT, IPModelGroup,GroupedNFTs} from "../types/type.ts";

interface Context{
    nfts: VueRef<IPModelNFT[]>;
    groups: VueRef<IPModelGroup[]>;
    groupedNFTs: VueRef<GroupedNFTs>;
    loading: VueRef<boolean>;
    error: VueRef<string | null>;
    refetch: () => void;
    getGroupInfo: (groupId: string) => Promise<IPModelGroup | null>;
    checkBalance: (groupId: string) => Promise<string>;
    currentGroupName: VueRef<string | null>;
    setCurrentGroupName: (name: string | null) => void;
}

const IPModelSymbol: InjectionKey<Context> = Symbol('Context');

interface IPModelProviderProps {
    provider: ethers.BrowserProvider | null;
    address: string | null;
}
export const IPModelProvider = defineComponent({
    props: {
        provider: {
            type: Object as () => ethers.BrowserProvider | null,
            default: null
        },
        address: {
            type: String,
            default: null
        }
    },
    setup(props, { slots }) {
        const {
            nfts,
            groups,
            loading,
            error,
            refetch,
            getNFTsByGroupType,
            getGroupInfo,
            checkBalance
        } = useIPModelNFTsSimple(props.provider, props.address);

        const groupedNFTs = ref<GroupedNFTs>({
            active: [],
            inactive: [],
            highSupply: [],
            lowSupply: [],
            free: [],
            paid: [],
        });

        // 当 nfts 变化时更新分组
        watch(nfts, () => {
            groupedNFTs.value = getNFTsByGroupType();
        }, { immediate: true });

        const currentGroupName = ref<string | null>(null);
        const setCurrentGroupName = (name: string | null) => {
            currentGroupName.value = name;
        };

        const context: IPModelContext = {
            nfts,
            groups,
            groupedNFTs,
            loading,
            error,
            refetch,
            getGroupInfo,
            checkBalance,
            currentGroupName,
            setCurrentGroupName
        };

        provide(IPModelSymbol, context);

        return () => slots.default?.();
    }
});

