const { ethers } = require('ethers');
const { UniSwapV2RouterAddress, WETH , DAI} = require('./vars');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.GOERLI_ALCHEMY_API);
const signer = new ethers.Wallet(process.env.KING_DINO_PK, provider);
//router contrcat

const routerAbi = require('./ABIs/Univ2RouterABI.json');
const Router = new ethers.Contract(UniSwapV2RouterAddress, routerAbi, provider);


 async function swapTokens() {


    try {
        
    } catch(e) {
        console.log(e)
    }
}

swapTokens(); //first argument = token we want, second = token we have, the amount we want
