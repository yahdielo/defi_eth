const { ethers } = require("hardhat");
const  { eventsListiner } = require("../scripts/subscription.js");

require('dotenv').config()


const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');
const contractAdress = '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0';

const topic = "withdrawalMade(address,uint256)";

async function main() {

    const listiner = new eventsListiner(contractAdress, topic, provider);

    try {
        let event = await listiner.listen();
        console.log(event);

    } catch (err) {
        console.error(err);
    }
}
//module.exports = { startListining };
main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
})