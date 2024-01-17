
const { ethers } = require("hardhat");

require('dotenv').config()

// TODO:  creat a class or multimple classes to handle differetn methods and actions
// like sending eth and withdrawing eth, listen to diferent events of contracts
//   fetch defi token prices, trace nft floor price  *least important
//test wallets
const provider = new ethers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
const signer0 = new ethers.Wallet(process.env.WALLET_0_PRIVATE_KEY, provider); //this wallet is the deployer
const gameABI = require("./ABIs/joinGameContract.json");

const gameAddress = process.env.CONSUMER_ADDRESS;


async function main() {

    const constract = new ethers.Contract(gameAddress, gameABI, provider);

    const contractSigner =  new ethers.Contract(gameAddress, gameABI, signer0);// contract Signer instance

    let tx = await contractSigner.joinGame('0xd687EaE068e4D6Be9D9392C1AcD99BbF3aBC76C6');

    await tx.wait();
    console.log(tx);
    
}
main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});