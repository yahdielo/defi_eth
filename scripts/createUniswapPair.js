const { ethers } = require('ethers');
require('dotenv').config()

// the idea is to create auniswapv2 pair

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
const signer = new ethers.Wallet(process.env.WALLET_0_PRIVATE_KEY, provider);
const factoryAbi = require('./ABIs/v2FactoryABI.json');
const factoryAddres = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
const factory = new ethers.Contract(factoryAddres, factoryAbi, signer);
const popoTokenAddress = '0x654Ad4934C7644300dE1902bC321C7f1246E6E41';
const WETH = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';
let wethAbi = require('./ABIs/WETHABI.json');
/**function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) */

async function main () {

    try {
        //create factory contract intance
        let tx = await factory.createPair(popoTokenAddress,WETH);
        console.log('pair created!\n',tx);
        
        //call the pair address
        let tx = await factory.getPair(popoTokenAddress, WETH);

    } catch (err) {
        console.error(err);
    }

}


async function wrapEther() {

    try {
            let wetherContract = new ethers.Contract(WETH, wethAbi, signer);
            // Convert currency unit from ether to wei
            let amount = '0.002';
            let txValue = ethers.parseUnits(amount);

            let callDeposit = await wetherContract.deposit({ 'value' : `${txValue}`});
            await callDeposit.wait();
            console.log('deposited obj: \n',callDeposit);

    
    } catch (err) {
        console.log(err);
    }
}

main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
})