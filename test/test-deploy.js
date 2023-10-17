const { ethers } = require("hardhat");
const { expect, assert } = require("chai");
//hardhat的Mocha会识别describe关键字，
describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage;
  //指定在每个it方法执行前需要做的工作
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  //实际编写运行测试代码的地方

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue); //等价于： expect(currentValue.toString()).to.equal(expectedValue);
  });

  //如果有多个it方法，但只想测试其中某个，则执行 yarn hardhat test --grep ${区别字符} 如 store, 等效于在it后加only关键字
  it("Should update when we call store", async function () {
    const expectedValue = "7";

    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });

  //嵌套的describe有助于分离和模块化测试
  // describe("something", function () {
  //   beforeEach();
  //   it();
  //   it();
  // });
});
