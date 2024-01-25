const { ethers } = require("ethers");
const { dataDecoder } = require('./decodeData');

require('dotenv').config()


const wsProvider = new ethers.WebSocketProvider(`wss://eth-mainnet.g.alchemy.com/v2/oicWIwgqb-Ya3oG20OYtZkxvudmQO-RU`);
//const wsProvider = new ethers.WebSocketProvider('wss://eth-goerli.g.alchemy.com/v2/FKSoFANqAAU-eWezpKUclAGnbRE0j94l');//curently goerli
const popoAbi = require('./ABIs/POPO.json');
const iface = new ethers.Interface(popoAbi);
const popoTokenAddress = '0x654Ad4934C7644300dE1902bC321C7f1246E6E41';

//const pairAddress = "0x654Ad4934C7644300dE1902bC321C7f1246E6E41";

async function main() {
    
    wsProvider.on('pending' , async (txHash) => {
            try{
                let txObj = await wsProvider.getTransaction(txHash);
                await filterTx(txObj, txHash);
                
                await delay(2000) 
                } catch (err) {
                //dont know is this is good practice but i get a lot of error for rate milit exeeded
                //console.log(err);
            }
        })
     

}


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const uniswapAddresses = [
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"// Router02
];
const functionNames = [
   // "swapExactTokensForETHSupportingFeeOnTransferTokens",
    "swapTokensForExactTokens"
]

const filterTx = async (txObj ,hash) => {

    if(uniswapAddresses.includes(txObj.to)){
        await dataDecoder(txObj.data);
    }
        await delay(3000);
    }
 
//module.exports = { startListining };
main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
})

