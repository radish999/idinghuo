// packages/ui/src/WalletButton.tsx
import React from 'react';
import { useWallet } from '@idinghuo/hooks';

interface WalletButtonProps {
  className?: string;
  connectText?: string;
  disconnectText?: string;
}

export const WalletButton: React.FC<WalletButtonProps> = ({
  className = '',
  connectText = '连接钱包',
  disconnectText = '断开连接',
}) => {
  const { isConnected, address, connect, disconnect } = useWallet();

  const handleClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isConnected 
          ? 'bg-red-500 hover:bg-red-600 text-white' 
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      } ${className}`}
    >
      {isConnected ? (
        <>
          {disconnectText}
          {address && (
            <span className="ml-2 text-sm opacity-80">
              ({address.slice(0, 6)}...{address.slice(-4)})
            </span>
          )}
        </>
      ) : (
        connectText
      )}
    </button>
  );
};
