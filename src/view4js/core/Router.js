class Router {

    constructor(_routes = []) {
        this.routes = _routes;
    }

    addRoute(_path, _navigatorId, _parentId) {
        let route = {};
        route.path = _path;
        route.navigatorId = _navigatorId;
        route.parentId = _parentId;
        this.routes.push(route);
    }

    findNavigator(_route) {
        let tmpNavigatorIds = [];
        for (let i = 0; i < this.routes.length; i++) {
            if (this.routes[i].path === _route)
                tmpNavigatorIds.push(this.routes[i].navigatorId);
        }
        return tmpNavigatorIds;
    }

    findNavigatorParent(_navigatorId) {
        let tmpParentId = "root";
        for (let i = 0; i < this.routes.length; i++) {
            if (this.routes[i].navigatorId === _navigatorId)
                tmpParentId = this.routes[i].parentId;
        }
        return tmpParentId;
    }

    findViewStack(_route) {
        let tmpViewStackId = null;
        for (let j = 0; j < this.routes.length; j++) {
            if (this.routes[j].path == _route)
                tmpViewStackId = this.routes[j].viewstackId;
        }
        return tmpViewStackId;
    }

    reset() {
        this.routes = [];
    }

    printRoutes() {
        if (this.routes.length > 0) {
            for (let i = 0; i < this.routes.length; i++) {
                console.log("path:" + this.routes[i].path + " navigatorId:" + this.routes[i].navigatorId);
            }
        } else {
            console.log("No Routes Found");
        }
    }

}

export default Router;