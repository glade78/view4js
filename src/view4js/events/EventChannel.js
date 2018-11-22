import EventDispatcher from "../../createjs/EventDispatcher";

class EventChannel extends EventDispatcher {
    constructor(_id) {
        super();
        this.id = _id;
    }
}

export default EventChannel;