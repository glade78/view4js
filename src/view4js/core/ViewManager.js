/** 
 * @license
 * Copyright (c) 2019 Gaurang Lade
 * 
 * MIT License
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import EventDispatcher from "../../createjs/EventDispatcher";
import ClassError from '../utils/ClassError';
import Router from './Router';
import ViewNavigator from './ViewNavigator';
import EventBroadCaster from '../events/EventBroadcaster';
import EventUtils from '../utils/EventUtils';

/**
 *
 * ViewManager
 * @extends {EventDispatcher}
 */
class ViewManager extends EventDispatcher {


    /**
     * @description ViewManager manages ViewNavigator.It Subscribe to EventBroadcaster's Navigation channel to receive navigation change events.
     * ViewManager find ViewNavigator based on Path Routes data and it match route info received in navigation change event.
     * 
     * @memberof ViewManager
     */
    constructor() {
        super();
        this.preinitialize();
        this.initialize();
    }


    /**
     * @description preinitialize navigators,router etc.
     * @private
     * @memberof ViewManager
     */
    preinitialize() {
        this.navigators = {};
        this.currentNavigatorIds = [];
        this.router = new Router();
        this.rootId = "root";
        this.currentRoute = null;
        EventBroadCaster.navEventChannel.addEventListener(EventUtils.NAV_CHANGE_EVENT, event => { this.handleNavChangeEvent(event); });
    }

    /**
     * @description Implement by subclass to initialise 
     * @override
     * @public
     * @memberof ViewManager
     */
    initialize() {

    }

    /**
     * @description 
     * Viewmanager find Viewnavigator based on Routes info set in Router Object
     * 
     * @example Sample Router Object is 
     * [
     *      { path: "/path1", navigatorId: "Navigator1",parentId: "root" },
     *      { path: "/path2", navigatorId: "Navigator2",parentId: "root" },
     *  ]
     * 
     * @description Here path is routeID, navigatorID is viewNavigatorId, 
     * parentId is DOM Element Id or ViewId in case of Nested View Navigators
     * By Default Main DOM Element have id="root"
     * 
     * @memberof ViewManager
     */

    set routes(_router) {
        if (!_router instanceof Router) {
            throw new ClassError("ViewManager", "Wrong Type of Router");
        }
        this.router = _router;
    }


    get routes() {
        return this.router;
    }

    /**
     * @description ViewManager calls createNavigator method when ViewNavigator is not created yet. 
     * @param {string} _navigatorId - ViewNavigatorId
     * @param {string} _parentId - ParentId is DOM Element id or ViewID
     * @returns {Object} - New Instance of ViewNavigator
     * @memberof ViewManager
     */
    createNavigator(_navigatorId, _parentId) {
        return new ViewNavigator(_navigatorId, _parentId);
    }

    /**
     * @description ViewManager maintains navigators object in Key, Value form.
     * Where key is viewNavigatorID and value is ViewNavigator Object Instance
     * @param {Object} _navigator - ViewNavigator
     * @param {string} _navigatorId - ViewNavigatorID
     * @memberof ViewManager
     */
    addNavigator(_navigator, _navigatorId) {
        this.navigators[_navigatorId] = _navigator;
        //this.currentNavigatorIds.push(_navigatorId);
    }

    /**
     * @returns {Object} - ViewNavigator Object Instance by ViewNavigatorId.
     * @param {string} _navigatorId - ViewNavigatorID
     * @memberof ViewManager
     */
    getNavigator(_navigatorId) {
        let tmpnavNav = null;
        if (this.navigators[_navigatorId] != null)
            tmpnavNav = this.navigators[_navigatorId];
        return tmpnavNav;
    }

    /**
     * @returns {Array} - NavigatorID Array 
     * @param {string} _route - Path Route Name
     * @memberof ViewManager 
     */
    findRouteNavigator(_route) {
        let tmpNavigatorIds = this.router.findNavigator(_route);
        return tmpNavigatorIds;
    }

    /**
     * @returns {string} - ParentID of ViewNavigator 
     * @param {string} _navigatorId - ViewNavigatorID
     * @memberof ViewManager
     */
    getNavigatorParent(_navigatorId) {
        let tmpNavParentId = this.router.findNavigatorParent(_navigatorId);
        return tmpNavParentId;
    }

    handleNavChangeEvent(e) {
        let route = e.route;
        let navevent = e.eventName;
        let navparams = e.params;
        let navigatorIds = this.findRouteNavigator(route);
        if (navevent == EventUtils.BACK_NAV_EVENT) {
            // No Need to destroy / hide navigator assuming its same navigator
            this.changeBackNavigation(navigatorIds, route);
        } else {
            this.currentRoute = route;
            this.chkAndDestroyNestedNavs(route);
            this.changeNavigation(navigatorIds, route, navevent, navparams);
        }
    }


    /**
     * @description 
     * changeBackNavigation change from current view to one previous view of viewstack by calling navigateBack method of multiple ViewNavigators associated same path route.
     * @private
     * @param {Array} _navigatorIds - Array of ViewNavigators.
     * @param {String} _route - Path route
     * @memberof ViewManager
     */
    changeBackNavigation(_navigatorIds, _route) {
        if (_navigatorIds.length > 0) {
            for (let j = 0; j < _navigatorIds.length; j++) {
                let tmpNavId = _navigatorIds[j];
                let tmpNavigator = this.getNavigator(tmpNavId);
                if(tmpNavigator.history == true){
                    tmpNavigator.navigateBack(_route);
                }
            }
        }

    }

    /**
     * @description 
     * changeNavigation method called when ViewManager Receive Forward Navigation Event
     * @private
     * @param {Array} _navigatorIds - NavigatorId Array
     * @param {String} _route - Navigation Route / Path 
     * @param {Event} _navevent - Navigation Event
     * @param {Object} _navparams - Navigation Parameters pass to ViewNavigator
     * @memberof ViewManager
     */
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

    chkAndDestroyNestedNavs(_route) {
        // Find Navigators Ids with current active route
        let tmpCurrNavIds = this.findRouteNavigator(_route);
        let tmpCurrViewIds = [];
        let tmpNestNavIds = [];

        // Chk Active route Navigators have history false
        // If History false then get its ViewId
        if (tmpCurrNavIds.length > 0) {
            for (let x = 0; x < tmpCurrNavIds.length; x++) {
                let tmpCurrNavId = tmpCurrNavIds[x];
                if(this.navigators[tmpCurrNavId] != null)  {
                    let tmpViewId = this.navigators[tmpCurrNavId].activeViewId;
                    if(this.navigators[tmpCurrNavId].history == false){
                        tmpCurrViewIds.push(tmpViewId);
                    }
                } 
            }
        }

        // Find Navigators who have Active ViewId as Parent
        if (tmpCurrViewIds.length > 0) {
            for (let y = 0; y < tmpCurrViewIds.length; y++) {
                let tmpViwId = tmpCurrViewIds[y];
                let tmpNestNavId = this.chkViewAsNavigatorParent(tmpViwId);
                if(tmpNestNavId != null){
                    tmpNestNavIds.push(tmpNestNavId);
                }
            }
        }

        // Destory Navigators who have Active ViewId as Parent
        if(tmpNestNavIds.length > 0){
            this.destroyUnusedNavigators(tmpNestNavIds);
        }

    }

    chkViewAsNavigatorParent(_viewId) {
        let tmpNavId = null;
        for( let nav in this.navigators){
            if(this.navigators[nav] != null){
                let tmpParentId = this.navigators[nav].parentId;
                if ((tmpParentId != null) && (tmpParentId == _viewId)){
                    tmpNavId = this.navigators[nav].id;
                } 
            } 
        }
        return tmpNavId;
    }

    /**
     * @description removes unused navigators.
     * @private
     * @param {Array} _navigatorIds - NavigatorId Array 
     * @param {String} _route Navigation Route / Path 
     * @memberof ViewManager
     */
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

    /**
     * @description
     * checkUnusedNavigator will check if ViewNavigator is used or unused.
     * @private
     * @param {string} _currentnavId 
     * @param {Array} _navigatorIds
     * @returns {string} - unused navigatorid
     * @memberof ViewManager 
     */
    checkUnusedNavigator(_currentnavId, _navigatorIds) {
        let unused = true;
        for (let n = 0; n < _navigatorIds.length; n++) {
            if (_currentnavId == _navigatorIds[n]) {
                unused = false; // navigator is used
            }
        }
        return unused;
    }

    /**
     * @description destroy unused Navigators
     * @private
     * @param {Array} _unusedNavigators 
     * @memberof ViewManager
     */
    destroyUnusedNavigators(_unusedNavigators) {
        if (_unusedNavigators.length > 0) {
            for (let p = 0; p < _unusedNavigators.length; p++) {
                let tmpNavid = _unusedNavigators[p];
                this.removeNavigator(tmpNavid);
            }
        }
    }

    /**
     * @description removes ViewNavigator object instance from navigators array.
     * @param {String} _navigatorId - NavigatorId
     * @memberof ViewManager
     */
    removeNavigator(_navigatorId) {
        let tmpnav = this.navigators[_navigatorId];
        tmpnav.destroy();
        tmpnav = null;
        this.navigators[_navigatorId] = null;
    };

    /**
     *
     * @todo Implment destroy method
     * @memberof ViewManager
     */
    destroyAll() {
        //TODO
    }
}

export default ViewManager;