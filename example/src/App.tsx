// example/src/App.tsx
import '@idinghuo/ui/dist/index.css';  // 导入样式
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

export default App;