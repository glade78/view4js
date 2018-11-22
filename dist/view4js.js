(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.view4js = {})));
}(this, (function (exports) { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

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

  /**
   * @license Event
   * Visit http://createjs.com/ for documentation, updates and examples.
   *
   * Copyright (c) 2017 gskinner.com, inc.
   *
   * Permission is hereby granted, free of charge, to any person
   * obtaining a copy of this software and associated documentation
   * files (the "Software"), to deal in the Software without
   * restriction, including without limitation the rights to use,
   * copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the
   * Software is furnished to do so, subject to the following
   * conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
   * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
   * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
   * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
   * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
   * OTHER DEALINGS IN THE SOFTWARE.
   */

  /**
   * Contains properties and methods shared by all events for use with {@link core.EventDispatcher}.
   * Note that Event objects are often reused, so you should never
   * rely on an event object's state outside of the call stack it was received in.
   *
   * @memberof core
   * @example
   * const evt = new Event("myEvent");
   * const dispatcher = new EventDispatcher();
   * dispatcher.on("myEvent", event => console.log(event.type));
   * dispatcher.dispatchEvent(evt); // logs "myEvent"
   *
   * @param {string} type The event type.
   * @param {boolean} [bubbles=false] Indicates whether the event will bubble through the display list.
   * @param {boolean} [cancelable=false] Indicates whether the default behaviour of this event can be cancelled.
   */
  var Event = function () {
    function Event(type) {
      var bubbles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var cancelable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      classCallCheck(this, Event);

      /**
       * The type of event.
       * @type string
       */
      this.type = type;

      /**
       * The object that generated an event.
       *
       * @type Object
       * @default null
       * @readonly
       */
      this.target = null;

      /**
       * The current target that a bubbling event is being dispatched from. For non-bubbling events, this will
       * always be the same as target. For example, if childObj.parent = parentObj, and a bubbling event
       * is generated from childObj, then a listener on parentObj would receive the event with
       * target=childObj (the original target) and currentTarget=parentObj (where the listener was added).
       *
       * @type Object
       * @default null
       * @readonly
       */
      this.currentTarget = null;

      /**
       * For bubbling events, this indicates the current event phase:
       * <OL>
       * 	<LI> capture phase: starting from the top parent to the target</LI>
       * 	<LI> at target phase: currently being dispatched from the target</LI>
       * 	<LI> bubbling phase: from the target to the top parent</LI>
       * </OL>
       *
       * @type number
       * @default 0
       * @readonly
       */
      this.eventPhase = 0;

      /**
       * Indicates whether the event will bubble through the display list.
       *
       * @type boolean
       * @readonly
       */
      this.bubbles = bubbles;

      /**
       * Indicates whether the default behaviour of this event can be cancelled via {@link core.Event#preventDefault}.
       *
       * @type boolean
       * @readonly
       */
      this.cancelable = cancelable;

      /**
       * The epoch time at which this event was created.
       *
       * @type number
       * @readonly
       */
      this.timeStamp = new Date().getTime();

      /**
       * Indicates if {@link core.Event#preventDefault} has been called on this event.
       *
       * @type boolean
       * @default false
       * @readonly
       */
      this.defaultPrevented = false;

      /**
       * Indicates if {@link core.Event#stopPropagation} or {@link core.Event#stopImmediatePropagation} has been called on this event.
       *
       * @type boolean
       * @default false
       * @readonly
       */
      this.propagationStopped = false;

      /**
       * Indicates if {@link core.Event#stopImmediatePropagation} has been called on this event.
       *
       * @type boolean
       * @default false
       * @readonly
       */
      this.immediatePropagationStopped = false;

      /**
       * Indicates if {@link core.Event#remove} has been called on this event.
       *
       * @type boolean
       * @default false
       * @readonly
       */
      this.removed = false;
    }

    /**
     * Sets {@link core.Event#defaultPrevented} to true if the event is cancelable.
     * Mirrors the DOM level 2 event standard. In general, cancelable events that have `preventDefault()` called will
     * cancel the default behaviour associated with the event.
     * @return {core.Event} this, chainable
     */


    createClass(Event, [{
      key: "preventDefault",
      value: function preventDefault() {
        this.defaultPrevented = this.cancelable;
        return this;
      }

      /**
       * Sets {@link core.Event#propagationStopped} to true.
       * Mirrors the DOM event standard.
       * @return {core.Event} this, chainable
       */

    }, {
      key: "stopPropagation",
      value: function stopPropagation() {
        this.propagationStopped = true;
        return this;
      }

      /**
       * Sets {@link core.Event#propagationStopped} and {@link core.Event#immediatePropagationStopped} to true.
       * Mirrors the DOM event standard.
       * @return {core.Event} this, chainable
       */

    }, {
      key: "stopImmediatePropagation",
      value: function stopImmediatePropagation() {
        this.immediatePropagationStopped = this.propagationStopped = true;
        return this;
      }

      /**
       * Causes the active listener to be removed via removeEventListener();
       *
       * @example
       * myBtn.addEventListener("click", event => {
       *   event.remove(); // removes this listener.
       * });
       *
       * @return {core.Event} this, chainable
       */

    }, {
      key: "remove",
      value: function remove() {
        this.removed = true;
        return this;
      }

      /**
       * Returns a clone of the Event instance.
       *
       * @return {core.Event} a clone of the Event instance.
       */

    }, {
      key: "clone",
      value: function clone() {
        var event = new Event(this.type, this.bubbles, this.cancelable);
        for (var n in this) {
          if (this.hasOwnProperty(n)) {
            event[n] = this[n];
          }
        }
        return event;
      }

      /**
       * Provides a return {core.Event} this, chainable shortcut method for setting a number of properties on the instance.
       *
       * @param {Object} props A generic object containing properties to copy to the instance.
       * @return {core.Event} this, chainable
       */

    }, {
      key: "set",
      value: function set$$1(props) {
        for (var n in props) {
          this[n] = props[n];
        }
        return this;
      }

      /**
       * Returns a string representation of this object.
       *
       * @return {string} A string representation of the instance.
       */

    }, {
      key: "toString",
      value: function toString() {
        return "[" + this.constructor.name + " (type=" + this.type + ")]";
      }
    }]);
    return Event;
  }();

  /**
   * @license EventDispatcher
   * Visit http://createjs.com/ for documentation, updates and examples.
   *
   * Copyright (c) 2017 gskinner.com, inc.
   *
   * Permission is hereby granted, free of charge, to any person
   * obtaining a copy of this software and associated documentation
   * files (the "Software"), to deal in the Software without
   * restriction, including without limitation the rights to use,
   * copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the
   * Software is furnished to do so, subject to the following
   * conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
   * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
   * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
   * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
   * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
   * OTHER DEALINGS IN THE SOFTWARE.
   */

  /**
   * EventDispatcher provides methods for managing queues of event listeners and dispatching events.
   *
   * You can either extend EventDispatcher or mix its methods into an existing prototype or instance by using the
   * EventDispatcher {@link core.EventDispatcher.initialize} method.
   *
   * Together with the CreateJS Event class, EventDispatcher provides an extended event model that is based on the
   * DOM Level 2 event model, including addEventListener, removeEventListener, and dispatchEvent. It supports
   * bubbling / capture, preventDefault, stopPropagation, stopImmediatePropagation, and handleEvent.
   *
   * EventDispatcher also exposes a {@link core.EventDispatcher#on} method, which makes it easier
   * to create scoped listeners, listeners that only run once, and listeners with associated arbitrary data. The
   * {@link core.EventDispatcher#off} method is merely an alias to {@link core.EventDispatcher#removeEventListener}.
   *
   * Another addition to the DOM Level 2 model is the {@link core.EventDispatcher#removeAllEventListeners}
   * method, which can be used to listeners for all events, or listeners for a specific event. The Event object also
   * includes a {@link core.Event#remove} method which removes the active listener.
   *
   * @memberof core
   * @example
   * // add EventDispatcher capabilities to the "MyClass" class.
   * EventDispatcher.initialize(MyClass.prototype);
   *
   * // Add an event.
   * instance.addEventListener("eventName", event => console.log(event.target + " was clicked."));
   *
   * // scope ("this") can be be a challenge with events.
   * // using the {@link core.EventDispatcher#on} method to subscribe to events simplifies this.
   * instance.addEventListener("click", event => console.log(instance === this)); // false, scope is ambiguous.
   * instance.on("click", event => console.log(instance === this)); // true, `on` uses dispatcher scope by default.
   */

  var EventDispatcher = function () {
  	createClass(EventDispatcher, null, [{
  		key: "initialize",


  		/**
     * Static initializer to mix EventDispatcher methods into a target object or prototype.
     *
     * @static
     * @example
     * EventDispatcher.initialize(MyClass.prototype); // add to the prototype of the class
     * EventDispatcher.initialize(myInstance); // add to a specific instance
     *
     * @param {Object} target The target object to inject EventDispatcher methods into.
     */
  		value: function initialize(target) {
  			var p = EventDispatcher.prototype;
  			target.addEventListener = p.addEventListener;
  			target.on = p.on;
  			target.removeEventListener = target.off = p.removeEventListener;
  			target.removeAllEventListeners = p.removeAllEventListeners;
  			target.hasEventListener = p.hasEventListener;
  			target.dispatchEvent = p.dispatchEvent;
  			target._dispatchEvent = p._dispatchEvent;
  			target.willTrigger = p.willTrigger;
  		}
  	}]);

  	function EventDispatcher() {
  		classCallCheck(this, EventDispatcher);

  		/**
     * @private
     * @default null
     * @type Object
     */
  		this._listeners = null;

  		/**
     * @private
     * @default null
     * @type Object
     */
  		this._captureListeners = null;
  	}

  	/**
    * Adds the specified event listener. Note that adding multiple listeners to the same function will result in
    * multiple callbacks getting fired.
    *
    * @example
    * displayObject.addEventListener("click", event => console.log('clicked', event));
    *
    * @param {string} type The string type of the event.
    * @param {Function|Object} listener An object with a handleEvent method, or a function that will be called when the event is dispatched.
    * @param {boolean} [useCapture=false] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
    * @return {Function|Object} Returns the listener for chaining or assignment.
    */


  	createClass(EventDispatcher, [{
  		key: "addEventListener",
  		value: function addEventListener(type, listener) {
  			var useCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  			var listeners = void 0;
  			if (useCapture) {
  				listeners = this._captureListeners = this._captureListeners || {};
  			} else {
  				listeners = this._listeners = this._listeners || {};
  			}
  			var arr = listeners[type];
  			if (arr) {
  				this.removeEventListener(type, listener, useCapture);
  				arr = listeners[type]; // remove may have deleted the array
  			}
  			if (arr) {
  				arr.push(listener);
  			} else {
  				listeners[type] = [listener];
  			}
  			return listener;
  		}

  		/**
     * A shortcut method for using addEventListener that makes it easier to specify an execution scope, have a listener
     * only run once, associate arbitrary data with the listener, and remove the listener.
     *
     * This method works by creating an anonymous wrapper function and subscribing it with `addEventListener`.
     * The wrapper function is returned for use with `removeEventListener` (or `off`).
     *
     * To remove a listener added with `on`, you must pass in the returned wrapper function as the listener, or use
     * {@link core.Event#remove}. Likewise, each time you call `on` a NEW wrapper function is subscribed, so multiple calls
     * to `on` with the same params will create multiple listeners.
     *
     * @example
     * const listener = myBtn.on("click", handleClick, null, false, { count: 3 });
     * function handleClick (evt, data) {
     *   data.count -= 1;
     *   console.log(this == myBtn); // true - scope defaults to the dispatcher
     *   if (data.count == 0) {
     *     alert("clicked 3 times!");
     *     myBtn.off("click", listener);
     *     // alternately: evt.remove();
     *   }
     * }
     *
     * @param {string} type The string type of the event.
     * @param {Function|Object} listener An object with a handleEvent method, or a function that will be called when the event is dispatched.
     * @param {Object} [scope=null] The scope to execute the listener in. Defaults to the dispatcher/currentTarget for function listeners, and to the listener itself for object listeners (ie. using handleEvent).
     * @param {boolean} [once=false] If true, the listener will remove itself after the first time it is triggered.
     * @param {*} [data={}] Arbitrary data that will be included as the second parameter when the listener is called.
     * @param {boolean} [useCapture=false] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
     * @return {Function} Returns the anonymous function that was created and assigned as the listener. This is needed to remove the listener later using .removeEventListener.
     */

  	}, {
  		key: "on",
  		value: function on(type, listener) {
  			var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  			var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  			var data = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  			var useCapture = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

  			if (listener.handleEvent) {
  				scope = scope || listener;
  				listener = listener.handleEvent;
  			}
  			scope = scope || this;
  			return this.addEventListener(type, function (evt) {
  				listener.call(scope, evt, data);
  				once && evt.remove();
  			}, useCapture);
  		}

  		/**
     * Removes the specified event listener.
     *
     * You must pass the exact function reference used when the event was added. If a proxy
     * function, or function closure is used as the callback, the proxy/closure reference must be used - a new proxy or
     * closure will not work.
     *
     * @example
     * displayObject.removeEventListener("click", handleClick);
     *
     * @param {string} type The string type of the event.
     * @param {Function|Object} listener The listener function or object.
     * @param {boolean} [useCapture=false] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
     */

  	}, {
  		key: "removeEventListener",
  		value: function removeEventListener(type, listener) {
  			var useCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  			var listeners = useCapture ? this._captureListeners : this._listeners;
  			if (!listeners) {
  				return;
  			}
  			var arr = listeners[type];
  			if (!arr) {
  				return;
  			}
  			var l = arr.length;
  			for (var i = 0; i < l; i++) {
  				if (arr[i] === listener) {
  					if (l === 1) {
  						delete listeners[type];
  					} // allows for faster checks.
  					else {
  							arr.splice(i, 1);
  						}
  					break;
  				}
  			}
  		}

  		/**
     * A shortcut to the removeEventListener method, with the same parameters and return value. This is a companion to the
     * `on` method.
     *
     * To remove a listener added with `on`, you must pass in the returned wrapper function as the listener. See
     * {@link core.EventDispatcher#on} for an example.
     *
     * @param {string} type The string type of the event.
     * @param {Function|Object} listener The listener function or object.
     * @param {boolean} [useCapture=false] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
     */

  	}, {
  		key: "off",
  		value: function off(type, listener) {
  			var useCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  			this.removeEventListener(type, listener, useCapture);
  		}

  		/**
     * Removes all listeners for the specified type, or all listeners of all types.
     *
     * @example
     * // remove all listeners
     * displayObject.removeAllEventListeners();
     *
     * // remove all click listeners
     * displayObject.removeAllEventListeners("click");
     *
     * @param {string} [type=null] The string type of the event. If omitted, all listeners for all types will be removed.
     */

  	}, {
  		key: "removeAllEventListeners",
  		value: function removeAllEventListeners() {
  			var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  			if (type) {
  				if (this._listeners) {
  					delete this._listeners[type];
  				}
  				if (this._captureListeners) {
  					delete this._captureListeners[type];
  				}
  			} else {
  				this._listeners = this._captureListeners = null;
  			}
  		}

  		/**
     * Dispatches the specified event to all listeners.
     *
     * @example
     * // use a string event
     * this.dispatchEvent("complete")
     *
     * // use an Event instance
     * const event = new createjs.Event("progress");
     * this.dispatchEvent(event);
     *
     * @param {Object|Event|string} eventObj An object with a "type" property, or a string type.
     * While a generic object will work, it is recommended to use a CreateJS Event instance. If a string is used,
     * dispatchEvent will construct an Event instance if necessary with the specified type. This latter approach can
     * be used to avoid event object instantiation for non-bubbling events that may not have any listeners.
     * @param {boolean} [bubbles=false] Specifies the `bubbles` value when a string was passed to eventObj.
     * @param {boolean} [cancelable=false] Specifies the `cancelable` value when a string was passed to eventObj.
     * @return {boolean} Returns false if `preventDefault()` was called on a cancelable event, true otherwise.
     */

  	}, {
  		key: "dispatchEvent",
  		value: function dispatchEvent(eventObj) {
  			var bubbles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  			var cancelable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  			if (typeof eventObj === "string") {
  				// skip everything if there's no listeners and it doesn't bubble:
  				var listeners = this._listeners;
  				if (!bubbles && (!listeners || !listeners[eventObj])) {
  					return true;
  				}
  				eventObj = new Event(eventObj, bubbles, cancelable);
  			} else if (eventObj.target && eventObj.clone) {
  				// redispatching an active event object, so clone it:
  				eventObj = eventObj.clone();
  			}

  			// TODO: it would be nice to eliminate this. Maybe in favour of evtObj instanceof Event? Or !!evtObj.createEvent
  			try {
  				eventObj.target = this;
  			} catch (e) {} // try/catch allows redispatching of native events

  			if (!eventObj.bubbles || !this.parent) {
  				this._dispatchEvent(eventObj, 2);
  			} else {
  				var top = this;
  				var list = [top];
  				while (top.parent) {
  					list.push(top = top.parent);
  				}
  				var l = list.length;
  				var i = void 0;

  				// capture & atTarget
  				for (i = l - 1; i >= 0 && !eventObj.propagationStopped; i--) {
  					list[i]._dispatchEvent(eventObj, 1 + (i == 0));
  				}
  				// bubbling
  				for (i = 1; i < l && !eventObj.propagationStopped; i++) {
  					list[i]._dispatchEvent(eventObj, 3);
  				}
  			}
  			return !eventObj.defaultPrevented;
  		}

  		/**
     * Indicates whether there is at least one listener for the specified event type.
     *
     * @param {string} type The string type of the event.
     * @return {boolean} Returns true if there is at least one listener for the specified event.
     */

  	}, {
  		key: "hasEventListener",
  		value: function hasEventListener(type) {
  			var listeners = this._listeners,
  			    captureListeners = this._captureListeners;
  			return !!(listeners && listeners[type] || captureListeners && captureListeners[type]);
  		}

  		/**
     * Indicates whether there is at least one listener for the specified event type on this object or any of its
     * ancestors (parent, parent's parent, etc). A return value of true indicates that if a bubbling event of the
     * specified type is dispatched from this object, it will trigger at least one listener.
     *
     * This is similar to {@link core.EventDispatcher#hasEventListener}, but it searches the entire
     * event flow for a listener, not just this object.
     *
     * @param {string} type The string type of the event.
     * @return {boolean} Returns `true` if there is at least one listener for the specified event.
     */

  	}, {
  		key: "willTrigger",
  		value: function willTrigger(type) {
  			var o = this;
  			while (o) {
  				if (o.hasEventListener(type)) {
  					return true;
  				}
  				o = o.parent;
  			}
  			return false;
  		}

  		/**
     * @return {String} a string representation of the instance.
     */

  	}, {
  		key: "toString",
  		value: function toString() {
  			return "[" + (this.constructor.name + this.name ? " " + this.name : "") + "]";
  		}

  		/**
     * @private
     * @param {Object|Event|string} eventObj
     * @param {Object} eventPhase
     */

  	}, {
  		key: "_dispatchEvent",
  		value: function _dispatchEvent(eventObj, eventPhase) {
  			var listeners = eventPhase === 1 ? this._captureListeners : this._listeners;
  			if (eventObj && listeners) {
  				var arr = listeners[eventObj.type];
  				var l = void 0;
  				if (!arr || (l = arr.length) === 0) {
  					return;
  				}
  				try {
  					eventObj.currentTarget = this;
  				} catch (e) {}
  				try {
  					eventObj.eventPhase = eventPhase;
  				} catch (e) {}
  				eventObj.removed = false;

  				arr = arr.slice(); // to avoid issues with items being removed or added during the dispatch
  				for (var i = 0; i < l && !eventObj.immediatePropagationStopped; i++) {
  					var o = arr[i];
  					if (o.handleEvent) {
  						o.handleEvent(eventObj);
  					} else {
  						o(eventObj);
  					}
  					if (eventObj.removed) {
  						this.off(eventObj.type, o, eventPhase === 1);
  						eventObj.removed = false;
  					}
  				}
  			}
  		}
  	}]);
  	return EventDispatcher;
  }();

  var EventRouter = function () {
      function EventRouter() {
          var _routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

          classCallCheck(this, EventRouter);

          this.routes = _routes;
      }

      createClass(EventRouter, [{
          key: "addRoute",
          value: function addRoute(_navEvent, _viewstackId, _viewId, _path) {
              var route = {};
              route.navEvent = _navEvent;
              route.viewstackId = _viewstackId;
              route.viewId = _viewId;
              route.path = _path;
              this.routes.push(route);
          }
      }, {
          key: "findRoute",
          value: function findRoute(_navEvent) {
              var tmpRoute = [];
              for (var x = 0; x < this.routes.length; x++) {
                  if (this.routes[x].navEvent == _navEvent) tmpRoute = this.routes[x];
              }
              return tmpRoute;
          }
      }, {
          key: "findViewId",
          value: function findViewId(_navEvent, _path) {
              var tmpViewId = [];
              for (var i = 0; i < this.routes.length; i++) {
                  if (this.routes[i].navEvent == _navEvent && this.routes[i].path == _path) tmpViewId = this.routes[i].viewId;
              }
              return tmpViewId;
          }
      }, {
          key: "findViewStackId",
          value: function findViewStackId(_navEvent, _path) {
              var tmpViewStackId = null;
              for (var j = 0; j < this.routes.length; j++) {
                  if (this.routes[j].navEvent == _navEvent && this.routes[j].path == _path) tmpViewStackId = this.routes[j].viewstackId;
              }
              return tmpViewStackId;
          }
      }, {
          key: "reset",
          value: function reset() {
              this.routes = [];
          }
      }, {
          key: "printRoutes",
          value: function printRoutes() {
              if (this.routes.length > 0) {
                  for (var i = 0; i < this.routes.length; i++) {
                      console.log("navEvent:" + this.routes[i].navEvent + " viewstackId:" + this.routes[i].viewstackId + " viewId:" + this.routes[i].viewId);
                  }
              } else {
                  console.log("No Routes Found");
              }
          }
      }]);
      return EventRouter;
  }();

  var Router = function () {
      function Router() {
          var _routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

          classCallCheck(this, Router);

          this.routes = _routes;
      }

      createClass(Router, [{
          key: "addRoute",
          value: function addRoute(_path, _navigatorId) {
              var route = {};
              route.path = _path;
              route.navigatorId = _navigatorId;
              this.routes.push(route);
          }
      }, {
          key: "findNavigator",
          value: function findNavigator(_route) {
              var tmpNavigatorIds = [];
              for (var i = 0; i < this.routes.length; i++) {
                  if (this.routes[i].path === _route) tmpNavigatorIds.push(this.routes[i].navigatorId);
              }
              return tmpNavigatorIds;
          }
      }, {
          key: "findViewStack",
          value: function findViewStack(_route) {
              var tmpViewStackId = null;
              for (var j = 0; j < this.routes.length; j++) {
                  if (this.routes[j].path == _route) tmpViewStackId = this.routes[j].viewstackId;
              }
              return tmpViewStackId;
          }
      }, {
          key: "reset",
          value: function reset() {
              this.routes = [];
          }
      }, {
          key: "printRoutes",
          value: function printRoutes() {
              if (this.routes.length > 0) {
                  for (var i = 0; i < this.routes.length; i++) {
                      console.log("path:" + this.routes[i].path + " navigatorId:" + this.routes[i].navigatorId);
                  }
              } else {
                  console.log("No Routes Found");
              }
          }
      }]);
      return Router;
  }();

  var EventUtils = function () {
      function EventUtils() {
          classCallCheck(this, EventUtils);
      }

      createClass(EventUtils, null, [{
          key: "FORGOTPWD_NAV_EVENT",
          get: function get$$1() {
              return "Forgotpwd_Nav_Event";
          }
      }, {
          key: "REGISTER_NAV_EVENT",
          get: function get$$1() {
              return "Register_Nav_Event";
          }
      }, {
          key: "BACK_NAV_EVENT",
          get: function get$$1() {
              return "Back_Nav_Event";
          }
      }, {
          key: "NAV_CHANGE_EVENT",
          get: function get$$1() {
              return "navigation_change_event";
          }

          //View,Navigator Specific Events

      }, {
          key: "INITIALIZE_EVENT",
          get: function get$$1() {
              return "initialize_event";
          }
      }, {
          key: "ATTACHED_EVENT",
          get: function get$$1() {
              return "attached_event";
          }
      }, {
          key: "DETACHED_EVENT",
          get: function get$$1() {
              return "detached_event";
          }
      }, {
          key: "ACTIVATE_EVENT",
          get: function get$$1() {
              return "activate_event";
          }
      }, {
          key: "DEACTIVATE_EVENT",
          get: function get$$1() {
              return "deactivate_event";
          }
      }]);
      return EventUtils;
  }();

  var EventChannel = function (_EventDispatcher) {
      inherits(EventChannel, _EventDispatcher);

      function EventChannel(_id) {
          classCallCheck(this, EventChannel);

          var _this = possibleConstructorReturn(this, (EventChannel.__proto__ || Object.getPrototypeOf(EventChannel)).call(this));

          _this.id = _id;
          return _this;
      }

      return EventChannel;
  }(EventDispatcher);

  var EventBroadCaster = function () {
      function EventBroadCaster() {
          classCallCheck(this, EventBroadCaster);

          if (!EventBroadCaster.instance) {
              EventBroadCaster.instance = this;
              this.appEvtChannel = new EventChannel("APPLICATIONEVENT");
              this.navEvtChannel = new EventChannel("NAVIGATIONEVENT");
          }
          return EventBroadCaster.instance;
      }

      createClass(EventBroadCaster, [{
          key: "appEventChannel",
          get: function get$$1() {
              return this.appEvtChannel;
          }
      }, {
          key: "navEventChannel",
          get: function get$$1() {
              return this.navEvtChannel;
          }
      }]);
      return EventBroadCaster;
  }();

  var MessageBus = new EventBroadCaster();
  // prevents new properties from being added to the object
  Object.freeze(MessageBus);

  var NavigationEvent = function (_Event) {
      inherits(NavigationEvent, _Event);

      function NavigationEvent(_type, _eventName, _params, _route, _bubbles, _cancelable) {
          classCallCheck(this, NavigationEvent);

          var _this = possibleConstructorReturn(this, (NavigationEvent.__proto__ || Object.getPrototypeOf(NavigationEvent)).call(this, _type, _bubbles, _cancelable));

          _this.type = _type;
          _this.eventName = _eventName;
          _this.params = _params;
          _this.route = _route;
          return _this;
      }

      createClass(NavigationEvent, [{
          key: "clone",
          value: function clone() {
              return new NavigationEvent(this.type, this.eventName, this.params, this.route, this.bubbles, this.cancelable);
          }
      }]);
      return NavigationEvent;
  }(Event);

  var ElementUtils = function () {
      function ElementUtils() {
          classCallCheck(this, ElementUtils);
      }

      createClass(ElementUtils, null, [{
          key: "view",
          value: function view(_viewId) {
              return document.querySelector(".pjs-view." + _viewId);
          }
      }, {
          key: "viewStack",
          value: function viewStack(_viewStackId) {
              return document.querySelector(".pjs-viewstack." + _viewStackId);
          }
      }, {
          key: "viewNavigator",
          value: function viewNavigator(_viewNavId) {
              return document.querySelector(".pjs-viewnavigator." + _viewNavId);
          }
      }, {
          key: "constructViewBaseElement",
          value: function constructViewBaseElement(_viewId) {
              return "<div class=\"pjs-view " + _viewId + "\"></div>";
          }
      }, {
          key: "constructViewStackBaseElement",
          value: function constructViewStackBaseElement(_viewStackId) {
              return "<div class=\"pjs-viewstack " + _viewStackId + "\"></div>";
          }
      }, {
          key: "constructNavigatorBaseElement",
          value: function constructNavigatorBaseElement(_navigatorId) {
              return "<div class=\"pjs-viewnavigator " + _navigatorId + "\"></div>";
          }
      }, {
          key: "hideElement",
          value: function hideElement(_el) {
              _el.style.display = 'none';
          }
      }, {
          key: "showElement",
          value: function showElement(_el) {
              _el.style.display = 'block';
          }
      }]);
      return ElementUtils;
  }();

  var View = function (_EventDispatcher) {
      inherits(View, _EventDispatcher);

      function View(_id, _route, _navparams, _parentViewStackId) {
          classCallCheck(this, View);

          var _this = possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this));

          _this.id = _id;
          _this.route = _route;
          _this.navparams = _navparams;
          _this.parentViewStackId = _parentViewStackId;
          _this.isAttached = false;
          _this.isActive = false;
          _this.initView();
          return _this;
      }

      createClass(View, [{
          key: 'dispatchNavBackEvent',
          value: function dispatchNavBackEvent(event) {
              event.preventDefault();
              var navEvent = new NavigationEvent(EventUtils.NAV_CHANGE_EVENT, EventUtils.BACK_NAV_EVENT, null, this.route);
              MessageBus.navEventChannel.dispatchEvent(navEvent);
          }

          //Overrides by SubClass

      }, {
          key: 'initView',
          value: function initView() {}

          //Overrides by SubClass

      }, {
          key: 'createViewContent',
          value: function createViewContent() {}

          //Overrides by SubClass

      }, {
          key: 'addViewHandler',
          value: function addViewHandler() {}

          //Overrides by SubClass

      }, {
          key: 'removeViewHandler',
          value: function removeViewHandler() {}

          //Overrides by SubClass

      }, {
          key: 'bindView',
          value: function bindView() {}
      }, {
          key: 'unBindView',
          value: function unBindView() {}

          //Overrides by SubClass

      }, {
          key: 'destroy',
          value: function destroy() {}
          //TODO


          //Testing Purpose

      }, {
          key: 'submitEvent',
          value: function submitEvent(_navEvent) {
              this.submitEvent = _navEvent;
          }

          // Call by ViewStack

      }, {
          key: 'attachView',
          value: function attachView() {
              var _parentEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

              if (!this.isAttached) {
                  var parentEl = _parentEl;
                  if (parentEl == null) parentEl = ElementUtils.viewStack(this.parentViewStackId);
                  parentEl.insertAdjacentHTML('beforeend', ElementUtils.constructViewBaseElement(this.id));
                  this.isAttached = true;
                  var tmpEle = this.getViewElement();
                  ElementUtils.hideElement(tmpEle);
                  //Create View Contents and Internal Components
                  this.createViewContent();
                  //Add Event Handlers for view Internal Components
                  this.addViewHandler();
                  //Bind View Component Properties with Model or other view Components
                  this.bindView();
                  this.dispatchEvent(EventUtils.ATTACHED_EVENT);
              }
          }

          // Call by ViewStack

      }, {
          key: 'activateView',
          value: function activateView() {
              if (!this.isActive) {
                  var tmpViewEl = this.getViewElement();
                  ElementUtils.showElement(tmpViewEl);
                  this.isActive = true;
              }
          }

          // Call by ViewStack

      }, {
          key: 'deActivateView',
          value: function deActivateView() {
              if (this.isActive) {
                  var tmpViewEl = this.getViewElement();
                  ElementUtils.hideElement(tmpViewEl);
                  this.isActive = false;
              }
          }

          // Call by ViewStack

      }, {
          key: 'detachView',
          value: function detachView() {
              if (this.isAttached) {
                  this.unBindView();
                  this.removeViewHandler();
                  //let parentEl = ElementUtils.viewStack(this.parentViewStackId);
                  var tmpViewEle = this.getViewElement();
                  tmpViewEle.parentNode.removeChild(tmpViewEle);
                  this.isAttached = false;
                  this.dispatchEvent(EventUtils.DETACHED_EVENT);
              }
          }

          // Call by ViewStack

      }, {
          key: 'refreshView',
          value: function refreshView() {}
      }, {
          key: 'getViewElement',
          value: function getViewElement() {
              var tmpViewEl = null;
              if (this.isAttached) {
                  tmpViewEl = ElementUtils.view(this.id);
              }

              return tmpViewEl;
          }
      }]);
      return View;
  }(EventDispatcher);

  var ClassError$1 = function (_Error) {
      inherits(ClassError, _Error);

      function ClassError() {
          var _ref;

          var _type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Class';

          classCallCheck(this, ClassError);

          for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              params[_key - 1] = arguments[_key];
          }

          // Maintains proper stack trace for where our error was thrown (only available on V8)
          var _this = possibleConstructorReturn(this, (_ref = ClassError.__proto__ || Object.getPrototypeOf(ClassError)).call.apply(_ref, [this].concat(params)));
          // Pass remaining arguments (including vendor specific ones) to parent constructor


          if (Error.captureStackTrace) {
              Error.captureStackTrace(_this, ClassError);
          }

          // Custom debugging information
          _this.type = _type;
          _this.date = new Date();
          return _this;
      }

      return ClassError;
  }(Error);

  var ViewStack = function (_EventDispatcher) {
      inherits(ViewStack, _EventDispatcher);

      function ViewStack(_id, _route, _parentId) {
          classCallCheck(this, ViewStack);

          var _this = possibleConstructorReturn(this, (ViewStack.__proto__ || Object.getPrototypeOf(ViewStack)).call(this));

          _this.id = _id;
          _this.route = _route;
          _this.parentId = _parentId;
          _this.viewStack = [];
          _this.isRendered = false;
          _this.initViewStack();
          return _this;
      }

      createClass(ViewStack, [{
          key: "initViewStack",
          value: function initViewStack() {}
      }, {
          key: "pushViewElement",
          value: function pushViewElement(_viewId, _views) {

              for (var viewObj in _views) {
                  var tmpview = _views[viewObj];
                  if (tmpview.isActive) {
                      tmpview.deActivateView();
                  }
              }
              this.viewStack.push(_viewId);
          }
      }, {
          key: "popViewElement",
          value: function popViewElement() {
              this.viewStack.pop();
              /*
               Navigator will call view destroy method which will remove 
               - View DOM Element
               - EventListners reference to DOM Element
               - Properties 
               - Finally Object null to make garbage collected
               */
          }
      }, {
          key: "getActiveViewId",
          value: function getActiveViewId() {
              if (this.viewStack.length > 0) return this.viewStack[this.viewStack.length - 1];
          }
      }, {
          key: "getViewStackElement",
          value: function getViewStackElement() {
              var el = null;
              if (this.isRendered) {
                  el = this.getViewStackRootElement();
              }
              return el;
          }

          //Overrides by SubClass

      }, {
          key: "getViewStackRootElement",
          value: function getViewStackRootElement() {
              return ElementUtils.viewStack(this.id);
          }
      }, {
          key: "render",
          value: function render() {
              if (!this.isRendered) {
                  this.renderViewStack();
                  this.renderViewStackContent();
                  this.isRendered = true;
              }
          }
      }, {
          key: "renderViewStack",
          value: function renderViewStack() {
              var tmpParentNavigatorEl = ElementUtils.viewNavigator(this.parentId);
              var tmpViewStackEl = ElementUtils.constructViewStackBaseElement(this.id);
              tmpParentNavigatorEl.insertAdjacentHTML('beforeend', tmpViewStackEl);
          }

          //Overrides by SubClass

      }, {
          key: "renderViewStackContent",
          value: function renderViewStackContent() {}
      }, {
          key: "destroy",
          value: function destroy() {
              this.route = null;
              this.viewStack = [];
              this.isRendered = false;
              var tmpParentNavigatorEl = ElementUtils.viewNavigator(this.parentId);
              var tmpViewStackEl = ElementUtils.viewStack(this.id);
              tmpParentNavigatorEl.removeChild(tmpViewStackEl);
              this.parentId = null;
              this.id = null;
          }
      }]);
      return ViewStack;
  }(EventDispatcher);

  var ViewNavigator = function (_EventDispatcher) {
      inherits(ViewNavigator, _EventDispatcher);

      function ViewNavigator(_id) {
          var _parentId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          classCallCheck(this, ViewNavigator);

          var _this = possibleConstructorReturn(this, (ViewNavigator.__proto__ || Object.getPrototypeOf(ViewNavigator)).call(this));

          _this.id = _id;
          // HTML ID attribute only 
          _this.parentId = _parentId;
          _this.activeViewId = null;
          _this.activeViewStackId = null;
          _this.activeRoute = null;
          _this.views = {};
          _this.viewstacks = {};
          _this.eventroute = new EventRouter();
          _this.isRendered = false;
          _this.history = true;
          _this.initNavigator();
          return _this;
      }

      //Overrides by SubClass


      createClass(ViewNavigator, [{
          key: 'initNavigator',
          value: function initNavigator() {}
      }, {
          key: 'createView',


          //Overrides by SubClass
          value: function createView(_viewId, _route, _navparams, _viewStackId) {
              return new View(_viewId, _route, _navparams, _viewStackId);
          }

          //Overrides by SubClass

      }, {
          key: 'createViewStack',
          value: function createViewStack(_viewStackId, _route, _parentId) {
              return new ViewStack(_viewStackId, _route, _parentId);
          }

          // TODO : Check any current view and viewstack Exist , then hide or destroy it 
          // Then Launch new viewstack and view 

      }, {
          key: 'navigate',
          value: function navigate(_route, _navevent, _navparams) {
              var tmpviewStackId = null;
              if (this.history == false) {
                  this.navigateBack(_route);
              }

              //TODO Find ViewStack and View by using NavEventName 

              // Find or Create ViewStack
              // Route and NavEvent Combination must be unique
              tmpviewStackId = this.eventroute.findViewStackId(_navevent, _route);
              var tmpViewStack = this.getViewStack(tmpviewStackId);
              if (tmpViewStack == null) tmpViewStack = this.createViewStack(tmpviewStackId, _route, this.id);

              // Viewstack have _parentId

              tmpViewStack.render(); // will construct Element and add it to DOM parent
              this.activeViewStackId = tmpviewStackId;
              this.viewstacks[tmpviewStackId] = tmpViewStack;

              //let tmpNewRoute = this.eventroute.findRoute(_navevent);
              var tmpviewId = this.eventroute.findViewId(_navevent, _route);
              var tmpView = this.getView(tmpviewId);
              if (tmpView == null) tmpView = this.createView(tmpviewId, _route, _navparams, tmpviewStackId);
              //tmpView.submitEvent(tmpNewRoute.navEvent); // For Testing Purpose Only;
              var tmpViewStackEl = tmpViewStack.getViewStackElement();
              tmpView.attachView(tmpViewStackEl); // will construct Element and add it to DOM parent
              tmpViewStack.pushViewElement(tmpviewId, this.views);
              tmpView.activateView();
              this.activeViewId = tmpviewId;
              this.views[tmpviewId] = tmpView;
              this.activeRoute = _route;
          }

          /* Navigate Back View */

      }, {
          key: 'navigateBack',
          value: function navigateBack(_route) {
              if (_route == this.activeRoute) {
                  var tmpViewStack = this.getViewStack(this.activeViewStackId);
                  tmpViewStack.popViewElement();
                  var tmpView = this.views[this.activeViewId];
                  tmpView.deActivateView();
                  tmpView.detachView();
                  tmpView.destroy();
                  tmpView = null; // make garbage collected
                  this.views[this.activeViewId] = null;
                  delete this.views[this.activeViewId];
                  if (this.history == true) {
                      this.activeViewId = tmpViewStack.getActiveViewId();
                      var tmpViewBack = this.views[this.activeViewId];
                      tmpViewBack.activateView();
                      this.activeRoute = this.views[this.activeViewId].route;
                  }
              }
          }

          //TODO

      }, {
          key: 'navigateBackToView',
          value: function navigateBackToView(_viewId) {}

          //TODO

      }, {
          key: 'navigateToView',
          value: function navigateToView(_viewId) {}
      }, {
          key: 'getViewStack',
          value: function getViewStack(_viewStackId) {
              var tmpVstack = null;
              tmpVstack = this.viewstacks[_viewStackId];
              return tmpVstack;
          }
      }, {
          key: 'getView',
          value: function getView(_viewId) {
              var tmpV = null;
              tmpV = this.views[_viewId];
              return tmpV;
          }
      }, {
          key: 'render',
          value: function render() {
              if (!this.isRendered) {
                  this.renderNavigator();
                  this.renderNavigatorContent();
              }
          }
      }, {
          key: 'renderNavigator',
          value: function renderNavigator() {
              var tmpParentElement = document.getElementById(this.parentId);
              var tmpNavigatorEl = ElementUtils.constructNavigatorBaseElement(this.id);
              tmpParentElement.insertAdjacentHTML('beforeend', tmpNavigatorEl);
              this.isRendered = true;
          }

          //Overrides by SubClass

      }, {
          key: 'renderNavigatorContent',
          value: function renderNavigatorContent() {}
      }, {
          key: 'destroy',
          value: function destroy() {
              for (var viewObj in this.views) {
                  var tmpview = this.views[viewObj];
                  tmpview.destroy();
              }
              for (var viewStkObj in this.viewstacks) {
                  var tmpviewstk = this.viewstacks[viewStkObj];
                  tmpviewstk.destroy();
              }

              var tmpParentEl = document.getElementById(this.parentId);            var tmpNavigatorEl = ElementUtils.viewNavigator(this.id);
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
      }, {
          key: 'eventRouter',
          set: function set$$1(_router) {
              if (!_router instanceof EventRouter) {
                  throw new ClassError("ViewNavigator", "Wrong Type of Router");
              }
              this.eventroute = _router;
          },
          get: function get$$1() {
              return this.eventroute;
          }
      }]);
      return ViewNavigator;
  }(EventDispatcher);

  var ViewManager = function (_EventDispatcher) {
      inherits(ViewManager, _EventDispatcher);

      function ViewManager() {
          classCallCheck(this, ViewManager);

          var _this = possibleConstructorReturn(this, (ViewManager.__proto__ || Object.getPrototypeOf(ViewManager)).call(this));

          _this.preinitialize();
          _this.initialize();
          return _this;
      }

      createClass(ViewManager, [{
          key: 'preinitialize',
          value: function preinitialize() {
              var _this2 = this;

              this.navigators = {};
              this.currentNavigatorIds = [];
              this.router = new Router();
              this.rootId = "root";
              MessageBus.navEventChannel.addEventListener(EventUtils.NAV_CHANGE_EVENT, function (event) {
                  _this2.handleNavChangeEvent(event);
              });
          }

          //Overrides by SubClass

      }, {
          key: 'initialize',
          value: function initialize() {}
      }, {
          key: 'createNavigator',


          //Overrides by SubClass
          value: function createNavigator(_navigatorId, _parentId) {
              return new ViewNavigator(_navigatorId, _parentId);
          }
      }, {
          key: 'addNavigator',
          value: function addNavigator(_navigator, _navigatorId) {
              this.navigators[_navigatorId] = _navigator;
          }
      }, {
          key: 'getNavigator',
          value: function getNavigator(_navigatorId) {
              var tmpnavNav = null;
              if (this.navigators[_navigatorId] != null) tmpnavNav = this.navigators[_navigatorId];
              return tmpnavNav;
          }
      }, {
          key: 'findRouteNavigator',
          value: function findRouteNavigator(_route) {
              var tmpNavigatorIds = this.router.findNavigator(_route);
              return tmpNavigatorIds;
          }

          /**
           * - UseCase for Trigger multiple navigation view change for same "path" Navigation
          { path: "/main/dashboard", navigatorId: DashBoardNavigator"}
                { path: "/main/dashboard", navigatorId: StatusNavigator"}
              
              - UseCase Check any current Navigator Exist , then hide or destroy it 
                Then Launch new navigator 
                //TODO
              - UseCase for Nested Navigation
              { path: "/account/help", navigatorId: "HelpNavigator",parent:"MainNavigator" }
              
             
           * 
           */

      }, {
          key: 'handleNavChangeEvent',
          value: function handleNavChangeEvent(e) {
              var route = e.route;
              var navevent = e.eventName;
              var navparams = e.params;
              var navigatorIds = this.findRouteNavigator(route);
              if (navevent == EventUtils.BACK_NAV_EVENT) {
                  // No Need to destoy / hide navigator assuming its same navigator
                  this.changeBackNavigation(navigatorIds, route);
              } else {
                  this.currentRoute = route;
                  this.changeNavigation(navigatorIds, route, navevent, navparams);
              }
          }
      }, {
          key: 'changeBackNavigation',
          value: function changeBackNavigation(_navigatorIds, _route) {
              if (_navigatorIds.length > 0) {
                  for (var j = 0; j < _navigatorIds.length; j++) {
                      var tmpNavId = _navigatorIds[j];
                      var tmpNavigator = this.getNavigator(tmpNavId);
                      tmpNavigator.navigateBack(_route);
                  }
              }
          }
      }, {
          key: 'changeNavigation',
          value: function changeNavigation(_navigatorIds, _route, _navevent, _navparams) {
              this.checkAndDestroyNavigators(_navigatorIds, _route);
              if (_navigatorIds.length > 0) {
                  for (var k = 0; k < _navigatorIds.length; k++) {
                      var tmpNavid = _navigatorIds[k];
                      var tmpNavigator = this.getNavigator(tmpNavid);
                      if (tmpNavigator == null) {
                          tmpNavigator = this.createNavigator(tmpNavid, this.rootId);
                          this.addNavigator(tmpNavigator, tmpNavid);
                          tmpNavigator.render();
                          /* createNavigator will call internally addNavigator to save created navigator */
                          // tmpNavigator.addEventListner("changeNavEvent",onNavChangeEvent); 
                      }
                      tmpNavigator.navigate(_route, _navevent, _navparams);
                  }
              }
          }
      }, {
          key: 'checkAndDestroyNavigators',
          value: function checkAndDestroyNavigators(_navigatorIds, _route) {
              var unusedNavigators = [];
              if (_navigatorIds.length > 0) {
                  for (var m = 0; m < this.currentNavigatorIds.length; m++) {
                      var tmpCurrentNavId = this.currentNavigatorIds[m];
                      if (this.checkUnusedNavigator(tmpCurrentNavId, _navigatorIds)) {
                          unusedNavigators.push(tmpCurrentNavId);
                      }
                  }
              }

              this.destroyUnusedNavigators(unusedNavigators);
          }
      }, {
          key: 'checkUnusedNavigator',
          value: function checkUnusedNavigator(_currentnavId, _navigatorIds) {
              var unused = true;
              for (var n = 0; n < _navigatorIds.length; n++) {
                  if (_currentnavId == _navigatorIds[n]) {
                      unused = false; // navigator is used
                  }
              }
              return unused;
          }
      }, {
          key: 'destroyUnusedNavigators',
          value: function destroyUnusedNavigators(_unusedNavigators) {
              if (_unusedNavigators.length > 0) {
                  for (var p = 0; p < _unusedNavigators.length; p++) {
                      var tmpNavid = _unusedNavigators[p];
                      this.removeNavigator(tmpNavid);
                  }
              }
          }
      }, {
          key: 'removeNavigator',
          value: function removeNavigator(_navigatorId) {
              var tmpnav = this.navigators[_navigatorId];
              tmpnav.destroy();
              tmpnav = null;
              this.navigators[_navigatorId] = null;
          }
      }, {
          key: 'destroyAll',
          value: function destroyAll() {
              //TODO
          }
      }, {
          key: 'routes',
          set: function set$$1(_router) {
              if (!_router instanceof Router) {
                  throw new ClassError$1("ViewManager", "Wrong Type of Router");
              }
              this.router = _router;
          },
          get: function get$$1() {
              return this.router;
          }
      }, {
          key: 'ActiveNavigator',
          get: function get$$1() {
              return this.currentNavigatorId;
          },
          set: function set$$1(_navigatorId) {
              this.currentNavigatorId = _navigatorId;
          }
      }]);
      return ViewManager;
  }(EventDispatcher);

  var BindingUtil = function () {
      function BindingUtil() {
          classCallCheck(this, BindingUtil);

          if (!BindingUtil.instance) {
              BindingUtil.instance = this;
              this.BindObjDictionary = {};
          }
          return BindingUtil.instance;
      }

      createClass(BindingUtil, [{
          key: "Binds",
          value: function Binds(_srcObj, _srcProp, _evtname, _targObj, _targProp) {
              var srcObject = new Object();
              var srcPropStr = _srcProp + "prop";
              var srcObjKey = null;
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
                  if (typeof _srcObj[_srcProp] === 'function') {
                      srcObject[srcPropStr].value = _srcObj[_srcProp]();
                  } else {
                      srcObject[srcPropStr].value = _srcObj[_srcProp];
                  }
              }
              if (srcObject[srcPropStr].bindObjArray == null) {
                  srcObject[srcPropStr].bindObjArray = [];
              }
              var targetObject = this.getTargetObject(_targObj, _targProp);
              srcObject[srcPropStr].bindObjArray.push(targetObject);
              this.BindObjDictionary[srcObjKey] = srcObject;
          }
      }, {
          key: "addToBindDictionary",
          value: function addToBindDictionary(key, Obj, _evtname) {
              var _this = this;

              if (this.BindObjDictionary[key] == null) {
                  this.BindObjDictionary[key] = Obj;
              }
              Obj.addEventListener(_evtname, function (e) {
                  _this.synchronise(e);
              });
          }
      }, {
          key: "synchronise",
          value: function synchronise(event) {
              event.preventDefault();
              var srcObjfrmEvt = event.target;
              var eleid = void 0;
              console.info(typeof srcObjfrmEvt === "undefined" ? "undefined" : _typeof(srcObjfrmEvt));
              if (srcObjfrmEvt.id) {
                  eleid = srcObjfrmEvt.id;
              } else {
                  eleid = srcObjfrmEvt;
              }
              var srcObject = this.BindObjDictionary[eleid];
              var srcPropArrayLen = srcObject.srcPropArray.length;
              for (var i = 0; i < srcPropArrayLen; i++) {
                  var tmpProp = srcObject.srcPropArray[i];
                  var tmpPropStr = tmpProp + "prop";
                  // compare
                  var tmpval = void 0;
                  if (typeof srcObject[tmpProp] === 'function') {
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
      }, {
          key: "synchroniseTargetObj",
          value: function synchroniseTargetObj(srcObject, srcPropStr, srcProp) {
              var tarObjArray = srcObject[srcPropStr].bindObjArray;
              var tarObjArrayLen = tarObjArray.length;
              for (var j = 0; j < tarObjArrayLen; j++) {
                  var tarObj = tarObjArray[j];
                  var tmpval = void 0;
                  if (typeof srcObject[srcProp] === 'function') {
                      tmpval = srcObject[srcProp]();
                  } else {
                      tmpval = srcObject[srcProp];
                  }
                  if (tarObj.obj != null) {
                      if (typeof tarObj.obj[tarObj.prop] === 'function') {
                          tarObj.obj[tarObj.prop](tmpval);
                      } else {
                          tarObj.obj[tarObj.prop] = tmpval;
                      }
                  }
              }
          }
      }, {
          key: "getTargetObject",
          value: function getTargetObject(targObj, targProp) {
              var tarObject = new Object();
              tarObject.obj = targObj;
              tarObject.prop = targProp;
              return tarObject;
          }
      }, {
          key: "addBinding",
          value: function addBinding(srcObj, srcProp, evtname, targObj, targProp, twoway) {
              this.Binds(srcObj, srcProp, evtname, targObj, targProp);
              if (twoway) {
                  this.Binds(targObj, targProp, evtname, srcObj, srcProp);
              }
          }
      }, {
          key: "removeBinding",
          value: function removeBinding(srcObj, evtname) {
              // determine is it dom element or plain object
              var srcObject = void 0;
              if (srcObj == null) return;
              if (srcObj.nodeName) {
                  var eleid = srcObj.id;
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

                  var srcPropArrayLen = srcObject.srcPropArray.length;
                  for (var j = 0; j < srcPropArrayLen; j++) {
                      var srcProp = srcObject.srcPropArray[j];
                      var srcPropStr = srcProp + "prop";
                      srcObject[srcPropStr].bindObjArray = [];
                  }
              }
          }
      }, {
          key: "removeListeners",
          value: function removeListeners(sourceObj, evtname) {
              var _this2 = this;

              sourceObj.removeEventListener(evtname, function (e) {
                  _this2.synchronise(e);
              });
          }
      }]);
      return BindingUtil;
  }();

  var BindingUtilss = new BindingUtil();
  // prevents new properties from being added to the object
  Object.freeze(BindingUtilss);

  var CoreUITemplates = function () {
      function CoreUITemplates() {
          classCallCheck(this, CoreUITemplates);
      }

      createClass(CoreUITemplates, null, [{
          key: "VIEW_HTML",
          value: function VIEW_HTML(_viewId) {
              return "<div class=\"pjs-view " + _viewId + "\"></div>";
          }
      }, {
          key: "VIEWSTACK_HTML",
          value: function VIEWSTACK_HTML(_viewstackId) {
              return "<div class=\"pjs-viewstack " + _viewstackId + "\"></div>";
          }
      }, {
          key: "VIEW_NAVIGATOR_HTML",
          value: function VIEW_NAVIGATOR_HTML(_navigatorId) {
              return "<div class=\"pjs-viewnavigator " + _navigatorId + "\"></div>";
          }
      }]);
      return CoreUITemplates;
  }();

  //createjs

  exports.Event = Event;
  exports.EventDispatcher = EventDispatcher;
  exports.EventRouter = EventRouter;
  exports.Router = Router;
  exports.View = View;
  exports.ViewManager = ViewManager;
  exports.ViewNavigator = ViewNavigator;
  exports.ViewStack = ViewStack;
  exports.EventBroadCaster = MessageBus;
  exports.EventChannel = EventChannel;
  exports.NavigationEvent = NavigationEvent;
  exports.BindingUtils = BindingUtilss;
  exports.ClassError = ClassError$1;
  exports.CoreUITemplates = CoreUITemplates;
  exports.ElementUtils = ElementUtils;
  exports.EventUtils = EventUtils;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
