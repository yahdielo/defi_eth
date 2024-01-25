const { ethers } = require('ethers');
require('dotenv').config();

/**
 * Module to swap Exact eth for tokens
 * swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
 */
 const kingDino = '0x49f2f071B1Ac90eD1DB1426EA01cA4C145c45d48';
const wsProvider = PROCESS.ENV.GOERLI_ALCHEMY_WS;
const signer = new ethers.Wallet(process.env.KING_DINO_PK, wsProvider);
const uniswapRouterABI = require('./ABIs/Univ2RouterABI.json');
const uniswapRouterAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
//intance of the router contract
const Router = new ethers.Contract(uniswapRouterAddress, uniswapRouterABI, signer);
const WETH = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';
const wethABI = require('./ABIs/WETHABI.json');
const wethContract = new ethers.Contract(WETH, wethABI, signer);
//want to swap eth for dai
const DAI = '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844';



const swapETHforToken = async (_amountOut, _path, _to, _deadline) => {

    try {

        let approve = await wethContract.approve(uniswapRouterAddress, _amountOut);
        if (approve){
            console.log('aprove: \n', approve);
        }
        
        let swap = await Router.swapETHForExactTokens(_amountOut, _path, _to, _deadline, { value: ethers.parseEther('0.01')});
        await swap.wait();
        return swap;

    } catch (e) {
        console.log(e);
    }

}
async function main() {

    let amountOut = BigInt('1000000000000000000');
    let path = [WETH, DAI];
    let block = await  wsProvider.getBlock();
    let deadline = block.timeStamp * 600;

    let tx = swapETHforToken(amountOut, path, signer.address, deadline);
    console.log(tx);

}

main().catch((e) => {
    console.log(e);
    process.exitCode = 1;
})