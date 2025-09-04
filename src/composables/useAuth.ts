import {ref, watch, onMounted, reactive, toRefs} from 'vue';
import {useWallet} from "./useWallet.ts";

export interface UserType {
    id: string;
    name: string;
    avatar: string;
    provider: 'wallet';
    createdAt: Date;
    nftCount: number;
    walletAddress: string;
}

interface AuthState {
    user: UserType | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export function useAuth() {
    const {wallet, connectWallet, disconnectWallet, isConnecting, error: walletError} = useWallet();

    const authState = reactive<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: false,
    });

    const loginWithWallet = async (): Promise<void> => {
        try {
            authState.isLoading = true;
            await connectWallet();
        } catch (error) {
            console.error('Error during wallet login:', error);
            authState.isLoading = false;
        }
    }

    const logout = (): void => {
        disconnectWallet();
        authState.user = null;
        authState.isAuthenticated = false;
        authState.isLoading = false;
        localStorage.removeItem('user')
    }

    const createNewUser = (walletAddress: string): UserType => ({
        id: walletAddress,
        name: `User ${walletAddress
            .slice(0, 6)}...${walletAddress
            .slice(-4)}`,
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${walletAddress}`,
        provider: 'wallet',
        createdAt: new Date(),
        nftCount: 0,
        walletAddress,
    })

    watch([() => wallet.value.isConnected, () => wallet.value.address], () => {
        if (wallet.value.isConnected && wallet.value.address) {
            const savedUser = localStorage.getItem('user');
            let user: UserType;

            if (savedUser) {
                try {
                    const parsedUser = JSON.parse(savedUser);
                    user = {
                        ...parsedUser,
                        walletAddress: wallet.value.address,
                        createdAt: new Date(parsedUser.createdAt),
                    };
                } catch (error) {
                    console.error('Error parsing user from local storage:', error);
                    user = createNewUser(wallet.value.address);
                }
            } else {
                user = createNewUser(wallet.value.address);
                console.log('New user created:', user.name);
            }

            authState.user = user;
            authState.isAuthenticated = true;
            authState.isLoading = false;
            console.log('Authentication status changed during watch:', authState.isAuthenticated)
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            authState.user = null;
            authState.isAuthenticated = false;
            authState.isLoading = false;
            localStorage.removeItem('user');
        }
    });

    onMounted(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser && wallet.value.isConnected) {
            try {
                const user = JSON.parse(savedUser);
                authState.user = user;
                authState.isAuthenticated = true;
                authState.isLoading = false;
            } catch (error) {
                console.error('Error parsing user from local storage:', error);
                localStorage.removeItem('user')
            }
        }
    });

    return {
        ...toRefs(authState),
        get isLoading() {
            return authState.isLoading || isConnecting.value;
        },
        error: walletError,
        loginWithWallet,
        logout,
        wallet: wallet.value,
    }
}
