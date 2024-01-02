const { ethers } = require("ethers");
const { listeners } = require("process");
const  { eventsListiner } = require("./subscription.js");

require('dotenv').config()


const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');
const contractAdress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

const withdral = "withdrawalMade(msg.sender,_amount)";
const deposited = "fundsDeposited(address,uint256)";
const ListentoWithdral = new eventsListiner(contractAdress, withdral, provider);

async function listineWithdraw() {
    try {
        let event = await ListentoWithdral.listen();
        console.log("withdrawal made:");
        console.log(event);

    } catch (err) {
        console.error(err);
    }
}

async function listineDeposit(_newevent) {
    const deposit = new eventsListiner(contractAdress, _newevent, provider);

    try {
        let event = await deposit.listen();
        console.log("deposite made:");
        console.log(event);
    } catch (err) {
        console.error(err);
    }
}
async function main() {

    //creat a instance of event listiner
    let withdralMade = await listineWithdraw();
    console.log(withdralMade);

    let listenToDeposite = await listineDeposit(deposited);
    console.log(listenToDeposite);

}
//module.exports = { startListining };
main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
})