
const { ethers } = require("hardhat");

require('dotenv').config()

// TODO:  creat a class or multimple classes to handle differetn methods and actions
// like sending eth and withdrawing eth, listen to diferent events of contracts
//   fetch defi token prices, trace nft floor price  *least important
//test wallets
const contractDeployer = process.env.ADDRESS_0_PRIVATE_KEY;
const ADDRESS_1 = process.env.ADDRESS_1_PRIVATE_KEY;

const contractAdress = '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0';
const contractABI  = require("../artifacts/contracts/coinroll.sol/coinRoll.json");
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');
//const signer  = new ethers.Wallet(process.env.ADDRESS_0_PRIVATE_KEY, provider);
const signer  = new ethers.Wallet(process.env.ADDRESS_1_PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAdress, contractABI, provider);

async function sendEther(amount) {
    try {
        let  transactionRequest = await signer.sendTransaction(
            { 
                to: contractAdress,
                value: ethers.parseUnits(`${amount}`)// Sending 200 ETH
            });
        let sendTx = await contract.receive(transactionRequest);
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


    // @notice send ether code block

    //let tx = await sendEther();
    
   // console.log(tx);

    // @notice txSigner is needed to actually allow the interaction with the contract
    // if not it will fail
   let txSigner = contract.connect(signer);
   console.log(`this is the txSiger: ${txSigner}\n`);

   let newTx = await txSigner.withdrawal(ethers.parseUnits('1'));
   console.log(`newTx : \n${newTx}`);

    // at this moment the contract is reciving fund it has 900 plus eth
    //i will place a bet eith out passing an amount, to se if the function run

    let balance = await provider.getBalance(contractAdress);
    console.log('----------------------------------------');

    console.log('\n contract balance: ',balance, '\n');


   

}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});