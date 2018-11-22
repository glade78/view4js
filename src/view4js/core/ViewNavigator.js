import EventDispatcher from "../../createjs/EventDispatcher";
import ElementUtils from '../utils/ElementUtils';
import ViewStack from './ViewStack';
import View from './View';
import EventRouter from './EventRouter';

class ViewNavigator extends EventDispatcher {
    constructor(_id, _parentId = null) {
        super();
        this.id = _id;
        // HTML ID attribute only 
        this.parentId = _parentId;
        this.activeViewId = null;
        this.activeViewStackId = null;
        this.activeRoute = null;
        this.views = {};
        this.viewstacks = {};
        this.eventroute = new EventRouter();
        this.isRendered = false;
        this.history = true;
        this.initNavigator();
    }

    //Overrides by SubClass
    initNavigator() {

    }

    set eventRouter(_router) {
        if (!_router instanceof EventRouter) {
            throw new ClassError("ViewNavigator", "Wrong Type of Router");
        }
        this.eventroute = _router;
    }

    get eventRouter() {
        return this.eventroute;
    }

    //Overrides by SubClass
    createView(_viewId, _route, _navparams, _viewStackId) {
        return new View(_viewId, _route, _navparams, _viewStackId);
    }

    //Overrides by SubClass
    createViewStack(_viewStackId, _route, _parentId) {
        return new ViewStack(_viewStackId, _route, _parentId);
    }



    // TODO : Check any current view and viewstack Exist , then hide or destroy it 
    // Then Launch new viewstack and view 
    navigate(_route, _navevent, _navparams) {
        let tmpviewStackId = null;
        if (this.history == false) {
            this.navigateBack(_route);
        }

        //TODO Find ViewStack and View by using NavEventName 

        // Find or Create ViewStack
        // Route and NavEvent Combination must be unique
        tmpviewStackId = this.eventroute.findViewStackId(_navevent, _route);
        let tmpViewStack = this.getViewStack(tmpviewStackId);
        if (tmpViewStack == null)
            tmpViewStack = this.createViewStack(tmpviewStackId, _route, this.id);

        // Viewstack have _parentId

        tmpViewStack.render(); // will construct Element and add it to DOM parent
        this.activeViewStackId = tmpviewStackId;
        this.viewstacks[tmpviewStackId] = tmpViewStack;

        //let tmpNewRoute = this.eventroute.findRoute(_navevent);
        let tmpviewId = this.eventroute.findViewId(_navevent, _route);
        let tmpView = this.getView(tmpviewId);
        if (tmpView == null)
            tmpView = this.createView(tmpviewId, _route, _navparams, tmpviewStackId);
        //tmpView.submitEvent(tmpNewRoute.navEvent); // For Testing Purpose Only;
        let tmpViewStackEl = tmpViewStack.getViewStackElement();
        tmpView.attachView(tmpViewStackEl); // will construct Element and add it to DOM parent
        tmpViewStack.pushViewElement(tmpviewId, this.views);
        tmpView.activateView();
        this.activeViewId = tmpviewId;
        this.views[tmpviewId] = tmpView;
        this.activeRoute = _route;
    }

    /* Navigate Back View */
    navigateBack(_route) {
        if (_route == this.activeRoute) {
            let tmpViewStack = this.getViewStack(this.activeViewStackId);
            tmpViewStack.popViewElement();
            let tmpView = this.views[this.activeViewId];
            tmpView.deActivateView();
            tmpView.detachView();
            tmpView.destroy();
            tmpView = null; // make garbage collected
            this.views[this.activeViewId] = null;
            delete this.views[this.activeViewId];
            if (this.history == true) {
                this.activeViewId = tmpViewStack.getActiveViewId();
                let tmpViewBack = this.views[this.activeViewId];
                tmpViewBack.activateView();
                this.activeRoute = this.views[this.activeViewId].route;
            }
        }
    }

    //TODO
    navigateBackToView(_viewId) {

    }

    //TODO
    navigateToView(_viewId) {

    }

    getViewStack(_viewStackId) {
        let tmpVstack = null;
        tmpVstack = this.viewstacks[_viewStackId];
        return tmpVstack;
    }

    getView(_viewId) {
        let tmpV = null;
        tmpV = this.views[_viewId];
        return tmpV;
    }

    render() {
        if (!this.isRendered) {
            this.renderNavigator();
            this.renderNavigatorContent();
        }
    }

    renderNavigator() {
        let tmpParentId = this.parentId;
        let tmpParentElement = null;
        if (this.parentId != "root") {
            tmpParentElement = ElementUtils.view(this.parentId);
        } else {
            tmpParentElement = document.getElementById(tmpParentId);
        }
        if (tmpParentElement != null) {
            let tmpNavigatorEl = ElementUtils.constructNavigatorBaseElement(this.id);
            tmpParentElement.insertAdjacentHTML('beforeend', tmpNavigatorEl);
            this.isRendered = true;
        } else {
            throw new ClassError("ViewNavigator", "No Parent Element found for Navigator");
        }

    }

    //Overrides by SubClass
    renderNavigatorContent() {}



    destroy() {
        for (let viewObj in this.views) {
            let tmpview = this.views[viewObj];
            tmpview.destroy();
        }
        for (let viewStkObj in this.viewstacks) {
            let tmpviewstk = this.viewstacks[viewStkObj];
            tmpviewstk.destroy();
        }


        let tmpParentEl = document.getElementById(this.parentId);;
        let tmpNavigatorEl = ElementUtils.viewNavigator(this.id);
        tmpParentEl.removeChild(tmpNavigatorEl);

        this.views = null;
        this.viewstacks = null;
        this.parentId = null;
        this.id = null;
        this.parentId = null;
        this.activeViewId = null;
        this.activeViewStackId = null;
        this.activeRoute = null;
        this.eventroute = null;
        this.isRendered = false;

    }






}

export default ViewNavigator;