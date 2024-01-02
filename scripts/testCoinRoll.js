
const { ethers } = require("hardhat");
const  { eventsListiner } = require("./subscription.js")
const { NonceManager } = require("@ethersproject/experimental");;
require('dotenv').config()

// TODO:  creat a class or multimple classes to handle differetn methods and actions
// like sending eth and withdrawing eth, listen to diferent events of contracts
//   fetch defi token prices, trace nft floor price  *least important
//test wallets
const contractDeployer = process.env.ADDRESS_0_PRIVATE_KEY;
const ADDRESS_1 = process.env.ADDRESS_1_PRIVATE_KEY;
const contractAdress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const contractABI  = require("../artifacts/contracts/coinroll.sol/coinRoll.json");
const { send } = require("process");
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');
//const signer  = new ethers.Wallet(process.env.ADDRESS_0_PRIVATE_KEY, provider);
const signer  = new ethers.Wallet(process.env.ADDRESS_1_PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAdress, contractABI, provider);;


async function sendEther(amount) {
    try {
        let  transactionRequest = await signer.sendTransaction(
            { 
                to: contractAdress,
                value: ethers.parseUnits(`${amount}`)// Sending 200 ETH
            });
        let sendTx = await transactionRequest;
        console.log(sendTx);
    } catch (error) {
        console.error(error);
    }
}


async function makeAbet() {
    try {

        let tx = await contract.placeBet(1);
        console.log(tx);

    } catch (error) {
        console.error(error);
    }
}
async function main() {


    let balance = await provider.getBalance(contractAdress);
    console.log('----------------------------------------');

    let contractSigner = contract.connect(signer);

    let newTx = sendEther(100);
    console.log(newTx);

    console.log('----------------------------------------');
    console.log('\n New contract balance: ',balance, '\n');
}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});