
class eventsListiner {
    /**
     * 
     * @param {uint256} _contractAddress //the smart contract you monitor 
     * @param {string} _topic //the topic you want to listen for @example: {"deposit(uint256,address)"}
     * @param {string} _provider the endpoint for the provider @example: {"http://127.0.0.1:8545/"} // local host in this case
     * 
     * @description: the idea of this class is to be able to listen
     * and monitor multiple smart contract events
     */
    constructor(contractAddress, topic, provider) {

        this.provider = provider;
        // the things needed to listen to the event
        this.contractAddress = contractAddress;
        this.topic = topic;

        this.filter = {
            address: this.contractAddress,
            topic: this.topic
        }
    }

    listen() {

        try {
            console.log('listining...........\n');

            this.provider.on(this.filter, ( result ) => {
                console.log(result);             
            })
        } catch (err) {
            console.error(err);
        }
    }

}

module.exports = {eventsListiner};