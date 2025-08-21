import {ref} from 'vue';
import {ethers} from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

interface WalletState {
    isConnected: boolean;
    address: string | null;
    provider: ethers.BrowserProvider | null;
    signer: ethers.JsonRpcSigner | null;
    chainId: number | null;
}

export function useWallet() {
    const wallet = ref<WalletState>({
        isConnected: false,
        address: null,
        provider: null,
        signer: null,
        chainId: null,
    });

    const isConnecting = ref(false);
    const error = ref<string | null>(null);

    const connectWallet = async () => {
        try {
            isConnecting.value = true;
            error.value = null;

            const provider = await detectEthereumProvider();
            if (!provider) {
                throw new Error('MetaMask not detected. Please install MetaMask')
            }
            const ethersProvider = new ethers.BrowserProvider(provider as any);
            const accounts = await ethersProvider.send('eth_requestAccounts', [])
            if (accounts.length === 0) {
                throw new Error('No accounts found. Please connect your wallet.')
            }

            const signer = await ethersProvider.getSigner();
            const address = await signer.getAddress();
            const network = await ethersProvider.getNetwork();

            wallet.value = {
                isConnected: true,
                address,
                provider: ethersProvider,
                signer,
                chainId: Number(network.chainId),
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to connect wallet';
        } finally {
            isConnecting.value = false;
        }
    }

    const disconnectWallet = () => {
        wallet.value = {
            isConnected: false,
            address: null,
            provider: null,
            signer: null,
            chainId: null,
        }
    }

    return {
        wallet,
        connectWallet,
        disconnectWallet,
        isConnecting,
        error,
    }
}