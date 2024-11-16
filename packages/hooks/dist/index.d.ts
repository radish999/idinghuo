declare const useWallet: () => {
    connect: () => Promise<void>;
    disconnect: () => void;
    address: string | null;
    balance: string | null;
    chainId: number | null;
    isConnected: boolean;
    error: Error | null;
};

export { useWallet };
