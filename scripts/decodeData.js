const { ethers, Result } = require('ethers');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
const popoAbi = require('./ABIs/POPO.json');
const UniV2RouterAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
const UniV2RouterABI = require('./ABIs/Univ2RouterABI.json');
const iface = new ethers.Interface(UniV2RouterABI);
//const iface = new ethers.Interface(popoAbi);

async function dataDecoder (txData) {

    //data must be pass as an object
    let dt = {
        data: txData
    }
    //decoding data
    let decoded = iface.parseTransaction(dt);
    console.log('=================================================')
    console.log('== transaction to UNISWAP V2 Router02:')
    //console.log('transaction hash: ', hash);
    console.log('== Name: ',decoded.name);
    console.log('== Signature: ', decoded.signature);
    let args = decoded.args;
    console.log('== ARGS: ', args, '\n======= ARGS AR DONE =====');
    console.log(decoded);
}

module.exports = { dataDecoder };