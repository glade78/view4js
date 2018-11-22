import EventChannel from './EventChannel';

class EventBroadCaster {

    constructor() {
        if (!EventBroadCaster.instance) {
            EventBroadCaster.instance = this;
            this.appEvtChannel = new EventChannel("APPLICATIONEVENT");
            this.navEvtChannel = new EventChannel("NAVIGATIONEVENT");
        }
        return EventBroadCaster.instance;

    }

    get appEventChannel() {
        return this.appEvtChannel;
    }

    get navEventChannel() {
        return this.navEvtChannel;
    }



}

const MessageBus = new EventBroadCaster();
// prevents new properties from being added to the object
Object.freeze(MessageBus);

export default MessageBus;