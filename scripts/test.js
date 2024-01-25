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
const wethABI = require('./ABIs/WETHABI.json');
const WETH = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';
const kingDino = '0xd687EaE068e4D6Be9D9392C1AcD99BbF3aBC76C6';
const LPContract = '0x26384F6A5921Ad85c9ED4A460dDEe35edD238c5D';
//const UniV2FactoryContractAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
//const kishuWethPairAddress = '0xf82d8ec196fb0d56c6b82a8b1870f09502a49f88';
//const kishuAddress = '0xA2b4C0Af19cC16a6CfAcCe81F192B024d625817D';
const deployer = '0xd687EaE068e4D6Be9D9392C1AcD99BbF3aBC76C6';

async function main() {

    let wethContract = new ethers.Contract(WETH, wethABI, signer);

    let tx = await wethContract.approve(LPContract, ethers.parseEther('0.01'));
    console.log(tx);

}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});