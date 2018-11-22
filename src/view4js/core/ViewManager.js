import EventDispatcher from "../../createjs/EventDispatcher";
import ClassError from '../utils/ClassError';
import Router from './Router';
import ViewNavigator from './ViewNavigator';
import EventBroadCaster from '../events/EventBroadcaster';
import EventUtils from '../utils/EventUtils';

class ViewManager extends EventDispatcher {
    constructor() {
        super();
        this.preinitialize();
        this.initialize();
    }

    preinitialize() {
        this.navigators = {};
        this.currentNavigatorIds = [];
        this.router = new Router();
        this.rootId = "root";
        EventBroadCaster.navEventChannel.addEventListener(EventUtils.NAV_CHANGE_EVENT, event => { this.handleNavChangeEvent(event); });
    }

    //Overrides by SubClass
    initialize() {

    }

    set routes(_router) {
        if (!_router instanceof Router) {
            throw new ClassError("ViewManager", "Wrong Type of Router");
        }
        this.router = _router;
    }

    get routes() {
        return this.router;
    }

    //Overrides by SubClass
    createNavigator(_navigatorId, _parentId) {
        return new ViewNavigator(_navigatorId, _parentId);
    }

    addNavigator(_navigator, _navigatorId) {
        this.navigators[_navigatorId] = _navigator;
    }

    getNavigator(_navigatorId) {
        let tmpnavNav = null;
        if (this.navigators[_navigatorId] != null)
            tmpnavNav = this.navigators[_navigatorId];
        return tmpnavNav;
    }

    get ActiveNavigator() {
        return this.currentNavigatorId;
    }
    set ActiveNavigator(_navigatorId) {
        this.currentNavigatorId = _navigatorId
    }


    findRouteNavigator(_route) {
        let tmpNavigatorIds = this.router.findNavigator(_route);
        return tmpNavigatorIds;
    }

    getNavigatorParent(_navigatorId) {
        let tmpNavParentId = this.router.findNavigatorParent(_navigatorId);
        return tmpNavParentId;
    }

    /**
     * - UseCase for Trigger multiple navigation view change for same "path" Navigation
		  { path: "/main/dashboard", navigatorId: DashBoardNavigator"}
          { path: "/main/dashboard", navigatorId: StatusNavigator"}
        
        - UseCase Check any current Navigator Exist , then hide or destroy it 
          Then Launch new navigator 

        //Done
        - UseCase for Nested Navigation
        { path: "/account/help", navigatorId: "HelpNavigator",parent:"MainNavigator" }
        
       
     * 
     */

    handleNavChangeEvent(e) {
        let route = e.route;
        let navevent = e.eventName;
        let navparams = e.params;
        let navigatorIds = this.findRouteNavigator(route);
        if (navevent == EventUtils.BACK_NAV_EVENT) {
            // No Need to destoy / hide navigator assuming its same navigator
            this.changeBackNavigation(navigatorIds, route);
        } else {
            this.currentRoute = route;
            this.changeNavigation(navigatorIds, route, navevent, navparams);
        }
    }


    changeBackNavigation(_navigatorIds, _route) {
        if (_navigatorIds.length > 0) {
            for (let j = 0; j < _navigatorIds.length; j++) {
                let tmpNavId = _navigatorIds[j];
                let tmpNavigator = this.getNavigator(tmpNavId);
                tmpNavigator.navigateBack(_route);
            }
        }

    }


    changeNavigation(_navigatorIds, _route, _navevent, _navparams) {
        this.checkAndDestroyNavigators(_navigatorIds, _route);
        if (_navigatorIds.length > 0) {
            for (let k = 0; k < _navigatorIds.length; k++) {
                let tmpNavid = _navigatorIds[k];
                let tmpNavigator = this.getNavigator(tmpNavid);
                if (tmpNavigator == null) {
                    // Add code here to find parent of Navigator.
                    let tmpParentElId = this.getNavigatorParent(tmpNavid);
                    tmpNavigator = this.createNavigator(tmpNavid, tmpParentElId);
                    this.addNavigator(tmpNavigator, tmpNavid);
                    tmpNavigator.render();
                    /* createNavigator will call internally addNavigator to save created navigator */
                    // tmpNavigator.addEventListner("changeNavEvent",onNavChangeEvent); 
                }
                tmpNavigator.navigate(_route, _navevent, _navparams);
            }
        }

    }

    checkAndDestroyNavigators(_navigatorIds, _route) {
        let unusedNavigators = [];
        if (_navigatorIds.length > 0) {
            for (let m = 0; m < this.currentNavigatorIds.length; m++) {
                let tmpCurrentNavId = this.currentNavigatorIds[m];
                if (this.checkUnusedNavigator(tmpCurrentNavId, _navigatorIds)) {
                    unusedNavigators.push(tmpCurrentNavId);
                }

            }
        }

        this.destroyUnusedNavigators(unusedNavigators);
    }

    checkUnusedNavigator(_currentnavId, _navigatorIds) {
        let unused = true;
        for (let n = 0; n < _navigatorIds.length; n++) {
            if (_currentnavId == _navigatorIds[n]) {
                unused = false; // navigator is used
            }
        }
        return unused;
    }

    destroyUnusedNavigators(_unusedNavigators) {
        if (_unusedNavigators.length > 0) {
            for (let p = 0; p < _unusedNavigators.length; p++) {
                let tmpNavid = _unusedNavigators[p];
                this.removeNavigator(tmpNavid);
            }
        }
    }

    removeNavigator(_navigatorId) {
        let tmpnav = this.navigators[_navigatorId];
        tmpnav.destroy();
        tmpnav = null;
        this.navigators[_navigatorId] = null;
    };

    destroyAll() {
        //TODO
    }
}

export default ViewManager;