const hre = require("hardhat");
const { ethers, showThrottleMessage } = require("ethers");

require('dotenv').config()

//test wallets
const contractDeployer = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const tWallet_1_address = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

const contractAdress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const contractABI  = require("../artifacts/contracts/coinroll.sol/coinRoll.json");
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');
const signer  = new ethers.Wallet(process.env.ADDRESS_0_PRIVATE_KEY, provider);
//const signer2  = new ethers.Wallet(process.env.ADDRESS_1_PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAdress, contractABI, provider);
const transactionRequest = {
    to: tWallet_1_address,
    value: ethers.parseUnits('931', 'ether')// Sending 1 ETH
    // Other optional parameters can be included here
  };

async function main() {

    let balance = await provider.getBalance(contractDeployer);
    console.log('contract deployer balance: ', balance);

    const tx = await signer.sendTransaction(transactionRequest);
    console.log(tx);

    let newbalance = await provider.getBalance(contractDeployer);
    console.log('contract deployer balance after transaction: ', newbalance);

}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});