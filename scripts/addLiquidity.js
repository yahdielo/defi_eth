const { ethers, Contract } = require('ethers');
require('dotenv').config();

const WETH = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
const popoWethPoolABI = require('./ABIs/popoWethPairABI.json');
const signer = new ethers.Wallet(process.env.WALLET_0_PRIVATE_KEY, provider);
const popoWethPOOLAddress= '0x4C252a0f78B801d8F7C5044BcC4b6b4FcB6b7562';
const POPOWETHPOOL = new ethers.Contract(popoWethPOOLAddress, popoWethPoolABI, signer);
const popoAmount = BigInt('2000000000000000000000000');
const ethAmount = ethers.parseEther('0.0000000001');
const LPABI = require('./ABIs/LProvider.json');
const amountmin =  BigInt('20000000000000000000');
const LPAddress = '0x8Afc58cfB97658Df63664d943875549F43DDa59c';
const popoTokenAddress = '0x654Ad4934C7644300dE1902bC321C7f1246E6E41';
const LPcontrcat = new ethers.Contract(LPAddress,LPABI , signer);


const fetchReserve = async (contractInterface) => {
    let getReserves = await contractInterface.getReserves();
    return getReserves;
}
async function main () {

    try {

        /**let tx = await signer.sendTransaction({
            to: LPAddress,
            value: ethers.parseUnits('0.01', 'ether')
        });
        await tx.wait();
        console.log('ethers tranferes:\n', tx);
        */

        let blockNumber = await provider.getBlockNumber();
        let block = await provider.getBlock(blockNumber);
        let deadLine = block.timestamp * 600;
    
        let sendLiquidity = await LPcontrcat.addLiquidityETH(
            popoTokenAddress,
            popoAmount,
            amountmin,
            ethAmount,
            signer.address,
            deadLine,
            { gasLimit: 225880}
            );
        await sendLiquidity.wait();
        console.log(`Tx object: \n${sendLiquidity}`);
    } catch (err) {
        console.log(err);
    }
}

main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
})