const { ethers } = require("hardhat");
require('dotenv').config()


class walletManeger {

    /**
     * 
     * @param {string} walletAddress 
     * @param {string} privateKey 
     * @param {string} provider 
     *
     * @description: this module facilitate the interaction with contracts maneging multiple wallets
     */

    constructor(walletName, provider){

        this.walletName = walletName;
        this.provider = provider;
        this.signer = process.env.walletName;
    }

    print() {
        console.log(this.signer);
    }
}

module.exports = { walletManeger };