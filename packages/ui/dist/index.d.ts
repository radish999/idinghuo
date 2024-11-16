import React from 'react';
import { ClassValue } from 'clsx';

interface WalletButtonProps {
    className?: string;
    connectText?: string;
    disconnectText?: string;
}
declare const WalletButton: React.FC<WalletButtonProps>;

interface CardProps {
    title?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}
declare const Card: React.FC<CardProps>;

declare function cn(...inputs: ClassValue[]): string;

export { Card, WalletButton, cn };
