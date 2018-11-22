import Event from "../../createjs/Event";

class NavigationEvent extends Event {
    constructor(_type, _eventName, _params, _route, _bubbles, _cancelable, ) {
        super(_type, _bubbles, _cancelable);
        this.type = _type;
        this.eventName = _eventName;
        this.params = _params;
        this.route = _route;
    }

    clone() {
        return new NavigationEvent(this.type, this.eventName, this.params, this.route, this.bubbles, this.cancelable);
    }
}

export default NavigationEvent;