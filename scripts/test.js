const { ethers } = require('ethers');
require('dotenv').config();

const kishuTokenAbi = require("./ABIs/kishuTokenAbi.json");
const popoTokenAddress = '0x654Ad4934C7644300dE1902bC321C7f1246E6E41';
const popoABI = require('./ABIs/POPO.json');
const tokenTransferABI = require('./ABIs/tokenTransfer.json');
const provider = new ethers.JsonRpcProvider(`${process.env.ALCHEMY_API_KEY}`)
const mundoDeJack = '0xb95D843aCd5816fFd201AeeF4A439E7CE8b88b2b';
const signer = new ethers.Wallet(process.env.WALLET_0_PRIVATE_KEY, provider);
const tokenTransferAddress ='0xc199482Ca1Ccc303EeB5434D98333552F192988D';
const callerAddress = '0xcC4cCB523f4293825a049Dc64E0B4BC74e460C4a';
const callerAbi = require('./ABIs/caller.json');
//const UniV2FactoryContractAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
//const kishuWethPairAddress = '0xf82d8ec196fb0d56c6b82a8b1870f09502a49f88';
//const kishuAddress = '0xA2b4C0Af19cC16a6CfAcCe81F192B024d625817D';
const deployer = '0xd687EaE068e4D6Be9D9392C1AcD99BbF3aBC76C6';

async function main() {

    const popo = new ethers.Contract(popoTokenAddress, popoABI , signer);
    const tokenTransfer = new ethers.Contract(tokenTransferAddress, tokenTransferABI, signer);
    const caller = new ethers.Contract(callerAddress, callerAbi, signer);

    //let newtx  = await popo.balanceOf(deployer);
    //format js big number to human readable
    //let value  = ethers.formatEther(tx);

    //@note currently when i try to tranfer the token using a smart contract it fails
    //i will try to call the allowance fucntion to see if that will let thw smart contract spend tokens
    //on my behalf
    //let newTx = await popo.allowance(deployer, tokenTransfer);
    //console.log(newTx);

    //approve the amount the spender can spend
    //let aprove = await popo.approve(tokenTransfer, '100000000000000000000000000');
    //console.log(aprove);

    let timeStamp = await provider.getBlock();
    console.log(timeStamp.timestamp);
    let deadline = timeStamp.timestamp ;
    console.log(deadline);
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});