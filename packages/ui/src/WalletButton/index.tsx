// packages/ui/src/WalletButton/index.tsx
import React from 'react';
import { Button } from '@mui/material';
import { useWallet } from 'idinghuo-hooks';
import { cn } from '../utils';

interface WalletButtonProps {
  className?: string;
  connectText?: string;
  disconnectText?: string;
}

export const WalletButton: React.FC<WalletButtonProps> = ({
  className,
  connectText = '连接钱包',
  disconnectText = '断开连接'
}) => {
  const { isConnected, address, connect, disconnect } = useWallet();

  return (
    <Button
      onClick={isConnected ? disconnect : connect}
      className={cn(
        'px-4 py-2 rounded-lg font-medium',
        isConnected ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600',
        className
      )}
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
    </Button>
  );
};