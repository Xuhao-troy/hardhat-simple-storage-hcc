require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
//为了读取.env中的变量，需要1）执行命令yarn add --dev dotenv 2）在本文件中添加require("dotenv")，引入包。
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

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
  },
  solidity: "0.8.7",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
