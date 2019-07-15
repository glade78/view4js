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


/**
 * BindingUtil
 * 
 * 
 */
class BindingUtil {

    /**
     * @description 
     * BindingUtils provides One-way and Two-way binding with Just single statement.
     * BindingUtils is Singleton class.
     * 
     * @example Add Binding :
    BindingUtils.addBinding(srcele, "value", "change", destele, "value", false);
 
            @example Remove Binding :
        BindingUtils.removeBinding(srcele, "value");
        
        @example Chain Binding :
        DOM Element to JavaScript Object :
        BindingUtils.addBinding(srcele, "value", "change", this.myCustomModel, "setValue", false);

        JavaScript Object to DOM Element :
        BindingUtils.addBinding(this.myCustomModel, "getValue", "change", destele, "value", false);
        
        @example Two-way Binding :
        BindingUtils.addBinding(srcele, "value", "change", destele, "value", true);
 
     * @memberof BindingUtil
     */
    constructor() {
        if (!BindingUtil.instance) {
            BindingUtil.instance = this;
            this.BindObjDictionary = {};
        }
        return BindingUtil.instance;

    }



    /**
     *
     * @private
     * @param {object} _srcObj - Source DOM Element or Object
     * @param {string} _srcProp - Source Property
     * @param {string} _evtname - Source Object EventName on which Binding Trigger 
     * @param {object} _targObj - Target DOM Element or Object
     * @param {string} _targProp - Target Property
     * @memberof BindingUtil
     */
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


    /**
     * @description - Add Binding method binds Source Object property with Target Object Property with Synchronize on SourceObject Event
     * @public
     * @param {object} _srcObj - Source DOM Element or Object
     * @param {string} _srcProp - Source Property
     * @param {string} _evtname - Source Object EventName on which Binding Trigger 
     * @param {object} _targObj - Target DOM Element or Object
     * @param {string} _targProp - Target Property
     * @param {Boolean} twoway - True when Binding is Two-way
     * @example Add Binding :
 BindingUtils.addBinding(srcele, "value", "change", destele, "value", false);
     * @memberof BindingUtil
     */
    addBinding(srcObj, srcProp, evtname, targObj, targProp, twoway) {
        this.Binds(srcObj, srcProp, evtname, targObj, targProp);
        if (twoway) {
            this.Binds(targObj, targProp, evtname, srcObj, srcProp);
        }
    }


    /**
     * 
     * @description - Add Binding method binds Source Object property with Target Object Property with Synchronize on SourceObject Event
     * @public
     * @param {object} _srcObj - Source DOM Element or Object
     * @param {string} _evtname - Source Object EventName on which Binding Trigger 
     * @example Remove Binding :
 BindingUtils.removeBinding(srcele, "value");
     * @memberof BindingUtil
     */
    removeBinding(_srcObj, _evtname) {
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