// imports
const { ethers } = require("hardhat");
//async main
async function main() {
  const SimpleStoragaFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStoragaFactory.deploy();
  await simpleStorage.waitForDeployment();
  let address = await simpleStorage.getAddress();
  console.log(`Deployed contract to:${address}`);
}

//在etherscan上自动做代码验证
async function verify() {}
//main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
