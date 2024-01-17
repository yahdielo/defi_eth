require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    goerli: {
      //url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      url: `${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.WALLET_0_PRIVATE_KEY]
    }
  }
};