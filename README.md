# this project is currently set up for the hardhat local network

## Contract

the coinrroll smart contract is just a simple contract to make a bet a side of the coin,
and send the funds to teh winer, the contract owner being the house per say.

currently is hard coded to always have the result be 0 so heads.

* TODO:
set up a random outcome using oracles.

# hardhat node

the command:     hardhat node

will start a local enviroment where you can test the functionalities of your smart contract.
when you run the **hardhat node** you will see like 10 account created with 100+ eth to play with,
in your .env file set up the private keys , and import them to your scripts, as good practice to dealing with sensitive info.

this local blockchain will destroy itself ones you finish the session.

# compile and deploy

to compile simply run:

    npx hardhat compile

to run the hardhat node of you havent already , on a different terminal window run
    hardhat node

back on your project terminal run the next command to deploy to the local network

    npx hardhat --network localhost scripts/deploy.js

in the terminal where you ran the hardhad node you will see a log of all the transactions,
a block will be mine on every transaction by default.

# documentation for errors

one of the thigs that had me looking was the my calls where failing when wanting to send eth
and calling ethes.utils.parseUnit(1 //ether); this was failing and found a fix the new version is 
ethers.Unit(1 //ether);

jere is the link for that

    https://stackoverflow.com/questions/76536790/cannot-read-properties-of-undefined-reading-parseunits-hardhat-js