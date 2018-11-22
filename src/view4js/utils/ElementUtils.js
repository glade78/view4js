class ElementUtils {
    static view(_viewId) {
        return document.querySelector(".pjs-view." + _viewId);
    }

    static viewStack(_viewStackId) {
        return document.querySelector(".pjs-viewstack." + _viewStackId);
    }

    static viewNavigator(_viewNavId) {
        return document.querySelector(".pjs-viewnavigator." + _viewNavId);
    }

    static constructViewBaseElement(_viewId) {
        return `<div class="pjs-view ${_viewId}"></div>`;
    }

    static constructViewStackBaseElement(_viewStackId) {
        return `<div class="pjs-viewstack ${_viewStackId}"></div>`;
    }

    static constructNavigatorBaseElement(_navigatorId) {
        return `<div class="pjs-viewnavigator ${_navigatorId}"></div>`;
    }

    static hideElement(_el) {
        _el.style.display = 'none';
    }

    static showElement(_el) {
        _el.style.display = 'block';
    }
}

export default ElementUtils;