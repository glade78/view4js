(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('view4js')) :
  typeof define === 'function' && define.amd ? define(['view4js'], factory) :
  (factory(global.view4js));
}(this, (function (view4js) { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var View1 = function (_View) {
      inherits(View1, _View);

      function View1(_id, _route, _navevent, _navparams, _parentViewStackId) {
          classCallCheck(this, View1);
          return possibleConstructorReturn(this, _View.call(this, _id, _route, _navevent, _navparams, _parentViewStackId));
      }

      View1.prototype.initView = function initView() {
          _View.prototype.initView.call(this);
          this.back_lnk_id = "back";
          this.submit_lnk_id = "submit";
      };

      //Overrides by SubClass
      // call by attachView


      View1.prototype.bindView = function bindView() {
          _View.prototype.bindView.call(this);
      };

      /*
      Add HTML Element Event Handlers 
      call by attachView
      */


      View1.prototype.addViewHandler = function addViewHandler() {
          var _this2 = this;

          _View.prototype.addViewHandler.call(this);
          var tmpviewEl = this.getViewElement();
          var submitButt = tmpviewEl.querySelector("." + this.submit_lnk_id);
          // Use this for AutoWiring Events in HTML Tag
          var tmpFn = "handleSubmit";
          submitButt.addEventListener("click", function (e) {
              _this2[tmpFn](e);
          });
          // submitButt.addEventListener("click", (e) => { this.handleSubmit(e); });
      };

      View1.prototype.handleSubmit = function handleSubmit(event) {
          console.log("View1 Submit Clicked");
          event.preventDefault();
          var navEvent = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, "View2_Nav_Event", "testusers", this.route);
          view4js.EventBroadCaster.navEventChannel.dispatchEvent(navEvent);
      };

      // call by attachView


      View1.prototype.createViewContent = function createViewContent() {
          var tmpViewContentEl = this.createViewHTML();
          var tmpViewElement = this.getViewElement();
          tmpViewElement.insertAdjacentHTML('beforeend', tmpViewContentEl);
      };

      View1.prototype.createViewHTML = function createViewHTML() {
          var thisref = this;
          return '\n        <div class="ui content">\n                <div class="ui equal width center aligned padded grid stackable">\n                    <div class="row">\n                        <div class="five wide column">\n                            <div class="ui segments">\n                                <div class="ui segment inverted nightli">\n                                    <h3 class="ui header">\n                                        ' + thisref.id + '\n                                    </h3>\n                                </div>\n                                <div class="ui segment">\n                                    \n                                    <div class="ui divider hidden"></div>\n                                    <button class="ui primary fluid button ' + thisref.submit_lnk_id + '" data-click="handleSubmit">\n                                        <i class="send icon"></i> Submit\n                                    </button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        <!-- SignIn Panel Ends Here -->\n        ';
      };

      View1.prototype.removeViewHandler = function removeViewHandler() {
          var _this3 = this;

          _View.prototype.removeViewHandler.call(this);
          var tmpviewEl = this.getViewElement();
          var submitButt = tmpviewEl.querySelector("." + this.submit_lnk_id);
          submitButt.removeEventListener("click", function (e) {
              _this3.handleSubmit(e);
          });
      };

      return View1;
  }(view4js.View);

  var View2 = function (_View) {
      inherits(View2, _View);

      function View2(_id, _route, _navevent, _navparams, _parentViewStackId) {
          classCallCheck(this, View2);
          return possibleConstructorReturn(this, _View.call(this, _id, _route, _navevent, _navparams, _parentViewStackId));
      }

      View2.prototype.initView = function initView() {
          _View.prototype.initView.call(this);
          this.back_lnk_id = "back";
          this.submit_lnk_id = "submit";
      };

      //Overrides by SubClass
      // call by attachView


      View2.prototype.bindView = function bindView() {
          _View.prototype.bindView.call(this);
      };

      /*
      Add HTML Element Event Handlers 
      call by attachView
      */


      View2.prototype.addViewHandler = function addViewHandler() {
          var _this2 = this;

          _View.prototype.addViewHandler.call(this);
          var tmpviewEl = this.getViewElement();
          var backButt = tmpviewEl.querySelector("." + this.back_lnk_id);
          backButt.addEventListener("click", function (e) {
              _this2.dispatchNavBackEvent(e);
          });
          var submitButt = tmpviewEl.querySelector("." + this.submit_lnk_id);
          submitButt.addEventListener("click", function (e) {
              _this2.handleSubmit(e);
          });
      };

      View2.prototype.handleSubmit = function handleSubmit(event) {
          event.preventDefault();
          var navEvent = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, "View3_Nav_Event", "testusers", this.route);
          view4js.EventBroadCaster.navEventChannel.dispatchEvent(navEvent);
      };

      // call by attachView


      View2.prototype.createViewContent = function createViewContent() {
          var tmpViewContentEl = this.createViewHTML();
          var tmpViewElement = this.getViewElement();
          tmpViewElement.insertAdjacentHTML('beforeend', tmpViewContentEl);
      };

      View2.prototype.createViewHTML = function createViewHTML() {
          var thisref = this;
          return '\n        <div class="ui container">\n                <div class="ui equal width center aligned padded grid stackable">\n                    <div class="row">\n                        <div class="five wide column">\n                            <div class="ui segments">\n                                <div class="ui segment inverted nightli">\n                                    <h3 class="ui header">\n                                        ' + thisref.id + '\n                                    </h3>\n                                </div>\n                                <div class="ui segment">\n                                    <button class="ui primary fluid button ' + thisref.back_lnk_id + '">\n                                        <i class="send icon"></i> Back\n                                    </button>\n                                    <div class="ui divider hidden"></div>\n                                    <button class="ui primary fluid button ' + thisref.submit_lnk_id + '">\n                                        <i class="send icon"></i> Submit\n                                    </button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        <!-- SignIn Panel Ends Here -->\n        ';
      };

      View2.prototype.removeViewHandler = function removeViewHandler() {
          var _this3 = this;

          _View.prototype.removeViewHandler.call(this);
          var tmpviewEl = this.getViewElement();
          var backButt = tmpviewEl.querySelector("." + this.back_lnk_id);
          backButt.removeEventListener("click", function (e) {
              _this3.dispatchNavBackEvent(e);
          });
          var submitButt = tmpviewEl.querySelector("." + this.submit_lnk_id);
          submitButt.removeEventListener("click", function (e) {
              _this3.handleSubmit(e);
          });
      };

      return View2;
  }(view4js.View);

  var View3 = function (_View) {
      inherits(View3, _View);

      function View3(_id, _route, _navevent, _navparams, _parentViewStackId) {
          classCallCheck(this, View3);
          return possibleConstructorReturn(this, _View.call(this, _id, _route, _navevent, _navparams, _parentViewStackId));
      }

      View3.prototype.initView = function initView() {
          _View.prototype.initView.call(this);
          this.back_lnk_id = "back";
          this.submit_lnk_id = "submit";
      };

      //Overrides by SubClass
      // call by attachView


      View3.prototype.bindView = function bindView() {
          _View.prototype.bindView.call(this);
      };

      /*
      Add HTML Element Event Handlers 
      call by attachView
      */


      View3.prototype.addViewHandler = function addViewHandler() {
          var _this2 = this;

          _View.prototype.addViewHandler.call(this);
          var tmpviewEl = this.getViewElement();
          var backButt = tmpviewEl.querySelector("." + this.back_lnk_id);
          backButt.addEventListener("click", function (e) {
              _this2.dispatchNavBackEvent(e);
          });
          var submitButt = tmpviewEl.querySelector("." + this.submit_lnk_id);
          submitButt.addEventListener("click", function (e) {
              _this2.handleSubmit(e);
          });
      };

      View3.prototype.handleSubmit = function handleSubmit(event) {
          event.preventDefault();
          var navEvent = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, "View4_Nav_Event", "testusers", this.route);
          view4js.EventBroadCaster.navEventChannel.dispatchEvent(navEvent);
      };

      // call by attachView


      View3.prototype.createViewContent = function createViewContent() {
          var tmpViewContentEl = this.createViewHTML();
          var tmpViewElement = this.getViewElement();
          tmpViewElement.insertAdjacentHTML('beforeend', tmpViewContentEl);
      };

      View3.prototype.createViewHTML = function createViewHTML() {
          var thisref = this;
          return '\n        <div class="ui container">\n                <div class="ui equal width center aligned padded grid stackable">\n                    <div class="row">\n                        <div class="five wide column">\n                            <div class="ui segments">\n                                <div class="ui segment inverted nightli">\n                                    <h3 class="ui header">\n                                        ' + thisref.id + '\n                                    </h3>\n                                </div>\n                                <div class="ui segment">\n                                    <button class="ui primary fluid button ' + thisref.back_lnk_id + '">\n                                        <i class="send icon"></i> Back\n                                    </button>\n                                    <div class="ui divider hidden"></div>\n                                    <button class="ui primary fluid button ' + thisref.submit_lnk_id + '">\n                                        <i class="send icon"></i> Submit\n                                    </button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        <!-- SignIn Panel Ends Here -->\n        ';
      };

      View3.prototype.removeViewHandler = function removeViewHandler() {
          var _this3 = this;

          _View.prototype.removeViewHandler.call(this);
          var tmpviewEl = this.getViewElement();
          var backButt = tmpviewEl.querySelector("." + this.back_lnk_id);
          backButt.removeEventListener("click", function (e) {
              _this3.dispatchNavBackEvent(e);
          });
          var submitButt = tmpviewEl.querySelector("." + this.submit_lnk_id);
          submitButt.removeEventListener("click", function (e) {
              _this3.handleSubmit(e);
          });
      };

      return View3;
  }(view4js.View);

  var MyModel = function (_EventDispatcher) {
      inherits(MyModel, _EventDispatcher);

      function MyModel() {
          classCallCheck(this, MyModel);

          var _this = possibleConstructorReturn(this, _EventDispatcher.call(this));

          _this.value = 10;
          return _this;
      }

      MyModel.prototype.setValue = function setValue() {
          var _val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

          this.value = _val;
          this.dispatchEvent("change", this);
      };

      MyModel.prototype.getValue = function getValue() {
          return this.value;
      };

      return MyModel;
  }(view4js.EventDispatcher);

  var View4Binding = function (_View) {
      inherits(View4Binding, _View);

      function View4Binding(_id, _route, _navevent, _navparams, _parentViewStackId) {
          classCallCheck(this, View4Binding);
          return possibleConstructorReturn(this, _View.call(this, _id, _route, _navevent, _navparams, _parentViewStackId));
      }

      View4Binding.prototype.initView = function initView() {
          _View.prototype.initView.call(this);
          this.back_lnk_id = "back";
          this.submit_lnk_id = "submit";
          this.myCustomModel = new MyModel();
      };

      //Overrides by SubClass
      // call by attachView


      View4Binding.prototype.bindView = function bindView() {
          _View.prototype.bindView.call(this);
      };

      /*
      Add HTML Element Event Handlers 
      call by attachView
      */


      View4Binding.prototype.addViewHandler = function addViewHandler() {
          _View.prototype.addViewHandler.call(this);
          var tmpviewEl = this.getViewElement();
          /*let backButt = tmpviewEl.querySelector("." + this.back_lnk_id);
          backButt.addEventListener("click", (e) => { this.dispatchNavBackEvent(e); });*/

          var clicksNodeList = tmpviewEl.querySelectorAll('[data-click]');
          for (var i = 0; i < clicksNodeList.length; i++) {
              var clickNode = clicksNodeList[i];
              this.addClickHandlers(clickNode);
          }
      };

      View4Binding.prototype.addClickHandlers = function addClickHandlers(_node) {
          var _this2 = this;

          var handFnStr = _node.dataset.click;
          _node.addEventListener("click", function (e) {
              _this2[handFnStr](e);
          });
      };

      View4Binding.prototype.bindInputTextBox = function bindInputTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#inputtxt_1");
          var destele = tmpviewEl.querySelector("#lbl_1");
          destele.value = this.myCustomModel.getValue();
          view4js.BindingUtils.addBinding(srcele, "value", "change", this.myCustomModel, "setValue", false);
          view4js.BindingUtils.addBinding(this.myCustomModel, "getValue", "change", destele, "value", false);
      };

      View4Binding.prototype.removeBindInputTextBox = function removeBindInputTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#inputtxt_1");
          view4js.BindingUtils.removeBinding(srcele, "value");
      };

      View4Binding.prototype.bindTwowayInputTextBox = function bindTwowayInputTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#inputtxt_11");
          var destele = tmpviewEl.querySelector("#lbl_11");
          view4js.BindingUtils.addBinding(srcele, "value", "change", destele, "value", true);
      };

      View4Binding.prototype.removeBindTwowayInputTextBox = function removeBindTwowayInputTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#inputtxt_11");
          var destele = tmpviewEl.querySelector("#lbl_11");
          view4js.BindingUtils.removeBinding(srcele, "value");
          view4js.BindingUtils.removeBinding(destele, "value");
      };

      View4Binding.prototype.bindPasswordTextBox = function bindPasswordTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#pwd_2");
          var destele = tmpviewEl.querySelector("#lbl_2");
          view4js.BindingUtils.addBinding(srcele, "value", "change", destele, "value", false);
      };

      View4Binding.prototype.removeBindPasswordTextBox = function removeBindPasswordTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#pwd_2");
          var destele = tmpviewEl.querySelector("#lbl_2");
          view4js.BindingUtils.removeBinding(srcele, "value");
      };

      View4Binding.prototype.bindCheckBoxTextBox = function bindCheckBoxTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#chk_3");
          var destele = tmpviewEl.querySelector("#lbl_3");
          view4js.BindingUtils.addBinding(srcele, "checked", "change", destele, "value", false);
      };

      View4Binding.prototype.removeBindCheckBoxTextBox = function removeBindCheckBoxTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#chk_3");
          var destele = tmpviewEl.querySelector("#lbl_3");
          view4js.BindingUtils.removeBinding(srcele, "value");
      };

      View4Binding.prototype.bindSelectionBox = function bindSelectionBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#mySelect");
          var destele = tmpviewEl.querySelector("#lbl_4");
          view4js.BindingUtils.addBinding(srcele, "value", "change", destele, "value", false);
      };

      View4Binding.prototype.removeBindSelectionBox = function removeBindSelectionBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#mySelect");
          var destele = tmpviewEl.querySelector("#lbl_4");
          view4js.BindingUtils.removeBinding(srcele, "value");
      };

      View4Binding.prototype.handleSubmit = function handleSubmit(event) {
          event.preventDefault();
          var navEvent = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, "View3_Nav_Event", "testusers", this.route);
          view4js.EventBroadCaster.navEventChannel.dispatchEvent(navEvent);
      };

      // call by attachView


      View4Binding.prototype.createViewContent = function createViewContent() {
          var tmpViewContentEl = this.createViewHTML();
          var tmpViewElement = this.getViewElement();
          tmpViewElement.insertAdjacentHTML('beforeend', tmpViewContentEl);
      };

      View4Binding.prototype.createViewHTML = function createViewHTML() {
          return '\n        <div class="ui container">\n                <div class="ui grid">\n                    <div class="row">\n                        <div class="column">\n                            <div class="ui segments">\n                                <div class="ui segment inverted nightli">\n                                    <h3 class="ui header">\n                                        Standard HTML Elements Binding Demo using Binding Utils\n                                    </h3>\n                                </div>\n                                <div class="ui basic segment">\n  <p>BindingUtils provides One-way and Two-way binding with Just single statement. BindingUtils is Singleton class.</p>\n</div>\n<div class="ui basic segment">\n  <h4>Add Binding :</h4>\n  BindingUtils.addBinding(srcele, "value", "change", destele, "value", false);\n </br>     \n <h4>Remove Binding :</h4>\n      BindingUtils.removeBinding(srcele, "value");\n      </br>   \n      <h4>Chain Binding :</h4>\n      <h5>&nbsp;&nbsp;DOM Element to JavaScript Object :</h5>\n      BindingUtils.addBinding(srcele, "value", "change", this.myCustomModel, "setValue", false);\n      <h5>&nbsp;&nbsp;JavaScript Object to DOM Element :</h5>\n      BindingUtils.addBinding(this.myCustomModel, "getValue", "change", destele, "value", false);\n      </br> \n      <h4>Two-way Binding :</h4>\n      BindingUtils.addBinding(srcele, "value", "change", destele, "value", true);\n      </br>\n  </div>\n</div>\n                                <div class="ui segment">\n                                \n                                    <div class="ui divider hidden"></div>\n        <table class="ui celled table">\n        <thead>\n            <tr>\n                <th>Criteria</th>\n                <th>Source HTML Controls</th>\n                <th>Destination / Result of Bindable Object Value</th>\n            </tr>\n        </thead>\n        <tbody>\n\n            <tr>\n                <td>Chain Binding Demo with Input Element\n                <br>\n                Source Element -> Model Object -> Destination Element\n                </td>\n                <td style="width: 477px;">\n                </br>\n                </br>\n                     Following element demonstrates chain binding\n                     Input Element binds to Model Object binds\n                     Model Object binds to Label Element\n                     </br>\n                     </br>\n                    <input id="inputtxt_1" type="text" value="test">\n                    </br>\n                    </br>\n                    Initially clicking BindInputText will show Model value by calling myCustomModel.getValue() , which is set to 10.\n                    </br>\n                    </br>\n                    <input type="button" value="BindInputText" data-click="bindInputTextBox">\n                    </br>\n                    </br>\n                    <input type="button" value="removeBindInputText" data-click="removeBindInputTextBox">\n                </td>\n                <td>\n                    <input type="text" id="lbl_1" value="">\n                </td>\n            </tr>\n            <tr>\n                <td>Two way Binding Demo</td>\n                <td style="width: 477px;">\n                </br>\n                </br>\n                    Following element demonstrate twoway binding\n                    Input Element binds to Label Element\n                    </br>\n                    </br>\n                    <input id="inputtxt_11" type="text" value="test">\n                    </br>\n                    </br>\n                    <input type="button" value="Bind Twoway" data-click="bindTwowayInputTextBox">\n                    </br>\n                    </br>\n                    <input type="button" value="Remove TwoWay Binding" data-click="removeBindTwowayInputTextBox">\n                </td>\n                <td>\n                    <input type="text" id="lbl_11" value="">\n                </td>\n            </tr>\n            <tr>\n                <td>One way Binding Demo using Input type password Field</td>\n                <td style="width: 477px;">\n                    <input id="pwd_2" type="password" value="test">\n                    </br>\n                    </br>\n                    <input type="button" value="Bind Password Text" data-click="bindPasswordTextBox">\n\n                </td>\n                <td>\n                    <input type="text" id="lbl_2" value="">\n                </td>\n            </tr>\n\n            <tr>\n                <td>One way Binding Checkbox Element</td>\n                <td style="width: 477px;">\n                <div class="ui toggle checkbox">\n                    <input id="chk_3" type="checkbox" value="check">\n                    <label>Make my profile visible</label>\n                    </div>\n                    </br>\n                    </br>\n                    <input type="button" value="Bind CheckBox" data-click="bindCheckBoxTextBox">\n\n                </td>\n                <td>\n                    <input type="text" id="lbl_3" value="">\n                </td>\n            </tr>\n            <tr>\n                <td>One way Binding using Select Element</td>\n                <td style="width: 477px;">\n                    <select id="mySelect">\n                        <option value="Audi">Audi\n                        <option value="BMW">BMW\n                        <option value="Mercedes">Mercedes\n                        <option value="Volvo">Volvo\n                    </select>\n                    </br>\n                    </br>\n                    <input type="button" value="Bind Select Element" data-click="bindSelectionBox">\n\n                </td>\n                <td>\n                    <input type="text" id="lbl_4" value="">\n                </td>\n            </tr>\n\n\n        </tbody>\n    </table>\n    </div>\n    </div>\n</div>\n</div>\n</div>\n</div>\n        ';
      };

      View4Binding.prototype.removeViewHandler = function removeViewHandler() {
          _View.prototype.removeViewHandler.call(this);
          var tmpviewEl = this.getViewElement();
          /*let backButt = tmpviewEl.querySelector("." + this.back_lnk_id);
          backButt.removeEventListener("click", (e) => { this.dispatchNavBackEvent(e); });*/
      };

      return View4Binding;
  }(view4js.View);

  var View5Comp = function (_View) {
      inherits(View5Comp, _View);

      function View5Comp(_id, _route, _navevent, _navparams, _parentViewStackId) {
          classCallCheck(this, View5Comp);
          return possibleConstructorReturn(this, _View.call(this, _id, _route, _navevent, _navparams, _parentViewStackId));
      }

      View5Comp.prototype.initView = function initView() {
          _View.prototype.initView.call(this);
          this.back_lnk_id = "back";
          this.submit_lnk_id = "submit";
          this.myCustomModel = new MyModel();
      };

      //Overrides by SubClass
      // call by attachView


      View5Comp.prototype.bindView = function bindView() {
          _View.prototype.bindView.call(this);
      };

      /*
      Add HTML Element Event Handlers 
      call by attachView
      */


      View5Comp.prototype.addViewHandler = function addViewHandler() {
          var _this2 = this;

          _View.prototype.addViewHandler.call(this);
          var tmpviewEl = this.getViewElement();
          var backButt = tmpviewEl.querySelector("." + this.back_lnk_id);
          backButt.addEventListener("click", function (e) {
              _this2.dispatchNavBackEvent(e);
          });

          var clicksNodeList = tmpviewEl.querySelectorAll('[data-click]');
          for (var i = 0; i < clicksNodeList.length; i++) {
              var clickNode = clicksNodeList[i];
              this.addClickHandlers(clickNode);
          }
      };

      View5Comp.prototype.addClickHandlers = function addClickHandlers(_node) {
          var _this3 = this;

          var handFnStr = _node.dataset.click;
          _node.addEventListener("click", function (e) {
              _this3[handFnStr](e);
          });
      };

      View5Comp.prototype.bindInputTextBox = function bindInputTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#inputtxt_1");
          var destele = tmpviewEl.querySelector("#lbl_1");
          destele.value = this.myCustomModel.getValue();
          view4js.BindingUtils.addBinding(srcele, "value", "change", this.myCustomModel, "setValue", false);
          view4js.BindingUtils.addBinding(this.myCustomModel, "getValue", "change", destele, "value", false);
      };

      View5Comp.prototype.removeBindInputTextBox = function removeBindInputTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#inputtxt_1");
          view4js.BindingUtils.removeBinding(srcele, "value");
      };

      View5Comp.prototype.bindTwowayInputTextBox = function bindTwowayInputTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#inputtxt_11");
          var destele = tmpviewEl.querySelector("#lbl_11");
          view4js.BindingUtils.addBinding(srcele, "value", "change", destele, "value", true);
      };

      View5Comp.prototype.removeBindTwowayInputTextBox = function removeBindTwowayInputTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#inputtxt_11");
          var destele = tmpviewEl.querySelector("#lbl_11");
          view4js.BindingUtils.removeBinding(srcele, "value");
          view4js.BindingUtils.removeBinding(destele, "value");
      };

      View5Comp.prototype.bindPasswordTextBox = function bindPasswordTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#pwd_2");
          var destele = tmpviewEl.querySelector("#lbl_2");
          view4js.BindingUtils.addBinding(srcele, "value", "change", destele, "value", false);
      };

      View5Comp.prototype.removeBindPasswordTextBox = function removeBindPasswordTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#pwd_2");
          var destele = tmpviewEl.querySelector("#lbl_2");
          view4js.BindingUtils.removeBinding(srcele, "value");
      };

      View5Comp.prototype.bindCheckBoxTextBox = function bindCheckBoxTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#chk_3");
          var destele = tmpviewEl.querySelector("#lbl_3");
          view4js.BindingUtils.addBinding(srcele, "checked", "change", destele, "value", false);
      };

      View5Comp.prototype.removeBindCheckBoxTextBox = function removeBindCheckBoxTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#chk_3");
          var destele = tmpviewEl.querySelector("#lbl_3");
          view4js.BindingUtils.removeBinding(srcele, "value");
      };

      View5Comp.prototype.bindSelectionBox = function bindSelectionBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#mySelect");
          var destele = tmpviewEl.querySelector("#lbl_4");
          view4js.BindingUtils.addBinding(srcele, "value", "change", destele, "value", false);
      };

      View5Comp.prototype.removeBindSelectionBox = function removeBindSelectionBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#mySelect");
          var destele = tmpviewEl.querySelector("#lbl_4");
          view4js.BindingUtils.removeBinding(srcele, "value");
      };

      View5Comp.prototype.handleSubmit = function handleSubmit(event) {
          event.preventDefault();
          var navEvent = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, "View3_Nav_Event", "testusers", this.route);
          view4js.EventBroadCaster.navEventChannel.dispatchEvent(navEvent);
      };

      // call by attachView


      View5Comp.prototype.createViewContent = function createViewContent() {
          var tmpViewContentEl = this.createViewHTML();
          var tmpViewElement = this.getViewElement();
          tmpViewElement.insertAdjacentHTML('beforeend', tmpViewContentEl);
      };

      View5Comp.prototype.createViewHTML = function createViewHTML() {
          var thisref = this;
          return '\n        <div class="ui container">\n        <div class="ui equal width center aligned padded grid stackable">\n            <div class="row">\n                <div class="five wide column">\n                    <div class="ui segments">\n                        <div class="ui segment inverted nightli">\n                            <h3 class="ui header">\n                                ' + thisref.id + '\n                            </h3>\n                        </div>\n                        <div class="ui segment">\n                            <button class="ui primary fluid button ' + thisref.back_lnk_id + '">\n                                <i class="send icon"></i> Back\n                            </button>\n                            <div class="ui divider hidden"></div>\n                            <table class="ui celled table">\n                                <thead>\n                                    <tr>\n                                        <th></th>\n                                        <th>HTML Controls</th>\n                                        <th>Bindable Object Value</th>\n\n\n                                    </tr>\n                                </thead>\n                                <tbody>\n\n                                    <tr>\n                                        <td>Test Input Values</td>\n                                        <td style="width: 477px;">\n                                            <br>\n                                            Following element demonstrates chain binding\n                                            Input Element binds to Model Object binds\n                                            Model Object binds to Label Element\n                                            <br>\n                                            <br>\n                                            <div class="ui input ">\n                                                <input id="inputtxt_1" type="text" value="test">\n                                            </div>\n                                            <br>\n                                            <br>\n                                            Initially clicking BindInputText will show Model value by calling\n                                            myCustomModel.getValue() , which is set to 10.\n                                            <br>\n                                            <br>\n                                            <button class="ui primary fluid button" data-click="bindInputTextBox">\n                                                <i class="home icon"></i> BindInputText\n                                            </button>\n\n                                            <br>\n                                            <button class="ui secondary fluid button" data-click="removeBindInputTextBox">\n                                                <i class="home icon"></i> RemoveBindInputText\n                                            </button>\n\n                                        </td>\n                                        <td>\n                                            <div class="ui input ">\n                                                <input type="text" id="lbl_1" value="">\n                                            </div>\n                                        </td>\n                                    </tr>\n                                    <tr>\n                                        <td>Test Input Values</td>\n                                        <td style="width: 477px;">\n                                            <br>\n                                            Following element demonstrate twoway binding\n                                            Input Element binds to Label Element\n                                            <br>\n                                            <br>\n                                            <div class="ui input ">\n                                                <input id="inputtxt_11" type="text" value="test">\n                                            </div>\n                                            <br>\n                                            <button class="ui primary fluid button" data-click="bindTwowayInputTextBox">\n                                                <i class="home icon"></i> Bind Twoway\n                                            </button>\n\n                                            <br>\n                                            <button class="ui secondary fluid button" data-click="removeBindTwowayInputTextBox">\n                                                <i class="home icon"></i> Remove Bind\n                                            </button>\n\n\n                                        </td>\n                                        <td>\n                                            <div class="ui input ">\n                                                <input type="text" id="lbl_11" value="">\n                                            </div>\n                                        </td>\n                                    </tr>\n                                    <tr>\n                                        <td>Test Password Values</td>\n                                        <td style="width: 477px;">\n                                            <div class="ui input ">\n                                                <input id="pwd_2" type="password" value="test">\n                                            </div>\n                                            <br>\n                                            <button class="ui primary fluid button" data-click="bindPasswordTextBox">\n                                                <i class="key icon"></i> Bind Password\n                                            </button>\n\n\n                                        </td>\n                                        <td>\n                                            <div class="ui input ">\n\n                                                <input type="text" id="lbl_2" value="">\n                                            </div>\n                                        </td>\n                                    </tr>\n\n                                    <tr>\n                                        <td>Test CheckBox Values</td>\n                                        <td style="width: 477px;">\n                                            <div class="ui toggle checkbox">\n                                                <input id="chk_3" type="checkbox" value="check">\n                                                <label>Make my profile visible</label>\n                                                <br>\n                                            </div>\n                                            <button class="ui primary fluid button" data-click="bindCheckBoxTextBox">\n                                                <i class="home icon"></i> Bind Checkbox\n                                            </button>\n\n\n\n                                        </td>\n                                        <td>\n                                            <div class="ui input ">\n                                                <input type="text" id="lbl_3" value="">\n                                            </div>\n                                        </td>\n                                    </tr>\n                                    <tr>\n                                        <td>Test Selection Values</td>\n                                        <td style="width: 477px;">\n                                            <select class="ui dropdown fluid" id="mySelect">\n                                                <option value="Audi">Audi\n                                                <option value="BMW">BMW\n                                                <option value="Mercedes">Mercedes\n                                                <option value="Volvo">Volvo\n                                            </select>\n                                            <br>\n                                            <button class="ui primary fluid button" data-click="bindSelectionBox">\n                                                <i class="home icon"></i> Bind Dropdown\n                                            </button>\n\n\n                                        </td>\n                                        <td>\n                                            <div class="ui input ">\n                                                <input type="text" id="lbl_4" value="">\n                                            </div>\n                                        </td>\n                                    </tr>\n\n\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n        ';
      };

      View5Comp.prototype.removeViewHandler = function removeViewHandler() {
          var _this4 = this;

          _View.prototype.removeViewHandler.call(this);
          var tmpviewEl = this.getViewElement();
          var backButt = tmpviewEl.querySelector("." + this.back_lnk_id);
          backButt.removeEventListener("click", function (e) {
              _this4.dispatchNavBackEvent(e);
          });
      };

      return View5Comp;
  }(view4js.View);

  var SemanticUIConstant = function () {
      function SemanticUIConstant() {
          classCallCheck(this, SemanticUIConstant);
      }

      createClass(SemanticUIConstant, null, [{
          key: "LOADING",
          get: function get$$1() {
              return "loading";
          }
      }, {
          key: "LOADED",
          get: function get$$1() {
              return "loaded";
          }
      }, {
          key: "SUCCESS",
          get: function get$$1() {
              return "success";
          }
      }, {
          key: "ERROR",
          get: function get$$1() {
              return "error";
          }
      }, {
          key: "WARNING",
          get: function get$$1() {
              return "warning";
          }
      }, {
          key: "READONLY",
          get: function get$$1() {
              return "read-only";
          }
      }, {
          key: "ENABLED",
          get: function get$$1() {
              return "enabled";
          }
      }, {
          key: "DISABLED",
          get: function get$$1() {
              return "disabled";
          }
      }, {
          key: "TOGGLE",
          get: function get$$1() {
              return "toggle";
          }
      }, {
          key: "SLIDER",
          get: function get$$1() {
              return "slider";
          }
      }, {
          key: "HIDDEN",
          get: function get$$1() {
              return "hidden";
          }
      }, {
          key: "VISIBLE",
          get: function get$$1() {
              return "visible";
          }
      }]);
      return SemanticUIConstant;
  }();

  var SemanticUITmpl = function () {
      function SemanticUITmpl() {
          classCallCheck(this, SemanticUITmpl);
      }

      /**
       * let menudata = [
       *  { dataTab: "home", icon: "home", label: "Home" },
          { dataTab: "browse", icon: "th large", label: "Browse" }
          ];
       */

      /**
       * 
       * Navigators Templates
       */

      SemanticUITmpl.TAB_MENU_HTML = function TAB_MENU_HTML(_menudata, _id) {
          var tabmenu = '\n        <div class="ui mainfooter bottom fixed five mini labeled icon borderless menu ' + _id + '">\n            <div class="ui  grid container">\n                ' + _menudata.map(function (menuitem) {
              return '<div class="three wide column">\n                    <a class="item" href="#" data-tab="' + menuitem.dataTab + '"><i class="' + menuitem.icon + ' icon"></i>' + menuitem.label + '</a>\n                </div>';
          }).join(' ') + '\n            </div>\n        </div>';

          return tabmenu;
      };

      SemanticUITmpl.TAB_CONTENT_PANEL = function TAB_CONTENT_PANEL(_panelId) {
          return '<div class="ui tab ' + _panelId + '" data-tab="' + _panelId + '"></div>';
      };

      SemanticUITmpl.ACCORDION_MENU = function ACCORDION_MENU(_menuId) {
          return '<div class="ui accordion ' + _menuId + '"></div>';
      };

      SemanticUITmpl.ACCORDION_PANEL = function ACCORDION_PANEL(_title, _contentHTML) {
          return '<div class="title">\n                <i class="dropdown icon"></i>\n            ' + _title + '\n            </div>\n            <div class="content">\n                ' + _contentHTML + '\n            </div>';
      };

      SemanticUITmpl.SIDEBAR_MENU_HTML = function SIDEBAR_MENU_HTML(_menudata) {
          var sidebarmenu = '\n        <div class="ui visible inverted left vertical sidebar menu">\n            ' + _menudata.map(function (menuitem) {
              return '<a class="item" data-navevent="' + menuitem.navEvent + '">' + menuitem.label + '</a>';
          }).join(' ') + '\n        </div>';
          return sidebarmenu;
      };

      SemanticUITmpl.SIDEBAR_CONTENT_PANEL = function SIDEBAR_CONTENT_PANEL() {
          return '<div class="pusher" style="border-radius: 0!important; border: 0; margin-left: 260px; -webkit-transition-duration: 0.1s;">\n        \n        </div>';
      };

      SemanticUITmpl.NAVIGATIONBAR_MENU_HTML = function NAVIGATIONBAR_MENU_HTML(_menudata) {
          var navbarmenu = '\n        <div class="ui secondary  menu">\n            ' + _menudata.map(function (menuitem) {
              return '<a class="item" data-navevent="' + menuitem.navEvent + '">' + menuitem.label + '</a>';
          }).join(' ') + '\n        </div>';
          return navbarmenu;
      };

      SemanticUITmpl.HORI_TEXT_MENU_HTML = function HORI_TEXT_MENU_HTML(_menudata) {
          var navbarmenu = '\n        <div class="ui text menu">\n            ' + _menudata.map(function (menuitem) {
              return '<a class="item" data-navevent="' + menuitem.navEvent + '">' + menuitem.label + '</a>';
          }).join(' ') + '\n        </div>';
          return navbarmenu;
      };

      SemanticUITmpl.SIDENAV_VERTICAL_MENU_HTML = function SIDENAV_VERTICAL_MENU_HTML(_menudata) {
          var navbarmenu = '\n        <div class="ui vertical pointing menu">\n            ' + _menudata.map(function (menuitem) {
              return '<a class="item" data-navevent="' + menuitem.navEvent + '">' + menuitem.label + '</a>';
          }).join(' ') + '\n        </div>';
          return navbarmenu;
      };

      SemanticUITmpl.SIDENAV_SEC_VERTICAL_MENU_HTML = function SIDENAV_SEC_VERTICAL_MENU_HTML(_menudata) {
          var navbarmenu = '\n        <div class="ui secondary vertical pointing menu">\n            ' + _menudata.map(function (menuitem) {
              return '<a class="item" data-navevent="' + menuitem.navEvent + '">' + menuitem.label + '</a>';
          }).join(' ') + '\n        </div>';
          return navbarmenu;
      };

      SemanticUITmpl.SIDENAV_SECTION_VERTICAL_MENU_HTML = function SIDENAV_SECTION_VERTICAL_MENU_HTML(_mainmenudata, _secdata) {
          var navbarmenu = '\n        <div class="ui sidebar inverted vertical left menu overlay visible">\n            ' + _secdata.map(function (menudataitem) {
              return '<div class="item">\n                    <div class="header">' + menudataitem + '</div>\n                    ' + SemanticUITmpl.SIDENAV_SECTION_MENU(_mainmenudata, menudataitem) + '\n                </div>\n                ';
          }).join(' ') + '\n        </div>';
          return navbarmenu;
      };

      SemanticUITmpl.SIDENAV_SECTION_MENU = function SIDENAV_SECTION_MENU(_menudata, _secname) {
          var contentmenu = '\n            <div class="menu">\n                ' + _menudata.map(function (menuitem) {
              return _secname == menuitem.section ? '<a class="item" data-navevent="' + menuitem.navEvent + '">' + menuitem.label + '</a>' : '';
          }).join(' ') + '\n            </div>\n    ';
          return contentmenu;
      };

      SemanticUITmpl.TOPNAV_SEC_HORI_MENU_HTML = function TOPNAV_SEC_HORI_MENU_HTML(_menudata) {
          var navbarmenu = '\n        <div class="ui secondary pointing menu">\n            ' + _menudata.map(function (menuitem) {
              return '<a class="item" data-navevent="' + menuitem.navEvent + '">' + menuitem.label + '</a>';
          }).join(' ') + '\n        </div>';
          return navbarmenu;
      };

      /*
      
      type : checkbox,toggle,slider
      */

      SemanticUITmpl.SLIDER = function SLIDER(_label) {
          return SemanticUITmpl.CHECKBOX(_label, "slider");
      };

      SemanticUITmpl.TOGGLE = function TOGGLE(_label) {
          return SemanticUITmpl.CHECKBOX(_label, "toggle");
      };

      SemanticUITmpl.CHECKBOX = function CHECKBOX(_label, _type) {
          var chkbox = '<div class="ui checkbox ' + _type + '">\n        <input type="checkbox" name="example">\n        <label>' + _label + '</label></div>';
          return chkbox;
      };

      SemanticUITmpl.STEPPER = function STEPPER() {
          var _initValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

          var _maxSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

          var steper = '<div class="ui right labeled input">\n        <input type="text" size="' + _maxSize + '" value="' + _initValue + '">\n        <button class="ui tiny left attached icon button" command="increment"> <i class="plus icon"></i></button>\n        <button class="ui tiny right attached icon button" command="decrement"> <i class="minus icon"></i></button>\n    </div>';
          return steper;
      };

      SemanticUITmpl.RADIO_BUTTON_GROUP = function RADIO_BUTTON_GROUP() {
          var _dp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var _grpName = arguments[1];

          var _titleTxt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Please select any item";

          var radioGrpEl = '\n        <div class="ui form">\n        <div class="grouped fields">\n            <label>' + _titleTxt + '</label>\n            ' + _dp.map(function (menuitem, i) {
              return '<div class="field">\n                <div class="ui radio checkbox" data-value="' + menuitem.value + '" data-index="' + i + '">\n                    <input type="radio" name="' + _grpName + '" tabindex="0" class="hidden">\n                    <label>' + menuitem.label + '</label>\n                </div>\n            </div></br>';
          }).join(' ') + '\n        </div>\n        </div>\n        ';
          return radioGrpEl;
      };

      SemanticUITmpl.DROPDOWN = function DROPDOWN() {
          var _dp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var _name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Dropdown";

          var _placeHolder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "DropDown";

          var dropdwn = '\n        <div class="ui selection dropdown" tabindex="0">\n            <input type="hidden" name="' + _name + '">\n            <i class="dropdown icon"></i>\n            <div class="default text">' + _placeHolder + '</div>\n            <div class="menu transition hidden" tabindex="-1">\n                ' + _dp.map(function (menuitem, i) {
              return '<div class="item" data-value="' + menuitem.value + '" data-index="' + i + '"> ' + menuitem.label + '</div>';
          }).join(' ') + '\n            </div>\n        </div>\n        ';

          return dropdwn;
      };

      SemanticUITmpl.DATAGRID = function DATAGRID() {
          var _dp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var _columnArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          var _isSortable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

          var _isSelectable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

          var dg = '\n        <table class="ui ' + (_isSelectable ? 'selectable' : '') + ' ' + (_isSortable ? 'sortable' : '') + ' celled table">\n            <thead>\n                <tr>\n                ' + _columnArray.map(function (colitem, i) {
              return '<th data-field="' + colitem.dataField + '" data-type="' + colitem.dataType + '" data-colindex="' + i + '"> ' + colitem.label + '</th>';
          }).join(' ') + '\n                </tr>\n            </thead>\n            <tbody>\n            ' + SemanticUITmpl.DATAGRIDROWS(_dp, _columnArray) + '\n            </tbody>\n        </table>\n        ';

          return dg;
      };

      SemanticUITmpl.DATAGRIDROWS = function DATAGRIDROWS() {
          var _dp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var _columnArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          var dgrows = '' + _dp.map(function (rowitem, j) {
              return '<tr data-rowindex = "' + j + '" data-id="' + rowitem.id + '">\n                ' + SemanticUITmpl.DATAGRIDROW(rowitem, _columnArray) + '\n            </tr>\n            ';
          }).join(' ');
          return dgrows;
      };

      SemanticUITmpl.DATAGRIDROW = function DATAGRIDROW() {
          var _rowitem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var _colArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          var dgrow = '\n            ' + _colArray.map(function (colitem) {
              return '<td> ' + _rowitem[colitem.dataField] + '</td>';
          }).join(' ') + '\n       ';
          return dgrow;
      };

      /*${
              (() => {
                  if(_icon != "") {
                      return `<i class="icon ${_icon}"></i>`;
                  } 
              })()
            }*/


      SemanticUITmpl.BUTTON = function BUTTON() {
          var _label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

          var _icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

          var _buttonprop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Basic";

          var tmpButt = '<button class="ui ' + _buttonprop + ' button">\n        ' + (_icon != "" ? '<i class="icon ' + _icon + '"></i>' : '') + '\n        ' + _label + '\n      </button>';
          return tmpButt;
      };

      SemanticUITmpl.TOOLBUTTON = function TOOLBUTTON() {

          var _icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

          var _buttonprop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Basic";

          var _toollbl = arguments[3];
          var _toolpos = arguments[4];
          var _toolinverted = arguments[5];

          var tmpToolButt = '<div class="ui ' + (_icon != "" ? 'icon' : '') + ' ' + _buttonprop + ' button" \n        ' + (_toollbl != "" ? 'data-tooltip="' + _toollbl + '"' : '') + '\n        ' + (_toolpos != "" ? 'data-position="' + _toolpos + '"' : '') + '\n        ' + (_toolinverted == true ? 'data-inverted=""' : '') + '\n        >\n        ' + (_icon != "" ? '<i class="' + _icon + ' icon"></i>' : '') + ' \n        \n      </div>';
          return tmpToolButt;
      };

      SemanticUITmpl.PROGRESSBAR = function PROGRESSBAR() {
          var _size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "tiny";

          var _label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Waiting to Start";

          var progEl = '<div class="ui ' + _size + ' progress" data-percent="0">\n        <div class="bar" style="transition-duration: 300ms; width: 0%;">\n          <div class="progress">0%</div>\n        </div>\n        <div class="label">' + _label + '</div>\n      </div>';
          return progEl;
      };

      SemanticUITmpl.MESSAGEBOX = function MESSAGEBOX() {
          var _icon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

          var _title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Title";

          var _msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Sample Message";

          var _type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Info";

          var _isCloseable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

          var msgcontent = '<div class="ui ' + (_icon != "" ? 'icon' : '') + ' ' + _type + ' message">\n        ' + (_icon != "" ? '<i class="' + _icon + ' icon"></i>' : '') + '\n        ' + (_isCloseable ? '<i class="close icon"></i>' : '') + ' \n         <div class="content">\n           <div class="header">\n             ' + _title + '\n           </div>\n           <p>' + _msg + '</p>\n         </div>\n       </div>';
          return msgcontent;
      };

      SemanticUITmpl.STEPCONTAINER = function STEPCONTAINER() {
          var stepsEl = '<div class="ui steps"></div>';
          return stepsEl;
      };

      SemanticUITmpl.STEP = function STEP() {
          var _icon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

          var _title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Title";

          var _description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Sample Message";

          var stepEl = '<div class="step">\n        ' + (_icon != "" ? '<i class="' + _icon + ' icon"></i>' : '') + '\n        <div class="content">\n          <div class="title">' + _title + '</div>\n          <div class="description">' + _description + '</div>\n        </div>\n      </div>';
          return stepEl;
      };

      SemanticUITmpl.HIDDEN_DIVIDER = function HIDDEN_DIVIDER() {
          var hiddivder = '<div class="ui hidden divider"></div>';
          return hiddivder;
      };

      SemanticUITmpl.CSSPROPARRAYSTR = function CSSPROPARRAYSTR() {
          var _arrystr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

          //array = ["test","test2","test3"]
          var tmparray = _arrystr.toString();
          var tmparray2 = tmparray.replace(/,/g, " ");
          return tmparray2;
      };

      return SemanticUITmpl;
  }();

  var Checkbox = function (_Component) {
      inherits(Checkbox, _Component);

      function Checkbox() {
          var _id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var _parentViewId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          var _parentContainerId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

          var _createDOMElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

          classCallCheck(this, Checkbox);
          return possibleConstructorReturn(this, _Component.call(this, _id, _parentViewId, _parentContainerId, _createDOMElement));
      }

      Checkbox.prototype.init = function init() {
          var _checked = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

          var _label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "CheckBox Label";

          var _type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

          var _formId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "defaultform";

          this.checked = _checked;
          this.label = _label;
          this.formId = _formId;
          this.type = _type;
          _Component.prototype.init.call(this);
      };

      Checkbox.prototype.initComponent = function initComponent() {
          _Component.prototype.initComponent.call(this);
      };

      Checkbox.prototype.createDOMContent = function createDOMContent() {
          _Component.prototype.createDOMContent.call(this);
          var tmpCompContentEl = this.createComponentHTML();
          this.addToComponentElement(tmpCompContentEl);
          //if(this.componentElement != null)
          //this.componentElement.insertAdjacentHTML('beforeend', tmpCompContentEl);
      };

      Checkbox.prototype.addEventHandler = function addEventHandler() {
          var _this2 = this;

          _Component.prototype.addEventHandler.call(this);
          if (this.componentElement != null) {
              var chkboxEl = this.componentElement.querySelector("input[type='checkbox']");
              chkboxEl.addEventListener("change", function (e) {
                  _this2.checkBoxHandler(e);
              });
          }
      };

      Checkbox.prototype.checkBoxHandler = function checkBoxHandler(event) {
          event.preventDefault();
          var srcObjfrmEvt = event.target;
          if (srcObjfrmEvt.checked == true) this.checked = true;else this.checked = false;
          this.dispatchEvent(view4js.EventUtils.CHANGE, this);
      };

      Checkbox.prototype.setComponentEnabled = function setComponentEnabled() {
          _Component.prototype.setComponentEnabled.call(this);
          var chkboxEl = this.componentElement.querySelector("input[type='checkbox']");
          var chkboxElDiv = this.componentElement.querySelector(".ui.checkbox");
          if (this.enabled == false) {
              chkboxEl.setAttribute(SemanticUIConstant.DISABLED, SemanticUIConstant.DISABLED);
              chkboxElDiv.classList.add(SemanticUIConstant.DISABLED);
          } else {
              if (chkboxEl.hasAttribute(SemanticUIConstant.DISABLED)) {
                  chkboxEl.removeAttribute(SemanticUIConstant.DISABLED);
                  chkboxElDiv.classList.remove(SemanticUIConstant.DISABLED);
              }
          }
      };

      Checkbox.prototype.setComponentReadOnly = function setComponentReadOnly() {
          _Component.prototype.setComponentReadOnly.call(this);
          var chkboxElDiv = this.componentElement.querySelector(".ui.checkbox");
          var chkboxEl = this.componentElement.querySelector("input[type='checkbox']");
          if (this.readOnly) {
              chkboxEl.setAttribute("class", "hidden");
              chkboxElDiv.classList.add(SemanticUIConstant.READONLY);
          } else {
              if (chkboxEl.hasAttribute("class")) {
                  chkboxEl.removeAttribute("class");
                  chkboxElDiv.classList.remove(SemanticUIConstant.READONLY);
              }
          }
      };

      Checkbox.prototype.createComponentHTML = function createComponentHTML() {
          return SemanticUITmpl.CHECKBOX(this.label, this.type);
          /*return `
          <div class="ui checkbox ${thisref.type}">
              <input type="checkbox" name="example">
              <label>${thisref.label}</label>
          </div>
          `;*/
      };

      return Checkbox;
  }(view4js.Component);

  var View6Comp = function (_View) {
      inherits(View6Comp, _View);

      function View6Comp(_id, _route, _navevent, _navparams, _parentViewStackId) {
          classCallCheck(this, View6Comp);
          return possibleConstructorReturn(this, _View.call(this, _id, _route, _navevent, _navparams, _parentViewStackId));
      }

      View6Comp.prototype.initView = function initView() {
          _View.prototype.initView.call(this);
          this.back_lnk_id = "back";
          this.submit_lnk_id = "submit";
          this.myCustomModel = new MyModel();
      };

      //Overrides by SubClass
      // call by attachView


      View6Comp.prototype.bindView = function bindView() {
          _View.prototype.bindView.call(this);
      };

      /*
      Add HTML Element Event Handlers 
      call by attachView
      */


      View6Comp.prototype.addViewHandler = function addViewHandler() {
          var _this2 = this;

          _View.prototype.addViewHandler.call(this);
          var tmpviewEl = this.getViewElement();
          var backButt = tmpviewEl.querySelector("." + this.back_lnk_id);
          backButt.addEventListener("click", function (e) {
              _this2.dispatchNavBackEvent(e);
          });

          /*let clicksNodeList = tmpviewEl.querySelectorAll('[data-click]');
          for (let i = 0; i < clicksNodeList.length; i++) {
              let clickNode = clicksNodeList[i];
              this.addClickHandlers(clickNode);
          }*/
      };

      View6Comp.prototype.addClickHandlers = function addClickHandlers(_node) {
          var _this3 = this;

          var handFnStr = _node.dataset.click;
          _node.addEventListener("click", function (e) {
              _this3[handFnStr](e);
          });
      };

      View6Comp.prototype.bindCheckBoxTextBox = function bindCheckBoxTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#chk_3");
          var destele = tmpviewEl.querySelector("#lbl_3");
          BindingUtils.addBinding(srcele, "checked", "change", destele, "value", false);
      };

      View6Comp.prototype.removeBindCheckBoxTextBox = function removeBindCheckBoxTextBox() {
          var tmpviewEl = this.getViewElement();
          var srcele = tmpviewEl.querySelector("#chk_3");
          var destele = tmpviewEl.querySelector("#lbl_3");
          BindingUtils.removeBinding(srcele, "value");
      };

      View6Comp.prototype.handleSubmit = function handleSubmit(event) {
          event.preventDefault();
          var navEvent = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, "View3_Nav_Event", "testusers", this.route);
          view4js.EventBroadCaster.navEventChannel.dispatchEvent(navEvent);
      };

      // call by attachView


      View6Comp.prototype.createViewContent = function createViewContent() {
          var tmpViewContentEl = this.createViewHTML();
          this.addToViewElement(tmpViewContentEl);
          //let tmpViewElement = this.getViewElement();
          //tmpViewElement.insertAdjacentHTML('beforeend', tmpViewContentEl);
          var chkBoxCmp = new Checkbox("usrChkBox", this.id, "loginPanel", false);
          chkBoxCmp.init(false, "Test Label");
          chkBoxCmp.attach();
          chkBoxCmp.enabled = false;
          var chkBoxCmp2 = new Checkbox("usrChkBox2", this.id, "loginPanel", true);
          chkBoxCmp2.init(true, "Chk Label", SemanticUIConstant.SLIDER);
          chkBoxCmp2.attach();
          chkBoxCmp2.readOnly = false;
      };

      /**
       *
       * @description Creating HTML 
       * @returns
       * @memberof View6Comp
       */


      View6Comp.prototype.createViewHTML = function createViewHTML() {
          var thisref = this;
          return '\n        <div class="ui container">\n        <div class="ui equal width center aligned padded grid stackable">\n            <div class="row">\n                <div class="five wide column">\n                    <div class="ui segments">\n                        <div class="ui segment inverted nightli">\n                            <h3 class="ui header">\n                                ' + thisref.id + '\n                            </h3>\n                        </div>\n                        <div class="ui segment">\n                            <button class="ui primary fluid button ' + thisref.back_lnk_id + '">\n                                <i class="send icon"></i> Back\n                            </button>\n                            <div class="ui divider hidden"></div>\n                            <table class="ui celled table">\n                                <thead>\n                                    <tr>\n                                        <th></th>\n                                        <th>HTML Controls</th>\n                                        <th>Bindable Object Value</th>\n\n\n                                    </tr>\n                                </thead>\n                                <tbody>    \n                                 <!-- Start of component test -->\n                                    <tr>\n                                        <td>Test CheckBox Values</td>\n                                        <td style="width: 477px;">\n                                            \n                                        <div class="vjs-container loginPanel" data-layout="form" style="display: block;">\n                                        <div class="vjs-component usrChkBox" data-component="input" style="display: block;">\n                                            <div class="ui checkbox">\n                                                <input type="checkbox" name="example">\n                                                <label>Test</label>\n                                            </div>\n                                        </div>\n                                    </div>\n\n                                    <div class="vjs-container StepperPanel" data-layout="form" style="display: block;">\n                                        <div class="vjs-component usrStepper" data-component="input" style="display: block;">\n                                        \n                                            <!-- Start of component -->\n                                            <div class="ui right labeled input">\n    <input type="text" id="txtNum" size="3" value="5">\n    <div class="ui mini vertical buttons">\n        <button class="ui icon button" command="Up"> <i class="up chevron icon"></i>\n\n        </button>\n        <button class="ui icon button" command="Down"> <i class="down chevron icon"></i>\n\n        </button>\n    </div>\n</div>\n                                            <!-- End of Component -->\n\n                                            <!-- Start of component -->\n                                            \n                                            <div class="ui right labeled input">\n    <input type="text" id="txtNum" size="3" value="5">\n    <button class="ui tiny left attached icon button" command="Up"> <i class="plus icon"></i>\n\n        </button>\n    <button class="ui tiny right attached icon button" command="Down"> <i class="minus icon"></i>\n\n        </button>\n</div>\n                                            <!-- End of Component -->\n                                        </div>\n                                    </div>\n\n                                            <button class="ui primary fluid button" data-click="bindCheckBoxTextBox">\n                                                <i class="home icon"></i> Bind Checkbox\n                                            </button>\n\n\n\n                                        </td>\n                                        <td>\n                                            <div class="ui input ">\n                                                <input type="text" id="lbl_3" value="">\n                                            </div>\n                                        </td>\n                                    </tr>\n                                    <!-- End of component test -->\n                                    <tr>\n                                        <td>Test CheckBox Values</td>\n                                        <td style="width: 477px;">\n                                            <div class="ui toggle checkbox">\n                                                <input id="chk_3" type="checkbox" value="check">\n                                                <label>Make my profile visible</label>\n                                                <br>\n                                            </div>\n                                            <button class="ui primary fluid button" data-click="bindCheckBoxTextBox">\n                                                <i class="home icon"></i> Bind Checkbox\n                                            </button>\n\n\n\n                                        </td>\n                                        <td>\n                                            <div class="ui input ">\n                                                <input type="text" id="lbl_3" value="">\n                                            </div>\n                                        </td>\n                                    </tr>\n                                   \n\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n        ';
      };

      View6Comp.prototype.removeViewHandler = function removeViewHandler() {
          var _this4 = this;

          _View.prototype.removeViewHandler.call(this);
          var tmpviewEl = this.getViewElement();
          var backButt = tmpviewEl.querySelector("." + this.back_lnk_id);
          backButt.removeEventListener("click", function (e) {
              _this4.dispatchNavBackEvent(e);
          });
      };

      return View6Comp;
  }(view4js.View);

  var SimpleNavigator = function (_ViewNavigator) {
      inherits(SimpleNavigator, _ViewNavigator);

      function SimpleNavigator(_id, _parentId) {
          classCallCheck(this, SimpleNavigator);
          return possibleConstructorReturn(this, _ViewNavigator.call(this, _id, _parentId));
      }

      //Overrides by SubClass


      SimpleNavigator.prototype.initNavigator = function initNavigator() {
          this.initEventRoutes();
      };

      //Overrides by SubClass


      SimpleNavigator.prototype.renderNavigatorContent = function renderNavigatorContent() {
          _ViewNavigator.prototype.renderNavigatorContent.call(this);
      };

      //Overrides by SubClass
      //_id, _route, _navparams, _parentViewStackId


      SimpleNavigator.prototype.createView = function createView(_viewId, _route, _navevent, _navparams, _viewStackId) {
          var tmpView = null;
          switch (_viewId) {
              case "p1view1":
                  tmpView = new View1(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;
              case "p1view2":
                  tmpView = new View2(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;
              case "p1view3":
                  tmpView = new View3(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;
              case "p1view4":
                  tmpView = new View4Binding(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;
              case "p1view5":
                  tmpView = new View5Comp(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;
              case "p1view6":
                  tmpView = new View6Comp(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;
              default:
                  tmpView = new View(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;

          }
          return tmpView;
      };

      //Overrides by SubClass
      //_id, _route, _parentId


      SimpleNavigator.prototype.createViewStack = function createViewStack(_viewStackId, _route, _parentId) {
          return new view4js.ViewStack(_viewStackId, _route, _parentId);
      };

      SimpleNavigator.prototype.initEventRoutes = function initEventRoutes() {
          var tmpEvntRoutes = [{ navEvent: "View1_Nav_Event", viewstackId: "ViewStack1", viewId: "p1view1", path: "/path1" }, { navEvent: "View2_Nav_Event", viewstackId: "ViewStack1", viewId: "p1view2", path: "/path1" }, { navEvent: "View3_Nav_Event", viewstackId: "ViewStack1", viewId: "p1view3", path: "/path1" }, { navEvent: "View4_Nav_Event", viewstackId: "ViewStack1", viewId: "p1view6", path: "/path1" }];
          this.eventRouter = new view4js.EventRouter(tmpEvntRoutes);
      };

      return SimpleNavigator;
  }(view4js.ViewNavigator);

  var SideBarViewStack = function (_ViewStack) {
      inherits(SideBarViewStack, _ViewStack);

      function SideBarViewStack(_id, _route, _parentId) {
          classCallCheck(this, SideBarViewStack);
          return possibleConstructorReturn(this, _ViewStack.call(this, _id, _route, _parentId));
      }

      SideBarViewStack.prototype.initViewStack = function initViewStack() {};

      SideBarViewStack.prototype.getViewStackRootElement = function getViewStackRootElement() {
          var tmpStackEl = view4js.ElementUtils.viewStack(this.id);
          var tmpTabEl = tmpStackEl.querySelector('.pusher');
          return tmpTabEl;
      };

      //Overrides by SubClass


      SideBarViewStack.prototype.renderViewStackContent = function renderViewStackContent() {
          _ViewStack.prototype.renderViewStackContent.call(this);
          var tmpStackEl = view4js.ElementUtils.viewStack(this.id);
          var tmpsidebarel = SemanticUITmpl.SIDEBAR_CONTENT_PANEL(this.id);
          tmpStackEl.insertAdjacentHTML('beforeend', tmpsidebarel);
      };

      return SideBarViewStack;
  }(view4js.ViewStack);

  var TopBarNavigator = function (_ViewNavigator) {
      inherits(TopBarNavigator, _ViewNavigator);

      function TopBarNavigator(_id, _parentId) {
          classCallCheck(this, TopBarNavigator);
          return possibleConstructorReturn(this, _ViewNavigator.call(this, _id, _parentId));
      }

      //Overrides by SubClass


      TopBarNavigator.prototype.initNavigator = function initNavigator() {
          this.history = true;
          this.initEventRoutes();
      };

      //Overrides by SubClass
      //_id, _route, _navparams, _parentViewStackId


      TopBarNavigator.prototype.createView = function createView(_viewId, _route, _navevent, _navparams, _viewStackId) {
          var tmpView = null;
          switch (_viewId) {
              case "p8view1":
                  tmpView = new View1(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;
              case "p8view2":
                  tmpView = new View2(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;
              case "p8view3":
                  tmpView = new View3(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;
              default:
                  tmpView = new View(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;

          }
          return tmpView;
      };

      //Overrides by SubClass
      //_id, _route, _parentId
      //createViewStack(_viewStackId, _route, _parentId) {
      //     super.createViewStack();
      // }

      TopBarNavigator.prototype.renderNavigatorContent = function renderNavigatorContent() {
          var _this2 = this;

          _ViewNavigator.prototype.renderNavigatorContent.call(this);
          var tmpmnudata = this.getmenudata();
          var tabmenuel = SemanticUITmpl.TOPNAV_SEC_HORI_MENU_HTML(tmpmnudata);
          var tmpNavigatorEl = view4js.ElementUtils.viewNavigator(this.id);
          tmpNavigatorEl.insertAdjacentHTML('beforeend', tabmenuel);

          var menuItemList = tmpNavigatorEl.querySelectorAll(".item");

          for (var i = 0; i < menuItemList.length; i++) {
              menuItemList[i].addEventListener("click", function (e) {
                  _this2.handleMenuClick(e);
              });
          }

          menuItemList[0].classList.add('active');
      };

      TopBarNavigator.prototype.createMenuViewStack = function createMenuViewStack(_viewStackId, _route, _parentId) {
          var tmpViewStack = this.createViewStack(_viewStackId, _route, _parentId);
          tmpViewStack.render();
          this.viewstacks[_viewStackId] = tmpViewStack;
      };

      TopBarNavigator.prototype.handleMenuClick = function handleMenuClick(event) {
          event.preventDefault();
          var el = event.currentTarget;
          var tmpnavevent = el.dataset.navevent;
          var tmpmnudata = this.getmenudata();
          var tmpPath = null;
          for (var j = 0; j < tmpmnudata.length; j++) {
              if (tmpmnudata[j].navEvent == tmpnavevent) tmpPath = tmpmnudata[j].path;
          }

          var navEvent = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, tmpnavevent, "testusers", tmpPath);
          view4js.EventBroadCaster.navEventChannel.dispatchEvent(navEvent);
      };

      TopBarNavigator.prototype.setActiveMenuElement = function setActiveMenuElement(_navEvent) {
          var tmpNavigatorEl = view4js.ElementUtils.viewNavigator(this.id);
          var tmpMenuEl = tmpNavigatorEl.querySelector('[data-navevent=' + _navEvent + ']');
          tmpMenuEl.classList.add('active');
      };

      TopBarNavigator.prototype.removeActiveMenuElement = function removeActiveMenuElement() {
          var tmpNavigatorEl = view4js.ElementUtils.viewNavigator(this.id);
          var menuItemList = tmpNavigatorEl.querySelectorAll(".item");

          for (var i = 0; i < menuItemList.length; i++) {
              menuItemList[i].classList.remove('active');
          }
      };

      TopBarNavigator.prototype.getmenudata = function getmenudata() {
          var navbarMenuArray = [{ navEvent: "View1_Nav_Event", icon: "home", label: "View1", path: "/path8" }, { navEvent: "View2_Nav_Event", icon: "th large", label: "View2", path: "/path8" }, { navEvent: "View3_Nav_Event", icon: "tags", label: "View3", path: "/path8" }];
          return navbarMenuArray;
      };

      TopBarNavigator.prototype.initEventRoutes = function initEventRoutes() {
          var tmpEvntRoutes = [{ navEvent: "View1_Nav_Event", viewstackId: "ViewStack8", viewId: "p8view1", path: "/path8" }, { navEvent: "View2_Nav_Event", viewstackId: "ViewStack8", viewId: "p8view2", path: "/path8" }, { navEvent: "View3_Nav_Event", viewstackId: "ViewStack8", viewId: "p8view3", path: "/path8" }];
          this.eventRouter = new view4js.EventRouter(tmpEvntRoutes);
      };

      return TopBarNavigator;
  }(view4js.ViewNavigator);

  var SideBarNavigator = function (_ViewNavigator) {
      inherits(SideBarNavigator, _ViewNavigator);

      function SideBarNavigator(_id, _parentId) {
          classCallCheck(this, SideBarNavigator);
          return possibleConstructorReturn(this, _ViewNavigator.call(this, _id, _parentId));
      }

      //Overrides by SubClass


      SideBarNavigator.prototype.initNavigator = function initNavigator() {
          //this.history = false;
          this.initEventRoutes();
      };

      //Overrides by SubClass
      //_id, _route, _navparams, _parentViewStackId


      SideBarNavigator.prototype.createView = function createView(_viewId, _route, _navevent, _navparams, _viewStackId) {
          var tmpView = null;
          switch (_viewId) {
              case "p7view1":
                  tmpView = new View1(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;
              case "p7view2":
                  tmpView = new View2(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;
              case "p7view3":
                  tmpView = new View3(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;
              default:
                  tmpView = new View(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;

          }
          return tmpView;
      };

      //Overrides by SubClass
      //_id, _route, _parentId


      SideBarNavigator.prototype.createViewStack = function createViewStack(_viewStackId, _route, _parentId) {
          return new SideBarViewStack(_viewStackId, _route, _parentId);
      };

      SideBarNavigator.prototype.renderNavigatorContent = function renderNavigatorContent() {
          var _this2 = this;

          _ViewNavigator.prototype.renderNavigatorContent.call(this);
          var tmpmnudata = this.getmenudata();
          var tabmenuel = SemanticUITmpl.SIDEBAR_MENU_HTML(tmpmnudata);
          var tmpNavigatorEl = view4js.ElementUtils.viewNavigator(this.id);
          tmpNavigatorEl.insertAdjacentHTML('beforeend', tabmenuel);

          // for (let j = 0; j < tmpmnudata.length; j++) {
          //     this.createMenuViewStack(tmpmnudata[j].dataTab, tmpmnudata[j].path, this.id)
          // }

          var menuItemList = tmpNavigatorEl.querySelectorAll(".item");

          for (var i = 0; i < menuItemList.length; i++) {
              menuItemList[i].addEventListener("click", function (e) {
                  _this2.handleMenuClick(e);
              });
          }

          menuItemList[0].classList.add('active');

          // Initialize Semantic UI SideBar Menu
          //$('.ui.sidebar')
          // .sidebar('toggle');
      };

      SideBarNavigator.prototype.createMenuViewStack = function createMenuViewStack(_viewStackId, _route, _parentId) {
          var tmpViewStack = this.createViewStack(_viewStackId, _route, _parentId);
          tmpViewStack.render();
          this.viewstacks[_viewStackId] = tmpViewStack;
      };

      SideBarNavigator.prototype.handleMenuClick = function handleMenuClick(event) {
          event.preventDefault();
          var el = event.currentTarget;
          var tmpnavevent = el.dataset.navevent;
          var tmpmnudata = this.getmenudata();
          var tmpPath = null;
          for (var j = 0; j < tmpmnudata.length; j++) {
              if (tmpmnudata[j].navEvent == tmpnavevent) tmpPath = tmpmnudata[j].path;
          }

          var navEvent = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, tmpnavevent, "testusers", tmpPath);
          view4js.EventBroadCaster.navEventChannel.dispatchEvent(navEvent);
      };

      SideBarNavigator.prototype.setActiveMenuElement = function setActiveMenuElement(_navEvent) {
          var tmpNavigatorEl = view4js.ElementUtils.viewNavigator(this.id);
          var tmpMenuEl = tmpNavigatorEl.querySelector('[data-navevent=' + _navEvent + ']');
          tmpMenuEl.classList.add('active');
      };

      SideBarNavigator.prototype.removeActiveMenuElement = function removeActiveMenuElement() {
          var tmpNavigatorEl = view4js.ElementUtils.viewNavigator(this.id);
          var menuItemList = tmpNavigatorEl.querySelectorAll(".item");

          for (var i = 0; i < menuItemList.length; i++) {
              menuItemList[i].classList.remove('active');
          }
      };

      SideBarNavigator.prototype.getmenudata = function getmenudata() {
          var sidebarMenuArray = [{ navEvent: "View1_Nav_Event", icon: "home", label: "View1", path: "/path7" }, { navEvent: "View2_Nav_Event", icon: "th large", label: "View2", path: "/path7" }, { navEvent: "View3_Nav_Event", icon: "tags", label: "View3", path: "/path7" }];
          return sidebarMenuArray;
      };

      SideBarNavigator.prototype.initEventRoutes = function initEventRoutes() {
          var tmpEvntRoutes = [{ navEvent: "View1_Nav_Event", viewstackId: "ViewStack7", viewId: "p7view1", path: "/path7" }, { navEvent: "View2_Nav_Event", viewstackId: "ViewStack7", viewId: "p7view2", path: "/path7" }, { navEvent: "View3_Nav_Event", viewstackId: "ViewStack7", viewId: "p7view3", path: "/path7" }];
          this.eventRouter = new view4js.EventRouter(tmpEvntRoutes);
      };

      return SideBarNavigator;
  }(view4js.ViewNavigator);

  var ViewNestedNavigator = function (_View) {
      inherits(ViewNestedNavigator, _View);

      function ViewNestedNavigator(_id, _route, _navevent, _navparams, _parentViewStackId) {
          classCallCheck(this, ViewNestedNavigator);
          return possibleConstructorReturn(this, _View.call(this, _id, _route, _navevent, _navparams, _parentViewStackId));
      }

      ViewNestedNavigator.prototype.initView = function initView() {
          _View.prototype.initView.call(this);
      };

      //Overrides by SubClass
      // call by attachView


      ViewNestedNavigator.prototype.bindView = function bindView() {
          _View.prototype.bindView.call(this);
      };

      /*
      Add HTML Element Event Handlers 
      call by attachView
      */


      ViewNestedNavigator.prototype.addViewHandler = function addViewHandler() {
          _View.prototype.addViewHandler.call(this);
          //Navigation Bar TOP 
          var navEvent8 = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, "View1_Nav_Event", "testusers", "/path8");
          view4js.EventBroadCaster.navEventChannel.dispatchEvent(navEvent8);
      };

      // call by attachView


      ViewNestedNavigator.prototype.createViewContent = function createViewContent() {
          var tmpViewContentEl = this.createViewHTML();
          var tmpViewElement = this.getViewElement();
          tmpViewElement.insertAdjacentHTML('beforeend', tmpViewContentEl);
      };

      ViewNestedNavigator.prototype.createViewHTML = function createViewHTML() {
          return '\n        <div id="nestednavigator"></div>\n        ';
      };

      return ViewNestedNavigator;
  }(view4js.View);

  var SemanticUILayoutUtil = function () {
      function SemanticUILayoutUtil() {
          classCallCheck(this, SemanticUILayoutUtil);
      }

      SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER = function ADD_HIDDEN_DIVIDER(_parentEl) {
          var tmpHidDividerEl = SemanticUITmpl.HIDDEN_DIVIDER();
          _parentEl.insertAdjacentHTML('beforeend', tmpHidDividerEl);
      };

      return SemanticUILayoutUtil;
  }();

  // Semantic UI Button : Icon,Label

  var Button = function (_Component) {
      inherits(Button, _Component);

      function Button() {
          var _id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var _parentViewId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          var _parentContainerId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

          var _createDOMElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

          classCallCheck(this, Button);
          return possibleConstructorReturn(this, _Component.call(this, _id, _parentViewId, _parentContainerId, _createDOMElement));
      }

      Button.prototype.init = function init() {
          var _icon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

          var _label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

          var _properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

          var _formId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "defaultform";

          this.icon = _icon;
          this.label = _label;
          this.formId = _formId;
          this.properties = _properties;
          _Component.prototype.init.call(this);
      };

      Button.prototype.initComponent = function initComponent() {
          _Component.prototype.initComponent.call(this);
      };

      Button.prototype.createDOMContent = function createDOMContent() {
          _Component.prototype.createDOMContent.call(this);
          var tmpCompContentEl = this.createComponentHTML();
          this.addToComponentElement(tmpCompContentEl);
          //if(this.componentElement != null)
          //this.componentElement.insertAdjacentHTML('beforeend', tmpCompContentEl);
      };

      Button.prototype.addEventHandler = function addEventHandler() {
          var _this2 = this;

          _Component.prototype.addEventHandler.call(this);
          if (this.componentElement != null) {
              var buttEl = this.componentElement.querySelector(".ui.button");
              buttEl.addEventListener("click", function (e) {
                  _this2.clickHandler(e);
              });
          }
      };

      Button.prototype.clickHandler = function clickHandler(event) {
          event.preventDefault();
          this.dispatchEvent(view4js.EventUtils.CLICK, this);
      };

      Button.prototype.setComponentEnabled = function setComponentEnabled() {
          _Component.prototype.setComponentEnabled.call(this);
          var buttEl = this.componentElement.querySelector(".ui.button");
          if (this.enabled == false) {
              buttEl.classList.add(SemanticUIConstant.DISABLED);
          } else {
              buttEl.classList.remove(SemanticUIConstant.DISABLED);
          }
      };

      // Button does not have ReadOnly Property


      Button.prototype.setComponentReadOnly = function setComponentReadOnly() {
          _Component.prototype.setComponentReadOnly.call(this);
      };

      Button.prototype.createComponentHTML = function createComponentHTML() {
          var csspropstr = SemanticUITmpl.CSSPROPARRAYSTR(this.properties);
          return SemanticUITmpl.BUTTON(this.label, this.icon, csspropstr);
      };

      return Button;
  }(view4js.Component);

  var ConditionButtons = function (_Component) {
      inherits(ConditionButtons, _Component);

      function ConditionButtons() {
          var _id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var _parentViewId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          var _parentContainerId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

          var _createDOMElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

          classCallCheck(this, ConditionButtons);
          return possibleConstructorReturn(this, _Component.call(this, _id, _parentViewId, _parentContainerId, _createDOMElement));
      }

      ConditionButtons.prototype.init = function init(_condButton1Property, _condButton2Property) {
          var _conditionLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "or";

          var _formId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "defaultform";

          this.condition1Button = {};
          this.condition2Button = {};
          this.formId = _formId;
          this.conditionLabel = _conditionLabel;

          this.condition1Button.icon = _condButton1Property.icon;
          this.condition1Button.label = _condButton1Property.label;
          this.condition1Button.properties = _condButton1Property.properties;

          this.condition2Button.icon = _condButton2Property.icon;
          this.condition2Button.label = _condButton2Property.label;
          this.condition2Button.properties = _condButton2Property.properties;
          _Component.prototype.init.call(this);
      };

      ConditionButtons.prototype.initComponent = function initComponent() {
          _Component.prototype.initComponent.call(this);
      };

      ConditionButtons.prototype.createDOMContent = function createDOMContent() {
          _Component.prototype.createDOMContent.call(this);
          var tmpCompContentEl = this.createComponentHTML();
          this.addToComponentElement(tmpCompContentEl);
          //if(this.componentElement != null)
          //this.componentElement.insertAdjacentHTML('beforeend', tmpCompContentEl);
      };

      ConditionButtons.prototype.addEventHandler = function addEventHandler() {
          var _this2 = this;

          _Component.prototype.addEventHandler.call(this);
          if (this.componentElement != null) {
              var buttEls = this.componentElement.querySelectorAll(".ui.button");
              var butt1El = buttEls[0];
              var butt2El = buttEls[1];
              butt1El.addEventListener("click", function (e) {
                  _this2.button1ClickHandler(e);
              });
              butt2El.addEventListener("click", function (e) {
                  _this2.button2ClickHandler(e);
              });
          }
      };

      ConditionButtons.prototype.button1ClickHandler = function button1ClickHandler(event) {
          event.preventDefault();
          this.dispatchEvent(this.BUTTON1_CLICK, this);
      };

      ConditionButtons.prototype.button2ClickHandler = function button2ClickHandler(event) {
          event.preventDefault();
          this.dispatchEvent(this.BUTTON2_CLICK, this);
      };

      ConditionButtons.prototype.setComponentEnabled = function setComponentEnabled() {
          _Component.prototype.setComponentEnabled.call(this);
          var buttEls = this.componentElement.querySelectorAll(".ui.button");
          if (this.enabled == false) {
              buttEls[0].classList.add(SemanticUIConstant.DISABLED);
              buttEls[1].classList.add(SemanticUIConstant.DISABLED);
          } else {
              buttEls[0].classList.remove(SemanticUIConstant.DISABLED);
              buttEls[1].classList.remove(SemanticUIConstant.DISABLED);
          }
      };

      // Button does not have ReadOnly Property


      ConditionButtons.prototype.setComponentReadOnly = function setComponentReadOnly() {
          _Component.prototype.setComponentReadOnly.call(this);
      };

      ConditionButtons.prototype.createComponentHTML = function createComponentHTML() {
          var thisRef = this;
          var csspropstr1 = SemanticUITmpl.CSSPROPARRAYSTR(this.condition1Button.properties);
          var csspropstr2 = SemanticUITmpl.CSSPROPARRAYSTR(this.condition2Button.properties);
          var button1Content = SemanticUITmpl.BUTTON(this.condition1Button.label, this.condition1Button.icon, csspropstr1);
          var button2Content = SemanticUITmpl.BUTTON(this.condition2Button.label, this.condition2Button.icon, csspropstr2);
          return '<div class="ui buttons">\n        ' + button1Content + '\n        <div class="or" data-text="' + thisRef.conditionLabel + '"></div>\n        ' + button2Content + '\n        </div>';
      };

      ConditionButtons.BUTTON1_CLICK = function BUTTON1_CLICK() {
          return "button1click";
      };

      ConditionButtons.BUTTON2_CLICK = function BUTTON2_CLICK() {
          return "button2click";
      };

      return ConditionButtons;
  }(view4js.Component);

  var ProgressBar = function (_Component) {
      inherits(ProgressBar, _Component);

      function ProgressBar() {
          var _id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var _parentViewId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          var _parentContainerId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

          var _createDOMElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

          classCallCheck(this, ProgressBar);
          return possibleConstructorReturn(this, _Component.call(this, _id, _parentViewId, _parentContainerId, _createDOMElement));
      }

      ProgressBar.prototype.init = function init() {
          var _size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

          var _label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

          var _formId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "defaultform";

          this.size = _size;
          this.label = _label;
          this.formId = _formId;
          _Component.prototype.init.call(this);
      };

      ProgressBar.prototype.initComponent = function initComponent() {
          _Component.prototype.initComponent.call(this);
          this.percent = 0;
          this.state = "";
      };

      ProgressBar.prototype.createDOMContent = function createDOMContent() {
          _Component.prototype.createDOMContent.call(this);
          var tmpCompContentEl = this.createComponentHTML();
          this.addToComponentElement(tmpCompContentEl);
      };

      ProgressBar.prototype.addEventHandler = function addEventHandler() {
          _Component.prototype.addEventHandler.call(this);
      };

      ProgressBar.prototype.setProgress = function setProgress() {
          var _percent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

          var _label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Waiting to Start";

          var _state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

          if (this.percent < _percent) {
              this.percent = _percent;
              var progressEl = this.componentElement.querySelector(".ui.progress");
              if (_state != '') {
                  progressEl.classList.add(_state);
              }
              progressEl.setAttribute("data-percent", this.percent.toString());
              var barEl = progressEl.querySelector(".bar");
              barEl.style.width = this.percent.toString() + "%";
              barEl.firstChild.innerHTML = this.percent.toString() + "%";
              var progClsEl = progressEl.querySelector(".progress");
              var labelEl = progressEl.querySelector(".label");
              this.label = _label;
              progClsEl.innerHTML = this.percent.toString() + "%";
              labelEl.innerHTML = this.label;
          }
      };

      ProgressBar.prototype.setComponentEnabled = function setComponentEnabled() {
          _Component.prototype.setComponentEnabled.call(this);
          var progressEl = this.componentElement.querySelector(".ui.progress");
          if (this.enabled == false) {
              progressEl.classList.add(SemanticUIConstant.DISABLED);
          } else {
              progressEl.classList.remove(SemanticUIConstant.DISABLED);
          }
      };

      //  does not have ReadOnly Property


      ProgressBar.prototype.setComponentReadOnly = function setComponentReadOnly() {
          _Component.prototype.setComponentReadOnly.call(this);
      };

      ProgressBar.prototype.createComponentHTML = function createComponentHTML() {
          return SemanticUITmpl.PROGRESSBAR(this.size, this.label);
      };

      return ProgressBar;
  }(view4js.Component);

  var Stepper = function (_Component) {
      inherits(Stepper, _Component);

      function Stepper() {
          var _id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var _parentViewId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          var _parentContainerId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

          var _createDOMElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

          classCallCheck(this, Stepper);
          return possibleConstructorReturn(this, _Component.call(this, _id, _parentViewId, _parentContainerId, _createDOMElement));
      }

      Stepper.prototype.init = function init() {
          var _min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

          var _max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

          var _step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

          var _initValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

          this.minValue = _min;
          this.maxValue = _max;
          this.maxSize = _max.toString().length;
          this.stepSize = _step;
          this.initialValue = _initValue;
          this.value = _initValue;
          _Component.prototype.init.call(this);
      };

      Stepper.prototype.initComponent = function initComponent() {
          _Component.prototype.initComponent.call(this);
      };

      Stepper.prototype.createDOMContent = function createDOMContent() {
          _Component.prototype.createDOMContent.call(this);
          var tmpCompContentEl = this.createComponentHTML();
          this.addToComponentElement(tmpCompContentEl);
      };

      Stepper.prototype.addEventHandler = function addEventHandler() {
          var _this2 = this;

          _Component.prototype.addEventHandler.call(this);
          if (this.componentElement != null) {
              var inputEl = this.componentElement.querySelector("input[type='text']");
              var incrementButtEl = this.componentElement.querySelector("button[command='increment']");
              var decrementButtEl = this.componentElement.querySelector("button[command='decrement']");
              inputEl.addEventListener("change", function (e) {
                  _this2.inputHandler(e);
              });
              incrementButtEl.addEventListener("click", function (e) {
                  _this2.incrementHandler(e);
              });
              decrementButtEl.addEventListener("click", function (e) {
                  _this2.decrementHandler(e);
              });
          }
      };

      Stepper.prototype.inputHandler = function inputHandler(event) {
          event.preventDefault();
          var srcObjfrmEvt = event.target;
          var tmpVal = srcObjfrmEvt.value;
          this.doProcess(tmpVal, true);
      };

      Stepper.prototype.decrementHandler = function decrementHandler(event) {
          event.preventDefault();
          var tmpVal = this.value - this.stepSize;
          this.doProcess(tmpVal, false);
      };

      Stepper.prototype.incrementHandler = function incrementHandler(event) {
          event.preventDefault();
          var tmpVal = this.value + this.stepSize;
          this.doProcess(tmpVal, false);
      };

      Stepper.prototype.doProcess = function doProcess(_tmpVal) {
          var _isInputEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          var inputEl = this.componentElement.querySelector("input[type='text']");
          var inputVal = _tmpVal !== '' ? parseInt(_tmpVal) : this.initialValue;
          if (inputVal <= this.maxValue && inputVal >= this.minValue) {
              this.value = inputVal;
              if (_isInputEvent == false) {
                  inputEl.value = this.value;
              }
              this.dispatchEvent(view4js.EventUtils.CHANGE, this);
          } else {
              if (_isInputEvent == true) {
                  // restore original value in input text
                  inputEl.value = this.value;
              }
          }
      };

      Stepper.prototype.setComponentEnabled = function setComponentEnabled() {
          _Component.prototype.setComponentEnabled.call(this);
          var textEl = this.componentElement.querySelector("input[type='text']");
          var incrementButtEl = this.componentElement.querySelector("button[command='increment']");
          var decrementButtEl = this.componentElement.querySelector("button[command='decrement']");
          var chkboxElDiv = this.componentElement.querySelector(".ui.checkbox");
          if (this.enabled == false) {
              textEl.setAttribute(SemanticUIConstant.DISABLED, SemanticUIConstant.DISABLED);
              incrementButtEl.classList.add(SemanticUIConstant.DISABLED);
              decrementButtEl.classList.add(SemanticUIConstant.DISABLED);
          } else {
              if (textEl.hasAttribute(SemanticUIConstant.DISABLED)) {
                  textEl.removeAttribute(SemanticUIConstant.DISABLED);
                  incrementButtEl.classList.remove(SemanticUIConstant.DISABLED);
                  decrementButtEl.classList.remove(SemanticUIConstant.DISABLED);
              }
          }
      };

      Stepper.prototype.setComponentReadOnly = function setComponentReadOnly() {
          _Component.prototype.setComponentReadOnly.call(this);
      };

      Stepper.prototype.createComponentHTML = function createComponentHTML() {
          return SemanticUITmpl.STEPPER(this.initialValue, this.maxSize);
      };

      return Stepper;
  }(view4js.Component);

  /**
   * DataProvider :
   * Array of Objects 
   * let dropdownDp = [
   *      {label:"Item1",value:1},
   *      {label:"Item2",value:2}
   * ]
   */

  var Dropdown = function (_Component) {
      inherits(Dropdown, _Component);

      function Dropdown() {
          var _id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var _parentViewId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          var _parentContainerId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

          var _createDOMElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

          classCallCheck(this, Dropdown);
          return possibleConstructorReturn(this, _Component.call(this, _id, _parentViewId, _parentContainerId, _createDOMElement));
      }

      Dropdown.prototype.init = function init() {
          var _dataProvider = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var _label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Dropdown Label";

          var _name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Dropdown";

          var _placeholdName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Dropdown";

          var _formId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "defaultform";

          this.dataProvider = _dataProvider;
          this.label = _label;
          this.formId = _formId;
          this.name = _name;
          this.selectedItem = null;
          this.selectedIndex = 0;
          this.placeholderName = _placeholdName;
          this.menuState = SemanticUIConstant.HIDDEN;
          _Component.prototype.init.call(this);
      };

      Dropdown.prototype.initComponent = function initComponent() {
          _Component.prototype.initComponent.call(this);
      };

      Dropdown.prototype.createDOMContent = function createDOMContent() {
          _Component.prototype.createDOMContent.call(this);
          var tmpCompContentEl = this.createComponentHTML();
          this.addToComponentElement(tmpCompContentEl);
      };

      Dropdown.prototype.addEventHandler = function addEventHandler() {
          var _this2 = this;

          _Component.prototype.addEventHandler.call(this);
          if (this.componentElement != null) {
              var dropdownEl = this.componentElement.querySelector(".ui.selection.dropdown");
              dropdownEl.addEventListener("click", function (e) {
                  _this2.dropdownClickHandler(e);
              });

              var menuItemList = this.componentElement.querySelectorAll(".item");
              for (var i = 0; i < menuItemList.length; i++) {
                  menuItemList[i].addEventListener("click", function (e) {
                      _this2.handleMenuClick(e);
                  });
              }
              if (this.selectedIndex != -1 && menuItemList.length > 0) {
                  menuItemList[this.selectedIndex].classList.add('active');
                  menuItemList[this.selectedIndex].classList.add('selected');
              }
          }
      };

      Dropdown.prototype.handleMenuClick = function handleMenuClick(event) {
          event.preventDefault();
          var el = event.currentTarget;

          if (this.dataProvider[el.dataset.index].value == el.dataset.value) {
              this.changeSelectedItem(el.dataset.index);
          }
          this.hideDropdownMenu();
      };

      Dropdown.prototype.changeSelectedItem = function changeSelectedItem() {
          var _index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

          if (_index != -1) {
              //Change SelectedItem & Index Property
              this.selectedIndex = _index;
              this.selectedItem = this.dataProvider[_index];

              //Change Display Text with Selected Item Label
              var txtItem = this.componentElement.querySelector(".text");
              txtItem.firstChild.nodeValue = this.selectedItem.label;
              txtItem.classList.remove("default");

              //Remove Old Selected Item in ItemList of Dropdown Menu
              var tmpSlctItem = this.componentElement.querySelector(".item.active.selected");
              tmpSlctItem.classList.remove('active');
              tmpSlctItem.classList.remove('selected');

              //Add Selected Item in ItemList of Dropdown Menu
              var menuEl = this.componentElement.querySelector('[data-index="' + _index + '"]');
              menuEl.classList.add('active');
              menuEl.classList.add('selected');

              // Add Selected value to Hidden Element
              var hiddenEl = this.componentElement.querySelector("input[type='hidden']");
              hiddenEl.setAttribute("value", this.selectedItem.value);

              // Dispatch Change Event 
              this.dispatchEvent(view4js.EventUtils.CHANGE, this);
          }
      };

      Dropdown.prototype.dropdownClickHandler = function dropdownClickHandler(event) {
          event.preventDefault();
          if (this.menuState == SemanticUIConstant.HIDDEN) {
              this.showDropdownMenu();
              this.menuState = SemanticUIConstant.VISIBLE;
          } else {
              this.hideDropdownMenu();
              this.menuState = SemanticUIConstant.HIDDEN;
          }
          this.dispatchEvent(view4js.EventUtils.CLICK, this);
      };

      Dropdown.prototype.showDropdownMenu = function showDropdownMenu() {
          var dropdownEl = this.componentElement.querySelector(".menu.transition");
          dropdownEl.classList.remove(SemanticUIConstant.HIDDEN);
          dropdownEl.classList.add(SemanticUIConstant.VISIBLE);
          view4js.ElementUtils.showElement(dropdownEl);
      };

      Dropdown.prototype.hideDropdownMenu = function hideDropdownMenu() {
          var dropdownEl = this.componentElement.querySelector(".menu.transition");
          dropdownEl.classList.remove(SemanticUIConstant.VISIBLE);
          dropdownEl.classList.add(SemanticUIConstant.HIDDEN);
          view4js.ElementUtils.hideElement(dropdownEl);
      };

      Dropdown.prototype.setComponentEnabled = function setComponentEnabled() {
          _Component.prototype.setComponentEnabled.call(this);
          //TODO   
      };

      Dropdown.prototype.setComponentReadOnly = function setComponentReadOnly() {
          _Component.prototype.setComponentReadOnly.call(this);
      };

      Dropdown.prototype.createComponentHTML = function createComponentHTML() {
          return SemanticUITmpl.DROPDOWN(this.dataProvider, this.name, this.placeholderName);
      };

      return Dropdown;
  }(view4js.Component);

  var ComponentEventUtil = function () {
      function ComponentEventUtil() {
          classCallCheck(this, ComponentEventUtil);
      }

      createClass(ComponentEventUtil, null, [{
          key: "CLOSE",
          get: function get$$1() {
              return "close";
          }
      }, {
          key: "CLICK",
          get: function get$$1() {
              return "click";
          }
      }, {
          key: "STATUSCHANGE",
          get: function get$$1() {
              return "statuschange";
          }
      }]);
      return ComponentEventUtil;
  }();

  var Step = function (_Component) {
      inherits(Step, _Component);

      function Step() {
          var _id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var _parentViewId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          var _parentContainerId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

          var _createDOMElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

          classCallCheck(this, Step);
          return possibleConstructorReturn(this, _Component.call(this, _id, _parentViewId, _parentContainerId, _createDOMElement));
      }

      Step.prototype.init = function init() {
          _Component.prototype.init.call(this);
          this.steps = [];
      };

      Step.prototype.createDOMContent = function createDOMContent() {
          _Component.prototype.createDOMContent.call(this);
          var tmpCompContentEl = this.createComponentHTML();
          this.addToComponentElement(tmpCompContentEl);
      };

      Step.prototype.createComponentHTML = function createComponentHTML() {
          return SemanticUITmpl.STEPCONTAINER();
      };

      Step.prototype.addStep = function addStep() {
          var _icon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

          var _title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Title";

          var _description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Sample Message";

          var step = {};
          step.icon = _icon;
          step.title = _title;
          step.description = _description;
          step.state = "";
          this.steps.push(step);
          var stepEl = SemanticUITmpl.STEP(step.icon, step.title, step.description);
          var stepContainer = this.componentElement.querySelector(".ui.steps");
          stepContainer.insertAdjacentHTML('beforeend', stepEl);
      };

      Step.prototype.changeStepStatus = function changeStepStatus() {
          var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

          var _status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

          var stepList = this.componentElement.querySelectorAll(".step");
          var stepEl = stepList[index - 1];
          stepEl.className = "";
          stepEl.classList.add("step");
          stepEl.classList.add(_status);
          this.dispatchEvent(ComponentEventUtil.STATUSCHANGE, this);
      };

      Step.prototype.destroy = function destroy() {
          this.steps = [];
          var parentEl = ElementUtils.container(this.parentContainerId);
          var compoEl = this.componentElement;
          parentEl.removeChild(compoEl);
      };

      return Step;
  }(view4js.Component);

  var MessageBox = function (_Component) {
      inherits(MessageBox, _Component);

      function MessageBox() {
          var _id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var _parentViewId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          var _parentContainerId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

          var _createDOMElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

          classCallCheck(this, MessageBox);
          return possibleConstructorReturn(this, _Component.call(this, _id, _parentViewId, _parentContainerId, _createDOMElement));
      }

      MessageBox.prototype.init = function init() {
          var _icon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

          var _title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Title";

          var _msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Sample Message";

          var _type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Info";

          var _isCloseable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

          _Component.prototype.init.call(this);
          this.message = {};
          this.message.icon = _icon;
          this.message.title = _title;
          this.message.msg = _msg;
          this.message.type = _type;
          this.message.isCloseable = _isCloseable;
      };

      MessageBox.prototype.initComponent = function initComponent() {
          _Component.prototype.initComponent.call(this);
      };

      MessageBox.prototype.addEventHandler = function addEventHandler() {
          var _this2 = this;

          _Component.prototype.addEventHandler.call(this);
          if (this.componentElement != null && this.message.isCloseable == true) {
              var closeEl = this.componentElement.querySelector(".icon.close");
              closeEl.addEventListener(ComponentEventUtil.CLICK, function (e) {
                  _this2.clickHandler(e);
              });
          }
      };

      MessageBox.prototype.clickHandler = function clickHandler(event) {
          event.preventDefault();
          this.close();
          this.dispatchEvent(ComponentEventUtil.CLOSE, this);
      };

      MessageBox.prototype.close = function close() {
          var compoEl = this.componentElement;
          this.destroy();
          compoEl.parentNode.removeChild(compoEl);
          this.dispatchEvent(ComponentEventUtil.CLOSE, this);
      };

      MessageBox.prototype.createDOMContent = function createDOMContent() {
          _Component.prototype.createDOMContent.call(this);
          var tmpCompContentEl = this.createComponentHTML();
          this.addToComponentElement(tmpCompContentEl);
      };

      MessageBox.prototype.createComponentHTML = function createComponentHTML() {
          return SemanticUITmpl.MESSAGEBOX(this.message.icon, this.message.title, this.message.msg, this.message.type, this.message.isCloseable);
      };

      MessageBox.prototype.destroy = function destroy() {
          this.message = null;
      };

      return MessageBox;
  }(view4js.Component);

  //Check Semantic UI Popup Component

  var ToolButton = function (_Component) {
      inherits(ToolButton, _Component);

      function ToolButton() {
          var _id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var _parentViewId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          var _parentContainerId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

          var _createDOMElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

          classCallCheck(this, ToolButton);
          return possibleConstructorReturn(this, _Component.call(this, _id, _parentViewId, _parentContainerId, _createDOMElement));
      }

      ToolButton.prototype.initComponent = function initComponent() {
          _Component.prototype.initComponent.call(this);
      };

      ToolButton.prototype.init = function init() {
          var _icon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

          var _label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

          var _properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

          var _tooltiplbl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "tooltip";

          var _pos = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "bottom center";

          var _isInverted = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

          var _formId = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "defaultform";

          this.icon = _icon;
          this.label = _label;
          this.tooltips = {};
          this.tooltips.label = _tooltiplbl;
          this.tooltips.position = _pos;
          this.tooltips.isInverted = _isInverted;
          this.properties = _properties;
          this.formId = _formId;
          _Component.prototype.init.call(this);
      };

      ToolButton.prototype.createDOMContent = function createDOMContent() {
          _Component.prototype.createDOMContent.call(this);
          var tmpCompContentEl = this.createComponentHTML();
          this.addToComponentElement(tmpCompContentEl);
      };

      ToolButton.prototype.createComponentHTML = function createComponentHTML() {
          var csspropstr = SemanticUITmpl.CSSPROPARRAYSTR(this.properties);
          return SemanticUITmpl.TOOLBUTTON(this.label, this.icon, csspropstr, this.tooltips.label, this.tooltips.position, this.tooltips.isInverted);
      };

      return ToolButton;
  }(view4js.Component);

  /**
   * DataProvider :
   * Array of Objects 
   * let dropdownDp = [
   *      {label:"Item1",value:1},
   *      {label:"Item2",value:2}
   * ]
   */

  var RadioButtonGroup = function (_Component) {
      inherits(RadioButtonGroup, _Component);

      function RadioButtonGroup() {
          var _id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var _parentViewId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          var _parentContainerId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

          var _createDOMElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

          classCallCheck(this, RadioButtonGroup);
          return possibleConstructorReturn(this, _Component.call(this, _id, _parentViewId, _parentContainerId, _createDOMElement));
      }

      RadioButtonGroup.prototype.init = function init() {
          var _dataProvider = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var _grpName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "RadioBtnGrp";

          var _titleText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Select any item";

          var _formId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "defaultform";

          this.dataProvider = _dataProvider;
          this.formId = _formId;
          this.grpName = _grpName;
          this.selectedItem = null;
          this.selectedIndex = 0;
          this.titleText = _titleText;
          _Component.prototype.init.call(this);
      };

      RadioButtonGroup.prototype.initComponent = function initComponent() {
          _Component.prototype.initComponent.call(this);
      };

      RadioButtonGroup.prototype.createDOMContent = function createDOMContent() {
          _Component.prototype.createDOMContent.call(this);
          var tmpCompContentEl = this.createComponentHTML();
          this.addToComponentElement(tmpCompContentEl);
          this.changeSelectedItem(this.selectedIndex);
      };

      RadioButtonGroup.prototype.addEventHandler = function addEventHandler() {
          var _this2 = this;

          _Component.prototype.addEventHandler.call(this);
          if (this.componentElement != null) {
              var rdItemList = this.componentElement.querySelectorAll(".ui.radio");
              for (var i = 0; i < rdItemList.length; i++) {
                  rdItemList[i].addEventListener("click", function (e) {
                      _this2.handleRadioClick(e);
                  });
              }
          }
      };

      RadioButtonGroup.prototype.handleRadioClick = function handleRadioClick(event) {
          event.preventDefault();
          var el = event.currentTarget;

          if (this.dataProvider[el.dataset.index].value == el.dataset.value) {
              this.changeSelectedItem(el.dataset.index);
          }
      };

      RadioButtonGroup.prototype.changeSelectedItem = function changeSelectedItem() {
          var _index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

          if (_index != -1) {
              //Change SelectedItem & Index Property
              this.selectedIndex = _index;
              this.selectedItem = this.dataProvider[_index];

              //Remove Old Selected RadioButton
              var oldRdElzlist = this.componentElement.querySelectorAll(".checked");
              for (var i = 0; i < oldRdElzlist.length; i++) {
                  oldRdElzlist[i].classList.remove("checked");
              }

              //let tmpOldRdInput = oldRdEl.querySelector("input");
              //tmpOldRdInput.checked = false;
              //tmpOldRdInput.removeAttribute("checked","");


              //Add Selected Item in ItemList of Dropdown Menu
              var newRdEl = this.componentElement.querySelector('[data-index="' + _index + '"]');
              newRdEl.classList.add('checked');
              var tmpNewRdInput = newRdEl.querySelector("input");
              tmpNewRdInput.checked = true;
              //tmpNewRdInput.setAttribute("checked","checked");

              // Dispatch Change Event 
              this.dispatchEvent(view4js.EventUtils.CHANGE, this);
          }
      };

      RadioButtonGroup.prototype.setComponentEnabled = function setComponentEnabled() {
          _Component.prototype.setComponentEnabled.call(this);
          //TODO   
      };

      RadioButtonGroup.prototype.setComponentReadOnly = function setComponentReadOnly() {
          _Component.prototype.setComponentReadOnly.call(this);
      };

      RadioButtonGroup.prototype.createComponentHTML = function createComponentHTML() {
          return SemanticUITmpl.RADIO_BUTTON_GROUP(this.dataProvider, this.grpName, this.titleText);
      };

      return RadioButtonGroup;
  }(view4js.Component);

  var SemanticUIFormView = function (_View) {
          inherits(SemanticUIFormView, _View);

          function SemanticUIFormView(_id, _route, _navevent, _navparams, _parentViewStackId) {
                  classCallCheck(this, SemanticUIFormView);
                  return possibleConstructorReturn(this, _View.call(this, _id, _route, _navevent, _navparams, _parentViewStackId));
          }

          SemanticUIFormView.prototype.initView = function initView() {
                  _View.prototype.initView.call(this);
                  this.back_lnk_id = "back";
                  this.submit_lnk_id = "submit";
          };

          //Overrides by SubClass
          // call by attachView


          SemanticUIFormView.prototype.bindView = function bindView() {
                  _View.prototype.bindView.call(this);
          };

          /*
          Add HTML Element Event Handlers 
          call by attachView
          */


          SemanticUIFormView.prototype.addViewHandler = function addViewHandler() {
                  _View.prototype.addViewHandler.call(this);
          };

          SemanticUIFormView.prototype.handleSubmit = function handleSubmit(event) {
                  console.log("View1 Submit Clicked");
                  event.preventDefault();
                  var navEvent = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, "View2_Nav_Event", "testusers", this.route);
                  view4js.EventBroadCaster.navEventChannel.dispatchEvent(navEvent);
          };

          // call by attachView


          SemanticUIFormView.prototype.createViewContent = function createViewContent() {
                  var _this2 = this;

                  var tmpViewContentEl = this.createViewHTML();
                  this.addToViewElement(tmpViewContentEl);

                  var checkBoxPanelEl = view4js.ElementUtils.container("checkBoxPanel");
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(checkBoxPanelEl);

                  // CheckBox, Slider Preview
                  var chkBoxSlider = new Checkbox("usrSlider", this.id, "checkBoxPanel", true);
                  chkBoxSlider.init(true, "Slider", "slider");
                  chkBoxSlider.attach();
                  chkBoxSlider.readOnly = false;

                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(checkBoxPanelEl);

                  var chkBox = new Checkbox("usrCheckBox", this.id, "checkBoxPanel", true);
                  chkBox.init(true, "CheckBox", "");
                  chkBox.attach();
                  chkBox.readOnly = false;

                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(checkBoxPanelEl);

                  var chkBoxToggle = new Checkbox("usrToggle", this.id, "checkBoxPanel", true);
                  chkBoxToggle.init(true, "Toggle", "toggle");
                  chkBoxToggle.attach();
                  chkBoxToggle.readOnly = false;

                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(checkBoxPanelEl);

                  // Button, Icon , LabelButton Preview

                  var buttonPanelEl = view4js.ElementUtils.container("buttonPanel");
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(buttonPanelEl);

                  var simpleButton = new Button("usrButton", this.id, "buttonPanel", false);
                  simpleButton.init();
                  simpleButton.attach();
                  simpleButton.enabled = false;
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(buttonPanelEl);

                  var iconLabelButton = new Button("usrIconLabelButton", this.id, "buttonPanel", true);
                  iconLabelButton.init("home", "Home", "red");
                  iconLabelButton.attach();
                  iconLabelButton.enabled = true;
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(buttonPanelEl);

                  var iconCirButton = new Button("usrIconCircularButton", this.id, "buttonPanel", true);
                  iconCirButton.init("settings", "", "violet circular icon");
                  iconCirButton.attach();
                  iconCirButton.enabled = true;
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(buttonPanelEl);

                  var socialCirButton = new Button("usrSocialCirButton", this.id, "buttonPanel", true);
                  socialCirButton.init("facebook", "", "circular facebook icon");
                  socialCirButton.attach();
                  socialCirButton.enabled = true;
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(buttonPanelEl);

                  // Condition Button Preview

                  var conBtnPanelEl = view4js.ElementUtils.container("conditionButtonPanel");
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(conBtnPanelEl);

                  var conditionButton = new ConditionButtons("usrConditionBtn", this.id, "conditionButtonPanel", true);
                  var yesCondBtn = {};
                  yesCondBtn.icon = "";
                  yesCondBtn.label = "Yes";
                  yesCondBtn.properties = "green";

                  var noCondBtn = {};
                  noCondBtn.icon = "";
                  noCondBtn.label = "No";
                  noCondBtn.properties = "red";

                  conditionButton.init(yesCondBtn, noCondBtn);
                  conditionButton.attach();
                  conditionButton.enabled = true;
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(conBtnPanelEl);

                  // ProgressBar Preview
                  var progrsBarPanelEl = view4js.ElementUtils.container("progressbarPanel");
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(progrsBarPanelEl);

                  var progrsBar = new ProgressBar("usrProgrsBar", this.id, "progressbarPanel", true);
                  progrsBar.init("small", "Installing");
                  progrsBar.attach();
                  progrsBar.setProgress(40, "Installing Please wait", 'active');
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(progrsBarPanelEl);

                  // Stepper Preview
                  var stepperPanelEl = view4js.ElementUtils.container("stepperPanel");
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(stepperPanelEl);

                  var numStepper = new Stepper("usrStepper", this.id, "stepperPanel", true);
                  numStepper.init(0, 5, 2, 2);
                  numStepper.attach();
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(stepperPanelEl);

                  // Dopdown Preview
                  var dropdwnPanelEl = view4js.ElementUtils.container("dropdownPanel");
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(dropdwnPanelEl);

                  var dropdwn = new Dropdown("usrDropdwn", this.id, "dropdownPanel", true);
                  var dropdownDp = [{ label: "Item1", value: 1 }, { label: "Item2", value: 2 }];
                  dropdwn.init(dropdownDp, "City", "CityDropDown", "Select City");
                  dropdwn.attach();
                  dropdwn.addEventListener(view4js.EventUtils.CHANGE, function (e) {
                          _this2.handleDropdwnClick(e);
                  });

                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(dropdwnPanelEl);

                  // Stepper Preview
                  var stepPanelEl = view4js.ElementUtils.container("stepPanel");
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(stepPanelEl);

                  var wizardStep = new Step("usrStep", this.id, "stepPanel", true);
                  wizardStep.init();
                  wizardStep.attach();
                  wizardStep.addStep("th", "Step1-Dashboard", "Shows Dashboard Panel");
                  wizardStep.addStep("settings", "Step2-Setting", "Shows Settings Panel");
                  wizardStep.addStep("sticky note outline", "Step3-Report", "Shows Report Panel");
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(stepPanelEl);
                  wizardStep.changeStepStatus(1, "completed");
                  wizardStep.changeStepStatus(2, "active");

                  // MessageBox Preview
                  var msgBoxPanelEl = view4js.ElementUtils.container("msgBoxPanel");
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(msgBoxPanelEl);

                  var simpleMsgBox = new MessageBox("usrMsgBox", this.id, "msgBoxPanel", true);
                  simpleMsgBox.init("inbox", "Inbox", "You have new message", "info", true);
                  simpleMsgBox.attach();
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(msgBoxPanelEl);

                  var loadingMsgBox = new MessageBox("usrLoadingMsgBox", this.id, "msgBoxPanel", true);
                  loadingMsgBox.init("notched circle loading", "Register User", "Please wait verifying Email", "", false);
                  loadingMsgBox.attach();
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(msgBoxPanelEl);

                  var errorMsgBox = new MessageBox("usrErrorMsgBox", this.id, "msgBoxPanel", true);
                  errorMsgBox.init("exclamation circle", "Failed Register User", "Invalid Email", "negative", true);
                  errorMsgBox.attach();
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(msgBoxPanelEl);

                  // ToolButton Preview
                  var toolbarPanelEl = view4js.ElementUtils.container("toolBarPanel");
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(toolbarPanelEl);

                  var toolBtn = new ToolButton("usrToolButton", this.id, "toolBarPanel", true);
                  toolBtn.init("user", "Account", "primary", "User Account Details", "bottom center", true);
                  toolBtn.attach();
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(toolbarPanelEl);

                  // RadioButton Group Preview
                  var rdGrpPanelEl = view4js.ElementUtils.container("radioButtonPanel");
                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(rdGrpPanelEl);

                  /*let rdGrp = new RadioButtonGroup("usrRadioGrp",this.id,"radioButtonPanel",true);
                  let radioGrpDp = [
                      {label:"Once a week",value:1},
                      {label:"2-3 times a week",value:2},
                      {label:"Once a day",value:3},
                      {label:"Twice a day",value:4}
                  ];
                  rdGrp.init(radioGrpDp,"example2","How Often you eat Apple");
                  rdGrp.attach();*/
                  //rdGrp.changeSelectedItem(2);

                  SemanticUILayoutUtil.ADD_HIDDEN_DIVIDER(rdGrpPanelEl);
          };

          SemanticUIFormView.prototype.handleDropdwnClick = function handleDropdwnClick(event) {
                  event.preventDefault();
                  var tmpDropdown = event.target;
                  console.log(" Dropdown Selected Index" + tmpDropdown.selectedIndex);
          };

          SemanticUIFormView.prototype.createViewHTML = function createViewHTML() {
                  return '\n        <div class="ui segment content">\n        <div class="ui hidden divider"></div>\n            <div class="vjs-container buttonPanel" data-layout="form">\n                <h2 class="ui dividing header">\n                        Buttons\n                </h2>\n                <div class="vjs-component usrButton" style="display: block;">\n                    <button class="ui primary button">Primary Button\n                    </button>\n                </div>\n            </div> <!-- End Of  Button Panel -->\n            <div class="vjs-container checkBoxPanel" data-layout="form">\n                <h2 class="ui dividing header">\n                    CheckBox\n                </h2>\n            </div> <!-- End Of  CheckBox Panel -->\n            <div class="vjs-container conditionButtonPanel" data-layout="form">\n                <h2 class="ui dividing header">\n                ConditionButton\n                </h2>\n            </div> <!-- End Of  ConditionButton Panel -->\n            <div class="vjs-container radioButtonPanel" data-layout="form">\n                <h2 class="ui dividing header">\n                Radio Button Group\n                </h2>\n\n\n            </div> <!-- End Of  Radio Button Panel -->\n            <div class="vjs-container dropdownPanel" data-layout="form">\n                <h2 class="ui dividing header">\n                Dropdown\n                </h2>\n            </div> <!-- End Of  Dropdown Panel -->\n            <div class="vjs-container progressbarPanel" data-layout="form">\n                <h2 class="ui dividing header">\n                Progressbar\n                </h2>\n            </div> <!-- End Of  Progressbar Panel -->\n            <div class="vjs-container stepperPanel" data-layout="form">\n                <h2 class="ui dividing header">\n                Stepper\n                </h2>\n            </div> <!-- End Of  Stepper Panel -->\n            <div class="vjs-container stepPanel" data-layout="form">\n                <h2 class="ui dividing header">\n                Steps\n                </h2>\n            </div> <!-- End Of  Steps Panel -->\n            <div class="vjs-container msgBoxPanel" data-layout="form">\n                <h2 class="ui dividing header">\n                Message Box\n                </h2>\n            </div> <!-- End Of  MessageBoxPanel Panel -->\n            <div class="vjs-container toolBarPanel" data-layout="form">\n                <h2 class="ui dividing header">\n                ToolBar\n                </h2>\n            </div> <!-- End Of  ToolBar Panel -->\n            \n            <div class="vjs-container ratingPanel" data-layout="form">\n                <h2 class="ui dividing header">\n                Rating\n                </h2>\n            </div> <!-- End Of  Rating Panel -->\n            <div class="vjs-container dateTimePanel" data-layout="form">\n                <h2 class="ui dividing header">\n                DateTime\n                </h2>\n            </div> <!-- End Of  DateTime Panel -->\n\n        </div>\n        ';
          };

          SemanticUIFormView.prototype.removeViewHandler = function removeViewHandler() {
                  _View.prototype.removeViewHandler.call(this);
          };

          return SemanticUIFormView;
  }(view4js.View);

  var SideBarHeadContNavigator = function (_ViewNavigator) {
      inherits(SideBarHeadContNavigator, _ViewNavigator);

      function SideBarHeadContNavigator(_id, _parentId) {
          classCallCheck(this, SideBarHeadContNavigator);
          return possibleConstructorReturn(this, _ViewNavigator.call(this, _id, _parentId));
      }

      //Overrides by SubClass


      SideBarHeadContNavigator.prototype.initNavigator = function initNavigator() {
          this.history = false;
          this.initEventRoutes();
      };

      //Overrides by SubClass
      //_id, _route, _navparams, _parentViewStackId


      SideBarHeadContNavigator.prototype.createView = function createView(_viewId, _route, _navevent, _navparams, _viewStackId) {
          var tmpView = null;
          switch (_viewId) {
              case "p9view1":
                  tmpView = new ViewNestedNavigator(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;
              case "p9view2":
                  tmpView = new SemanticUIFormView(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;
              case "p9view3":
                  tmpView = new View4Binding(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;

              case "p9view4":
                  tmpView = new ViewNestedNavigator(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;
              default:
                  tmpView = new View(_viewId, _route, _navevent, _navparams, _viewStackId);
                  break;

          }
          return tmpView;
      };

      //Overrides by SubClass
      //_id, _route, _parentId
      //createViewStack(_viewStackId, _route, _parentId) {
      //     super.createViewStack();
      // }

      SideBarHeadContNavigator.prototype.renderNavigatorContent = function renderNavigatorContent() {
          var _this2 = this;

          _ViewNavigator.prototype.renderNavigatorContent.call(this);
          var tmpmnudata = this.getmenudata();
          var tmpsecdata = this.getMenuSectionData();
          var tabmenuel = SemanticUITmpl.SIDENAV_SECTION_VERTICAL_MENU_HTML(tmpmnudata, tmpsecdata);
          var tmpNavigatorEl = view4js.ElementUtils.viewNavigator(this.id);
          tmpNavigatorEl.insertAdjacentHTML('beforeend', tabmenuel);

          var menuItemList = tmpNavigatorEl.querySelectorAll("a.item");

          for (var i = 0; i < menuItemList.length; i++) {
              var tmpmenuItem = menuItemList[i];
              menuItemList[i].addEventListener("click", function (e) {
                  _this2.handleMenuClick(e);
              });
          }
          menuItemList[0].classList.add('active');
      };

      SideBarHeadContNavigator.prototype.createViewStack = function createViewStack(_viewStackId, _route, _parentId) {
          return new SideBarViewStack(_viewStackId, _route, _parentId);
      };

      /*createMenuViewStack(_viewStackId, _route, _parentId) {
          let tmpViewStack = this.createViewStack(_viewStackId, _route, _parentId);
          tmpViewStack.render();
          this.viewstacks[_viewStackId] = tmpViewStack;
      }*/

      SideBarHeadContNavigator.prototype.handleMenuClick = function handleMenuClick(event) {
          event.preventDefault();
          var el = event.currentTarget;
          var tmpnavevent = el.dataset.navevent;
          var tmpmnudata = this.getmenudata();
          var tmpPath = null;
          for (var j = 0; j < tmpmnudata.length; j++) {
              if (tmpmnudata[j].navEvent == tmpnavevent) tmpPath = tmpmnudata[j].path;
          }

          var navEvent = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, tmpnavevent, "testusers", tmpPath);
          view4js.EventBroadCaster.navEventChannel.dispatchEvent(navEvent);
      };

      SideBarHeadContNavigator.prototype.setActiveMenuElement = function setActiveMenuElement(_navEvent) {
          var tmpNavigatorEl = view4js.ElementUtils.viewNavigator(this.id);
          var tmpMenuEl = tmpNavigatorEl.querySelector('[data-navevent=' + _navEvent + ']');
          tmpMenuEl.classList.add('active');
      };

      SideBarHeadContNavigator.prototype.removeActiveMenuElement = function removeActiveMenuElement() {
          var tmpNavigatorEl = view4js.ElementUtils.viewNavigator(this.id);
          var menuItemList = tmpNavigatorEl.querySelectorAll(".item");

          for (var i = 0; i < menuItemList.length; i++) {
              menuItemList[i].classList.remove('active');
          }
      };

      SideBarHeadContNavigator.prototype.getMenuSectionData = function getMenuSectionData() {
          var navbarSecMenuArray = ["Semantic UI", "Binding"];
          return navbarSecMenuArray;
      };

      SideBarHeadContNavigator.prototype.getmenudata = function getmenudata() {
          var navbarMenuArray = [{ navEvent: "View1_Nav_Event", icon: "home", label: "Nested Navigator", section: "Semantic UI", path: "/path9" }, { navEvent: "View2_Nav_Event", icon: "th large", label: "Components", section: "Semantic UI", path: "/path9" }, { navEvent: "View3_Nav_Event", icon: "tags", label: "Standard HTML Element", section: "Binding", path: "/path9" }];
          return navbarMenuArray;
      };

      SideBarHeadContNavigator.prototype.initEventRoutes = function initEventRoutes() {
          var tmpEvntRoutes = [{ navEvent: "View1_Nav_Event", viewstackId: "ViewStack9", viewId: "p9view1", path: "/path9" }, { navEvent: "View2_Nav_Event", viewstackId: "ViewStack9", viewId: "p9view2", path: "/path9" }, { navEvent: "View3_Nav_Event", viewstackId: "ViewStack9", viewId: "p9view3", path: "/path9" }];
          this.eventRouter = new view4js.EventRouter(tmpEvntRoutes);
      };

      return SideBarHeadContNavigator;
  }(view4js.ViewNavigator);

  var AppViewManager = function (_ViewManager) {
      inherits(AppViewManager, _ViewManager);

      function AppViewManager() {
          classCallCheck(this, AppViewManager);
          return possibleConstructorReturn(this, _ViewManager.apply(this, arguments));
      }

      AppViewManager.prototype.initialize = function initialize() {
          _ViewManager.prototype.initialize.call(this);
          this.initRoutes();
      };

      AppViewManager.prototype.createNavigator = function createNavigator(_navigatorId, _parentId) {
          var tmpNavigator = null;
          switch (_navigatorId) {
              case "Navigator1":
                  tmpNavigator = new SimpleNavigator(_navigatorId, _parentId);
                  break;
              case "Navigator3":
                  tmpNavigator = new SideBarNavigator(_navigatorId, _parentId);
                  break;

              case "Navigator4":
                  tmpNavigator = new TopBarNavigator(_navigatorId, _parentId);
                  break;

              case "Navigator5":
                  tmpNavigator = new SideBarHeadContNavigator(_navigatorId, _parentId);
                  break;
              case "Navigator6":
                  tmpNavigator = new TopBarNavigator(_navigatorId, _parentId);
                  break;

              default:
                  tmpNavigator = new view4js.ViewNavigator(_navigatorId, _parentId);

          }
          return tmpNavigator;
      };

      AppViewManager.prototype.initRoutes = function initRoutes() {
          var tmpRoutes = [{ path: "/path1", navigatorId: "Navigator1", parentId: "root" }, { path: "/path7", navigatorId: "Navigator3", parentId: "root" }, { path: "/path8", navigatorId: "Navigator4", parentId: "p9view1" }, { path: "/path9", navigatorId: "Navigator5", parentId: "root" }];
          this.routes = new view4js.Router(tmpRoutes);
      };

      return AppViewManager;
  }(view4js.ViewManager);

  var Application = function () {
          function Application() {
                  classCallCheck(this, Application);

                  this.initialize();
          }

          Application.prototype.initialize = function initialize() {
                  this.viewmanager = new AppViewManager();
          };

          Application.prototype.start = function start() {
                  var navEvent1 = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, "View1_Nav_Event", "testusers", "/path1");
                  var navEvent2 = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, "View1_Nav_Event", "testusers", "/path2");
                  var navEvent3 = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, "View1_Nav_Event", "testusers", "/path3");
                  var navEvent4 = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, "View1_Nav_Event", "testusers", "/path4");
                  var navEvent5 = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, "View1_Nav_Event", "testusers", "/path5");
                  var navEvent6 = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, "View1_Nav_Event", "testusers", "/path6");

                  var navEvent7 = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, "View1_Nav_Event", "testusers", "/path7");

                  var navEvent8 = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, "View1_Nav_Event", "testusers", "/path8");

                  var navEvent9 = new view4js.NavigationEvent(view4js.EventUtils.NAV_CHANGE_EVENT, "View1_Nav_Event", "testusers", "/path9");

                  // Simple Navigator
                  //EventBroadCaster.navEventChannel.dispatchEvent(navEvent1);

                  //EventBroadCaster.navEventChannel.dispatchEvent(navEvent3);
                  //EventBroadCaster.navEventChannel.dispatchEvent(navEvent4);
                  //EventBroadCaster.navEventChannel.dispatchEvent(navEvent5);
                  //EventBroadCaster.navEventChannel.dispatchEvent(navEvent6);
                  //EventBroadCaster.navEventChannel.dispatchEvent(navEvent2);

                  // Simple Navigator
                  //EventBroadCaster.navEventChannel.dispatchEvent(navEvent1);

                  //Tab Navigator Events
                  /*
                  EventBroadCaster.navEventChannel.dispatchEvent(navEvent3);
                  EventBroadCaster.navEventChannel.dispatchEvent(navEvent4);
                  EventBroadCaster.navEventChannel.dispatchEvent(navEvent5);
                  EventBroadCaster.navEventChannel.dispatchEvent(navEvent6);
                  EventBroadCaster.navEventChannel.dispatchEvent(navEvent2);
                  */

                  // Side Bar Not working well 
                  //EventBroadCaster.navEventChannel.dispatchEvent(navEvent7);

                  //Navigation Bar TOP 
                  //EventBroadCaster.navEventChannel.dispatchEvent(navEvent8);

                  //Navigation SideContent Bar
                  view4js.EventBroadCaster.navEventChannel.dispatchEvent(navEvent9);
          };

          return Application;
  }();

  var startApp = function startApp() {
      var myapp = new Application();
      myapp.start();
  };

  startApp();

})));
