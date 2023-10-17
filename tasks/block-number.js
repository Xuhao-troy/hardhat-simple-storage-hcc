const { task } = require("hardhat/config");

task("block-number", "Prints the current block number").setAction(
  // const blockTask = async function() => {} 等价于 async function blockTask(){}
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current block number:${blockNumber}`);
  }
);
