class BindingUtil {

    constructor() {
        if (!BindingUtil.instance) {
            BindingUtil.instance = this;
            this.BindObjDictionary = {};
        }
        return BindingUtil.instance;

    }


    Binds(_srcObj, _srcProp, _evtname, _targObj, _targProp) {
        let srcObject = new Object();
        let srcPropStr = _srcProp + "prop";
        let srcObjKey = null;
        if (_srcObj.nodeName) {
            srcObjKey = _srcObj.id;
            //TODO:: Following line will be enabled for data-id attribute
            // srcObjKey = _srcObj.dataset.id;
            this.addToBindDictionary(srcObjKey, _srcObj, _evtname);
            srcObject = this.BindObjDictionary[srcObjKey];
        } else {
            srcObjKey = _srcObj;
            this.addToBindDictionary(srcObjKey, _srcObj, _evtname);
            srcObject = this.BindObjDictionary[srcObjKey];
        }

        if (srcObject.srcPropArray == null) {
            srcObject.srcPropArray = [];
        }
        if (srcObject[srcPropStr] == null) {
            srcObject.srcPropArray.push(_srcProp);
            srcObject[srcPropStr] = new Object();
            if (typeof(_srcObj[_srcProp]) === 'function') {
                srcObject[srcPropStr].value = _srcObj[_srcProp]();
            } else {
                srcObject[srcPropStr].value = _srcObj[_srcProp];
            }

        }
        if (srcObject[srcPropStr].bindObjArray == null) {
            srcObject[srcPropStr].bindObjArray = [];
        }
        let targetObject = this.getTargetObject(_targObj, _targProp);
        srcObject[srcPropStr].bindObjArray.push(targetObject);
        this.BindObjDictionary[srcObjKey] = srcObject;
    }

    addToBindDictionary(key, Obj, _evtname) {
        if (this.BindObjDictionary[key] == null) {
            this.BindObjDictionary[key] = Obj;
        }
        Obj.addEventListener(_evtname, (e) => { this.synchronise(e); });
    }

    synchronise(event) {
        event.preventDefault();
        let srcObjfrmEvt = event.target;
        let eleid;
        console.info(typeof srcObjfrmEvt);
        if (srcObjfrmEvt.id) {
            eleid = srcObjfrmEvt.id;
        } else {
            eleid = srcObjfrmEvt;
        }
        let srcObject = this.BindObjDictionary[eleid];
        let srcPropArrayLen = srcObject.srcPropArray.length;
        for (let i = 0; i < srcPropArrayLen; i++) {
            let tmpProp = srcObject.srcPropArray[i];
            let tmpPropStr = tmpProp + "prop";
            // compare
            let tmpval;
            if (typeof(srcObject[tmpProp]) === 'function') {
                tmpval = srcObject[tmpProp]();
            } else {
                tmpval = srcObject[tmpProp];
            }
            if (srcObject[tmpPropStr].value != tmpval) {
                this.synchroniseTargetObj(srcObject, tmpPropStr, tmpProp);
                srcObject[tmpPropStr].value = srcObject[tmpProp];
            }
        }
    }

    synchroniseTargetObj(srcObject, srcPropStr, srcProp) {
        let tarObjArray = srcObject[srcPropStr].bindObjArray;
        let tarObjArrayLen = tarObjArray.length;
        for (let j = 0; j < tarObjArrayLen; j++) {
            let tarObj = tarObjArray[j];
            let tmpval;
            if (typeof(srcObject[srcProp]) === 'function') {
                tmpval = srcObject[srcProp]();
            } else {
                tmpval = srcObject[srcProp];
            }
            let tartmpval;
            if (tarObj.obj != null) {
                if (typeof(tarObj.obj[tarObj.prop]) === 'function') {
                    tarObj.obj[tarObj.prop](tmpval);
                } else {
                    tarObj.obj[tarObj.prop] = tmpval;
                }
            }
        }
    }

    getTargetObject(targObj, targProp) {
        let tarObject = new Object();
        tarObject.obj = targObj;
        tarObject.prop = targProp;
        return tarObject;
    }

    addBinding(srcObj, srcProp, evtname, targObj, targProp, twoway) {
        this.Binds(srcObj, srcProp, evtname, targObj, targProp);
        if (twoway) {
            this.Binds(targObj, targProp, evtname, srcObj, srcProp);
        }
    }

    removeBinding(srcObj, evtname) {
        // determine is it dom element or plain object
        let srcObject;
        if (srcObj == null)
            return;
        if (srcObj.nodeName) {
            let eleid = srcObj.id;
            if (this.BindObjDictionary[eleid] != null) {
                srcObject = this.BindObjDictionary[eleid];
                this.removeListeners(srcObject);
            } else {
                srcObject = this.BindObjDictionary[srcObj];
                this.removeListeners(srcObject);
            }

        } else {
            if (this.BindObjDictionary[srcObj] != null) {
                srcObject = this.BindObjDictionary[srcObj];
                this.removeListeners(srcObject);
            }
        }

        if (srcObject.srcPropArray.length > 0) {

            let srcPropArrayLen = srcObject.srcPropArray.length;
            for (let j = 0; j < srcPropArrayLen; j++) {
                let srcProp = srcObject.srcPropArray[j];
                let srcPropStr = srcProp + "prop";
                srcObject[srcPropStr].bindObjArray = [];
            }
        }
    }

    removeListeners(sourceObj, evtname) {
        sourceObj.removeEventListener(evtname, (e) => { this.synchronise(e); });
    }

}

const BindingUtilss = new BindingUtil();
// prevents new properties from being added to the object
Object.freeze(BindingUtilss);

export default BindingUtilss;