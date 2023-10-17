require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("./tasks/block-number");

//下面两个已经包含在hardhat-toolbox中，无需单独添加
require("hardhat-gas-reporter"); //yarn add hardhat-gas-reporter --dev
require("solidity-coverage"); //yarn add --dev solidity-coverage。  执行命令 yarn hardhat coverage，会输出代码覆盖率的报告coverage.json

//为了读取.env中的变量，需要1）执行命令yarn add --dev dotenv 2）在本文件中添加require("dotenv")，引入包。
const GOERLI_RPC_URL =
  process.env.GOERLI_RPC_URL ||
  "https://eth-goerli.g.alchemy.com/v2/Dhgv_bgn4QfcVzYed-zfp4tk88SdR44O"; //通过双竖线连接默认值
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat", //如果不添加网络信息，默认采用hardhat的虚拟网络
  networks: {
    goerli: {
      // yarn hardhat run scripts/deploy.js --network goerli
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  solidity: "0.8.7",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },

  //执行yarn hardhat test时，会输出gas报告
  gasReporter: {
    enabled: false, //正常设置为false，当需要查看gas消耗时再设置为true
    outputFile: "gas-report.txt",
    //导出文件时颜色会乱，所以不设置颜色
    noColors: true,
    //获取gas消耗对应的usd金额
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    // token: "MATIC", //指定计算运行在polygon上的gas消耗
  },
};
