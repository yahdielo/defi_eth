
export class eventsListiner {
    constructor(_contractAddress, _topic, _provider) {

        this.provider = _provider;
        // the things needed to listen to the event
        this.filter = {
            address: this.contractAddress,
            topic: this.topic
        }
    }

    listen() {

        try {
            this.provider.on(this.filter, (result) => {
                console.log(result);
            })
        } catch (err) {
            console.error(err);
        }
    }
}