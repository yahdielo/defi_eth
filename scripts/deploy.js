const hre = require("hardhat");

async function main() {
  console.log("deploying...");
  const Contract = await hre.ethers.getContractFactory("coinRoll");
  const contract = await Contract.deploy();
  
  let tx = await contract.waitForDeployment();

  console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
