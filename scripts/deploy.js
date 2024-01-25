const hre = require("hardhat");

const deployerAddress = '0xd687EaE068e4D6Be9D9392C1AcD99BbF3aBC76C6';
async function main() {
  console.log("deploying: caller...");
  const Contract = await hre.ethers.getContractFactory("LProvider");
  const contract = await Contract.deploy();
  
  let tx = await contract.waitForDeployment();
  console.log(tx.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
