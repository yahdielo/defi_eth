const { ethers, Contract } = require('ethers');
require('dotenv').config();

const LproviderAddress = '0x26384F6A5921Ad85c9ED4A460dDEe35edD238c5D';
const LproviderAbi = require('./ABIs/liquidityProvider.json');
const wallet0 = '0x49f2f071B1Ac90eD1DB1426EA01cA4C145c45d48';
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
const popoWethPoolABI = require('./ABIs/popoWethPairABI.json');
const signer = new ethers.Wallet(process.env.WALLET_0_PRIVATE_KEY, provider);
const popoWethPOOLAddress= '0x4C252a0f78B801d8F7C5044BcC4b6b4FcB6b7562';
const POPOWETHPOOL = new ethers.Contract(popoWethPOOLAddress, popoWethPoolABI, signer);
const popoAmount = BigInt('100000000000000000000000000');
const wethAmount = BigInt('20000000000000000');

const fetchReserve = async (Icontract) => {
    let getReserves = await Icontract.getReserves();
    return getReserves;
}
async function main () {
    //let result = await fetchReserve(POPOWETHPOOL);
    //console.log(result);
}

main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
})