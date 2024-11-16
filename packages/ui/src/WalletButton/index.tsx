import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { AccountBalanceWallet, LinkOff } from '@mui/icons-material';
import { useWallet } from '@idinghuo/hooks';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary-500 text-white hover:bg-primary-600',
        outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50',
        ghost: 'text-primary-500 hover:bg-primary-50',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3',
        lg: 'h-12 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface WalletButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  connectText?: string;
  disconnectText?: string;
}

export const WalletButton = ({
  className,
  variant,
  size,
  connectText = '连接钱包',
  disconnectText = '断开连接',
}: WalletButtonProps) => {
  const { isConnected, address, connect, disconnect, error } = useWallet();
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      if (isConnected) {
        await disconnect();
      } else {
        await connect();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(buttonVariants({ variant, size }), className)}
      startIcon={isConnected ? <LinkOff /> : <AccountBalanceWallet />}
      disabled={loading}
    >
      {loading ? (
        <CircularProgress size={20} className="mr-2" />
      ) : (
        <>
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
        </>
      )}
    </Button>
  );
};