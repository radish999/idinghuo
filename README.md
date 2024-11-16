# @idinghuo/ui

基于 Material UI 和 Tailwind CSS 的 Web3 组件库

## 安装

```bash
npm install @idinghuo/ui @mui/material @emotion/react @emotion/styled
```

## 使用

1. 导入样式
```tsx
import '@idinghuo/ui/dist/index.css';
```

2. 配置 tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ... 其他路径
    './node_modules/@idinghuo/ui/dist/**/*.{js,mjs}'
  ],
  // ... 其他配置
};
```

3. 使用组件
```tsx
import { WalletButton, Card } from '@idinghuo/ui';

function App() {
  return (
    <div className="p-4">
      <Card title="Web3 钱包">
        <WalletButton />
      </Card>
    </div>
  );
}
```



idinghuo/
├── package.json
├── pnpm-workspace.yaml      # 新增的工作空间配置
├── .npmrc
├── .changeset/
│   └── config.json
├── packages/
    ├── hooks/
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/
    │       └── index.ts
    └── ui/
        ├── package.json
        ├── tsconfig.json
        ├── tailwind.config.js
        └── src/
            ├── styles/
            │   └── tailwind.css
            └── index.ts

