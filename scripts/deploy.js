// imports
const { ethers, run, network } = require("hardhat"); // run 允许我们运行所有hardhat的任务

//async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();
  let address = await simpleStorage.getAddress();
  console.log(`Deployed contract to:${address}`);

  // console.log(network.config);
  //在javascript语法中，===比较时不进行类型转换，而==则进行类型转换。举例：1） 4=="4": true. 2) 4==="4": false.
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deploymentTransaction().wait(2);
    await verify(address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value is:${currentValue}`);

  //Update currentValue
  const txResponse = await simpleStorage.store(7);
  await txResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value is:${updatedValue}`);
}

//在etherscan上自动做代码验证
async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    }); //等同于在命令行中执行 yarn hardhat verify
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
}

//main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
