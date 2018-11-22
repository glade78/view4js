class EventRouter {

    constructor(_routes = []) {
        this.routes = _routes;
    }

    addRoute(_navEvent, _viewstackId, _viewId, _path) {
        let route = {};
        route.navEvent = _navEvent;
        route.viewstackId = _viewstackId;
        route.viewId = _viewId;
        route.path = _path;
        this.routes.push(route);
    }

    findRoute(_navEvent) {
        let tmpRoute = [];
        for (let x = 0; x < this.routes.length; x++) {
            if (this.routes[x].navEvent == _navEvent)
                tmpRoute = this.routes[x];
        }
        return tmpRoute;
    }

    findViewId(_navEvent, _path) {
        let tmpViewId = [];
        for (let i = 0; i < this.routes.length; i++) {
            if ((this.routes[i].navEvent == _navEvent) && (this.routes[i].path == _path))
                tmpViewId = this.routes[i].viewId;
        }
        return tmpViewId;
    }

    findViewStackId(_navEvent, _path) {
        let tmpViewStackId = null;
        for (let j = 0; j < this.routes.length; j++) {
            if ((this.routes[j].navEvent == _navEvent) && (this.routes[j].path == _path))
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
                console.log("navEvent:" + this.routes[i].navEvent + " viewstackId:" + this.routes[i].viewstackId + " viewId:" + this.routes[i].viewId);
            }
        } else {
            console.log("No Routes Found");
        }
    }

}

export default EventRouter;