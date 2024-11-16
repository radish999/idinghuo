// packages/hooks/src/useWallet.ts
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

interface WalletState {
  address: string | null;
  balance: string | null;
  chainId: number | null;
  isConnected: boolean;
  error: Error | null;
}

export const useWallet = () => {
  const [state, setState] = useState<WalletState>({
    address: null,
    balance: null,
    chainId: null,
    isConnected: false,
    error: null,
  });

  const updateWalletState = useCallback(async (address: string) => {
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('No ethereum wallet found');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();
      
      setState({
        address,
        balance: ethers.utils.formatEther(balance),
        chainId: network.chainId,
        isConnected: true,
        error: null,
      });
    } catch (error) {
      setState(prev => ({ ...prev, error: error as Error }));
    }
  }, []);

  const connect = useCallback(async () => {
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('No ethereum wallet found');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const accounts = await provider.send('eth_requestAccounts', []);
      if (accounts[0]) await updateWalletState(accounts[0]);
    } catch (error) {
      setState(prev => ({ ...prev, error: error as Error }));
    }
  }, [updateWalletState]);

  const disconnect = useCallback(() => {
    setState({
      address: null,
      balance: null,
      chainId: null,
      isConnected: false,
      error: null,
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts[0]) updateWalletState(accounts[0]);
        else disconnect();
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, [updateWalletState, disconnect]);

  return {
    ...state,
    connect,
    disconnect,
  };
};