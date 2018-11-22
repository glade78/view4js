import EventDispatcher from "../../createjs/EventDispatcher";
import ElementUtils from "../utils/ElementUtils";
class ViewStack extends EventDispatcher {
    constructor(_id, _route, _parentId) {
        super();
        this.id = _id;
        this.route = _route;
        this.parentId = _parentId;
        this.viewStack = [];
        this.isRendered = false;
        this.initViewStack();
    }

    initViewStack() {

    }

    pushViewElement(_viewId, _views) {

        for (let viewObj in _views) {
            let tmpview = _views[viewObj];
            if (tmpview.isActive) {
                tmpview.deActivateView();
            }
        }
        this.viewStack.push(_viewId);

    }

    popViewElement() {
        this.viewStack.pop();
        /*
         Navigator will call view destroy method which will remove 
         - View DOM Element
         - EventListners reference to DOM Element
         - Properties 
         - Finally Object null to make garbage collected
         */
    }

    getActiveViewId() {
        if (this.viewStack.length > 0)
            return this.viewStack[this.viewStack.length - 1];
    }

    getViewStackElement() {
        let el = null;
        if (this.isRendered) {
            el = this.getViewStackRootElement();
        }
        return el;
    }

    //Overrides by SubClass
    getViewStackRootElement() {
        return ElementUtils.viewStack(this.id);
    }

    render() {
        if (!this.isRendered) {
            this.renderViewStack();
            this.renderViewStackContent();
            this.isRendered = true;
        }
    }

    renderViewStack() {
        let tmpParentNavigatorEl = ElementUtils.viewNavigator(this.parentId);
        let tmpViewStackEl = ElementUtils.constructViewStackBaseElement(this.id);
        tmpParentNavigatorEl.insertAdjacentHTML('beforeend', tmpViewStackEl);
    }

    //Overrides by SubClass
    renderViewStackContent() {}

    destroy() {
        this.route = null;
        this.viewStack = [];
        this.isRendered = false;
        let tmpParentNavigatorEl = ElementUtils.viewNavigator(this.parentId);
        let tmpViewStackEl = ElementUtils.viewStack(this.id);
        tmpParentNavigatorEl.removeChild(tmpViewStackEl);
        this.parentId = null;
        this.id = null;
    }


}

export default ViewStack;