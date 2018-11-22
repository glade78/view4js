import EventDispatcher from "../../createjs/EventDispatcher";
import Event from '../../createjs/Event';
import EventUtils from '../utils/EventUtils';
import EventBroadCaster from '../events/EventBroadcaster';
import NavigationEvent from '../events/NavigationEvent';
import ElementUtils from '../utils/ElementUtils';

class View extends EventDispatcher {

    constructor(_id, _route, _navparams, _parentViewStackId) {
        super();
        this.id = _id;
        this.route = _route;
        this.navparams = _navparams;
        this.parentViewStackId = _parentViewStackId;
        this.isAttached = false;
        this.isActive = false;
        this.initView();
    }

    dispatchNavBackEvent(event) {
        event.preventDefault();
        let navEvent = new NavigationEvent(EventUtils.NAV_CHANGE_EVENT, EventUtils.BACK_NAV_EVENT, null, this.route);
        EventBroadCaster.navEventChannel.dispatchEvent(navEvent);
    }

    //Overrides by SubClass

    initView() {}

    //Overrides by SubClass
    createViewContent() {

    }

    //Overrides by SubClass
    addViewHandler() {

    }

    //Overrides by SubClass
    removeViewHandler() {

    }

    //Overrides by SubClass
    bindView() {}

    unBindView() {}

    //Overrides by SubClass
    destroy() {
        //TODO
    }

    //Testing Purpose
    submitEvent(_navEvent) {
        this.submitEvent = _navEvent;
    }

    // Call by ViewStack
    attachView(_parentEl = null) {
        if (!this.isAttached) {
            let parentEl = _parentEl;
            if (parentEl == null)
                parentEl = ElementUtils.viewStack(this.parentViewStackId);
            parentEl.insertAdjacentHTML('beforeend', ElementUtils.constructViewBaseElement(this.id));
            this.isAttached = true;
            let tmpEle = this.getViewElement();
            ElementUtils.hideElement(tmpEle);
            //Create View Contents and Internal Components
            this.createViewContent();
            //Add Event Handlers for view Internal Components
            this.addViewHandler();
            //Bind View Component Properties with Model or other view Components
            this.bindView();
            this.dispatchEvent(EventUtils.ATTACHED_EVENT);
        }
    }

    // Call by ViewStack
    activateView() {
        if (!this.isActive) {
            let tmpViewEl = this.getViewElement();
            ElementUtils.showElement(tmpViewEl);
            this.isActive = true;
        }
    }

    // Call by ViewStack
    deActivateView() {
        if (this.isActive) {
            let tmpViewEl = this.getViewElement();
            ElementUtils.hideElement(tmpViewEl);
            this.isActive = false;
        }
    }

    // Call by ViewStack
    detachView() {
        if (this.isAttached) {
            this.unBindView();
            this.removeViewHandler();
            //let parentEl = ElementUtils.viewStack(this.parentViewStackId);
            let tmpViewEle = this.getViewElement();
            tmpViewEle.parentNode.removeChild(tmpViewEle);
            this.isAttached = false;
            this.dispatchEvent(EventUtils.DETACHED_EVENT);
        }
    }

    // Call by ViewStack
    refreshView() {

    }

    getViewElement() {
        let tmpViewEl = null;
        if (this.isAttached) {
            tmpViewEl = ElementUtils.view(this.id);
        }

        return tmpViewEl;
    }

}

export default View;