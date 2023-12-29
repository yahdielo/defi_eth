
const { ethers } = require("hardhat");

require('dotenv').config()

//test wallets
const contractDeployer = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const tWallet_1_address = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

const contractAdress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const contractABI  = require("../artifacts/contracts/coinroll.sol/coinRoll.json");
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');
//const signer  = new ethers.Wallet(process.env.ADDRESS_0_PRIVATE_KEY, provider);
const signer  = new ethers.Wallet(process.env.ADDRESS_1_PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAdress, contractABI, provider);

async function main() {
  
    // Create a new instance of the Contract with a Signer, which allows
    // update methods

    /** @notice send ether code block
    const transactionRequest = await signer.sendTransaction(
        { to: contractAdress,
        value: ethers.parseUnits('200')// Sending 1 ETH
        // Other optional parameters can be included here
        });
    console.log(transactionRequest);
    */

    // at this moment the contract is reciving fund it has 900 plus eth
    //i will place a bet eith out passing an amount, to se if the function run

    let balance = await provider.getBalance(contractAdress);

    console.log('\n contract balance: ',balance, '\n');

    let tx = await contract.checkYourBet();
    console.log(tx);

    /**
    let contractSigner = contract.connect(signer);
    let tx = await contractSigner.placeBet(1, 1);
    console.log(tx);
    
    //let contractSigner = contract.connect(signer);
    let tx = await contract.placeBet(1, 1);
    console.log(tx);

    let balance = await provider.getBalance(contractAdress);
    console.log('contract balance: ',balance); 
    let newcurrentValue = await provider.getBalance(contractAdress);
    console.log('contract deployer balance: ',  newcurrentValue);
    */

}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});