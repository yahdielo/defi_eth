const { ethers } = require("hardhat");
const  { eventsListiner } = require("./subscription.js");

require('dotenv').config()


const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');
const contractAdress = '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0';

const topic = "withdrawalMade(address,uint256)";

async function main() {

    let listiner = new eventsListiner(contractAdress, topic, provider);

    try {
        let event = listiner.listen();
        console.log(event);

    } catch (err) {
        console.error(err);
    }

}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
})