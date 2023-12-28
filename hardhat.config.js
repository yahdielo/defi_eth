require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: 'http://127.0.0.1:8545/',
      accounts: [process.env.ADDRESS_0_PRIVATE_KEY]
    }
  }
};