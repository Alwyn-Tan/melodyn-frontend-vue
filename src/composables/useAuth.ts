import {ref, watch, onMounted} from 'vue';
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

    const authState = ref<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: false,
    });

    const loginWithWallet = async (): Promise<void> => {
        try {
            authState.value = {...authState.value, isLoading: true};
            await connectWallet();
        } catch (error) {
            console.error('Error during wallet login:', error);
            authState.value = {...authState.value, isLoading: false};
        }
    }

    const logout = (): void => {
        disconnectWallet();
        authState.value = {
            user: null,
            isAuthenticated: false,
            isLoading: false,
        }
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
            }

            authState.value = {
                user,
                isAuthenticated: true,
                isLoading: false,
            };

            localStorage.setItem('user', JSON.stringify(user));
        } else {
            authState.value = {
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
            localStorage.removeItem('user');
        }
    });

    onMounted(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser && wallet.value.isConnected) {
            try {
                const user = JSON.parse(savedUser);
                authState.value = {
                    user,
                    isAuthenticated: true,
                    isLoading: false,
                };
            } catch (error) {
                console.error('Error parsing user from local storage:', error);
                localStorage.removeItem('user')
            }
        }
    });

    return {
        ...authState.value,
        get isLoading() {
            return authState.value.isLoading || isConnecting.value;
        },
        error: walletError,
        loginWithWallet,
        logout,
        wallet: wallet.value,
    }
};

