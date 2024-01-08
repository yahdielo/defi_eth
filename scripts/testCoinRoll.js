
const { ethers } = require("hardhat");
const  { eventsListiner } = require("./maneger/subscription.js");
const { walletManeger } = require("./maneger/walletManeger.js");

require('dotenv').config()

// TODO:  creat a class or multimple classes to handle differetn methods and actions
// like sending eth and withdrawing eth, listen to diferent events of contracts
//   fetch defi token prices, trace nft floor price  *least important
//test wallets
const provider = new ethers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
const signer0 = new ethers.Wallet(process.env.WALLET_0_PRIVATE_KEY, provider); //this wallet is the deployer
const gameABI = require("./ABIs/Game.json");
const gameAddress = process.env.CONSUMER_ADDRESS;


async function main() {

    const constract = ethers.Contract(gameAddress, gameABI, provider);// cerate instance of contract
    //to call contract fucntion i need the contractsiger

    const contrcatSigner =  
    
}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});