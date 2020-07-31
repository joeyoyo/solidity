const fs = require('fs-extra');
const path = require('path');
// const config = require('config');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

// 1. 拿到 bytecode
const contractPath = path.resolve(__dirname, '../compiled/Car.json');
const { abi, bytecode } = require(contractPath);

// 2. 配置 provider
const provider = new HDWalletProvider(
    "fox velvet dwarf flavor parade update ranch artwork reflect cage oyster long",
    "https://ropsten.infura.io/v3/86cc652eba1045b5aaea42805534dded"
);

// 3. 初始化 web3 实例
const web3 = new Web3(provider);

(async () => {
    // 4. 获取钱包里面的账户
    const accounts = await web3.eth.getAccounts();
    console.log('合约部署账户:', accounts[0]);

    // 5. 创建合约实例并且部署
    console.time('合约部署耗时');
    console.log(abi);
    let params = JSON.stringify(abi);
    
    //  eth.getBlock("pending").gasLimit
    //  web3.eth.estimateGas({data: bytecode})
    const result = await new web3.eth.Contract([abi])
        .deploy({ data: bytecode })
        .send({ from: accounts[0],  gasPrice: '1490000',
        gas:8000000 });
    console.timeEnd('合约部署耗时');

    const contractAddress = result.options.address;

    console.log('合约部署成功:', contractAddress);
    // console.log('合约查看地址:', `https://rinkeby.etherscan.io/address/${contractAddress}`);

    // 6. 合约地址写入文件系统
    // const addressFile = path.resolve(__dirname, '../address.json');
    // fs.writeFileSync(addressFile, JSON.stringify(contractAddress));
    // console.log('地址写入成功:', addressFile);

    process.exit();
})();