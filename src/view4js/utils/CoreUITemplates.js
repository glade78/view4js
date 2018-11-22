class CoreUITemplates {

    static VIEW_HTML(_viewId) {
        return `<div class="pjs-view ${_viewId}"></div>`;
    }

    static VIEWSTACK_HTML(_viewstackId) {
        return `<div class="pjs-viewstack ${_viewstackId}"></div>`;
    }

    static VIEW_NAVIGATOR_HTML(_navigatorId) {
        return `<div class="pjs-viewnavigator ${_navigatorId}"></div>`;
    }

}

export default CoreUITemplates;