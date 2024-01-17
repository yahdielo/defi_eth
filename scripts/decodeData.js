const { ethers, Result } = require('ethers');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
const popoAbi = require('./ABIs/POPO.json');
const UniV2RouterAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
const UniV2RouterABI = require('./ABIs/Univ2RouterABI.json');
const iface = new ethers.Interface(UniV2RouterABI);
//const iface = new ethers.Interface(popoAbi);

async function dataDecoder (txObj) {

    //data must be pass as an object
    let dt = {
        data: txObj.data
    }
    //decoding data
    let read = iface.parseTransaction(dt);
    return read;  
}

module.exports = { dataDecoder };