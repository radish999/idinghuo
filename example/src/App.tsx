import React from 'react';
import { WalletButton, Card } from '@idinghuo/ui';
import { useWallet } from '@idinghuo/hooks';

export default function App() {
  const { balance, chainId } = useWallet();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-end">
          <WalletButton variant="default" size="lg" />
        </div>

        <Card
          title="钱包信息"
          subtitle="查看您的钱包状态"
          className="w-full"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">余额</p>
                <p className="text-lg font-medium">
                  {balance ? `${balance} ETH` : '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">链 ID</p>
                <p className="text-lg font-medium">
                  {chainId || '-'}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}