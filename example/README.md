// example/src/App.tsx
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
```

使用说明:

1. 在你的项目中安装依赖:
```bash
npm install @idinghuo/ui @idinghuo/hooks @mui/material @emotion/react @emotion/styled
```

2. 在你的项目入口文件中导入样式:
```tsx
import '@idinghuo/ui/dist/tailwind.css';
```

3. 在你的 tailwind.config.js 中添加内容路径:
```js
module.exports = {
  content: [
    // ...其他路径
    "node_modules/@idinghuo/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // ...其他配置
}
```

这个版本的组件库:
1. 集成了 MUI 组件库
2. 使用 Tailwind CSS 进行样式管理
3. 使用 class-variance-authority 实现组件变体
4. 提供了更多的自定义选项
5. 添加了加载状态和错误处理
6. 提供了更多的基础组件

需要我详细解释任何部分吗？或者需要添加其他组件？