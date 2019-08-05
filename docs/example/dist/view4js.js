(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.view4js = {}));
}(this, function (exports) { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

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
  var Event =
  /*#__PURE__*/
  function () {
    function Event(type) {
      var bubbles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var cancelable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      _classCallCheck(this, Event);

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


    _createClass(Event, [{
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
      value: function set(props) {
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
        return "[".concat(this.constructor.name, " (type=").concat(this.type, ")]");
      }
    }]);

    return Event;
  }();

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

  var EventDispatcher =
  /*#__PURE__*/
  function () {
    _createClass(EventDispatcher, null, [{
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
      _classCallCheck(this, EventDispatcher);

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


    _createClass(EventDispatcher, [{
      key: "addEventListener",
      value: function addEventListener(type, listener) {
        var useCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var listeners;

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
        } // TODO: it would be nice to eliminate this. Maybe in favour of evtObj instanceof Event? Or !!evtObj.createEvent


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
          var i; // capture & atTarget

          for (i = l - 1; i >= 0 && !eventObj.propagationStopped; i--) {
            list[i]._dispatchEvent(eventObj, 1 + (i == 0));
          } // bubbling


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
        return "[".concat(this.constructor.name + this.name ? " ".concat(this.name) : "", "]");
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
          var l;

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
   * EventRouter
   */
  var EventRouter =
  /*#__PURE__*/
  function () {
    /**
     * @description EventRouter holds and manages array of event routes
     * Event Routes are used by ViewNavigator to find associated View and Viewstack
     * @param {array} [_routes=[]] - Events routes array
     * @memberof EventRouter
     */
    function EventRouter() {
      var _routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      _classCallCheck(this, EventRouter);

      this.routes = _routes;
    }
    /**
     *
     * @description Adds new Event Route
     * @param {string} _navEvent - Navigation Event Name
     * @param {string} _viewstackId - ViewStack ID
     * @param {string} _viewId -  View ID
     * @param {string} _path -  Navigator Route path associted 
     * @memberof EventRouter
     */


    _createClass(EventRouter, [{
      key: "addRoute",
      value: function addRoute(_navEvent, _viewstackId, _viewId, _path) {
        var route = {};
        route.navEvent = _navEvent;
        route.viewstackId = _viewstackId;
        route.viewId = _viewId;
        route.path = _path;
        this.routes.push(route);
      }
      /**
       *
       * @description find Event Route using Naviagtion EventName
       * @param {string} _navEvent
       * @returns {Object} Event Route Object
       * @memberof EventRouter
       */

    }, {
      key: "findRoute",
      value: function findRoute(_navEvent) {
        var tmpRoute = [];

        for (var x = 0; x < this.routes.length; x++) {
          if (this.routes[x].navEvent == _navEvent) tmpRoute = this.routes[x];
        }

        return tmpRoute;
      }
      /**
       *
       * @description finds associated view by Navigation EventName and Path
       * @param {string} _navEvent
       * @param {string} _path
       * @returns {string} - ViewID 
       * @memberof EventRouter
       */

    }, {
      key: "findViewId",
      value: function findViewId(_navEvent, _path) {
        var tmpViewId = [];

        for (var i = 0; i < this.routes.length; i++) {
          if (this.routes[i].navEvent == _navEvent && this.routes[i].path == _path) tmpViewId = this.routes[i].viewId;
        }

        return tmpViewId;
      }
      /**
       *
       * @description finds associated viewstack by Navigation EventName and Path
       * @param {string} _navEvent
       * @param {string} _path
       * @returns {string} - ViewStackID
       * @memberof EventRouter
       */

    }, {
      key: "findViewStackId",
      value: function findViewStackId(_navEvent, _path) {
        var tmpViewStackId = null;

        for (var j = 0; j < this.routes.length; j++) {
          if (this.routes[j].navEvent == _navEvent && this.routes[j].path == _path) tmpViewStackId = this.routes[j].viewstackId;
        }

        return tmpViewStackId;
      }
      /**
       *
       * @description Remove and Resets existing event routes
       * @memberof EventRouter
       */

    }, {
      key: "reset",
      value: function reset() {
        this.routes = [];
      }
      /**
       *
       * @description prints Event Routes
       * @memberof EventRouter
       */

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
   *
   * Router
   */
  var Router =
  /*#__PURE__*/
  function () {
    /**
     * @description Router holds and manages array of Path routes
     * Path Routes are used by ViewManager to find associated Navigator and Viewstack
     * @param {array} [_routes=[]] - Path routes array
     * @memberof Router
     */
    function Router() {
      var _routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      _classCallCheck(this, Router);

      this.routes = _routes;
    }
    /**
     *
     * @description Adds new Path Route
     * @param {string} _path - Path Name
     * @param {string} _navigatorId -  Navigator ID
     * @param {string} _parentId -  Parent Object / Element ID
     * @memberof Router
     */


    _createClass(Router, [{
      key: "addRoute",
      value: function addRoute(_path, _navigatorId, _parentId) {
        var route = {};
        route.path = _path;
        route.navigatorId = _navigatorId;
        route.parentId = _parentId;
        this.routes.push(route);
      }
      /**
       *
       * @description finds associated Navigator by Path route Name
       * @param {string} _route
       * @returns {Array} - NavigatorID Array
       * @memberof Router
       */

    }, {
      key: "findNavigator",
      value: function findNavigator(_route) {
        var tmpNavigatorIds = [];

        for (var i = 0; i < this.routes.length; i++) {
          if (this.routes[i].path === _route) tmpNavigatorIds.push(this.routes[i].navigatorId);
        }

        return tmpNavigatorIds;
      }
      /**
       *
       * @description finds associated Navigator Parent by navigator ID
       * @param {string} _navigatorId
       * @returns {string} - Parent ID
       * @memberof Router
       */

    }, {
      key: "findNavigatorParent",
      value: function findNavigatorParent(_navigatorId) {
        var tmpParentId = "root";

        for (var i = 0; i < this.routes.length; i++) {
          if (this.routes[i].navigatorId === _navigatorId) tmpParentId = this.routes[i].parentId;
        }

        return tmpParentId;
      }
      /**
       *
       * @description finds associated ViewStack  by Path route Name
       * @param {string} _route
       * @returns {string} - ViewStack ID
       * @memberof Router
       */

    }, {
      key: "findViewStack",
      value: function findViewStack(_route) {
        var tmpViewStackId = null;

        for (var j = 0; j < this.routes.length; j++) {
          if (this.routes[j].path == _route) tmpViewStackId = this.routes[j].viewstackId;
        }

        return tmpViewStackId;
      }
      /**
       *
       * @description Remove and Resets existing path routes
       * @memberof Router
       */

    }, {
      key: "reset",
      value: function reset() {
        this.routes = [];
      }
      /**
       *
       * @description prints path Routes
       * @memberof Router
       */

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
   *
   *
   * @class EventUtils
   */
  var EventUtils =
  /*#__PURE__*/
  function () {
    function EventUtils() {
      _classCallCheck(this, EventUtils);
    }

    _createClass(EventUtils, null, [{
      key: "FORGOTPWD_NAV_EVENT",

      /**
       *
       *
       * @readonly
       * @static
       * @memberof EventUtils
       */
      get: function get() {
        return "Forgotpwd_Nav_Event";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof EventUtils
       */

    }, {
      key: "REGISTER_NAV_EVENT",
      get: function get() {
        return "Register_Nav_Event";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof EventUtils
       */

    }, {
      key: "BACK_NAV_EVENT",
      get: function get() {
        return "Back_Nav_Event";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof EventUtils
       */

    }, {
      key: "NAV_CHANGE_EVENT",
      get: function get() {
        return "navigation_change_event";
      } //View,Navigator Specific Events

      /**
       *
       *
       * @readonly
       * @static
       * @memberof EventUtils
       */

    }, {
      key: "INITIALIZE_EVENT",
      get: function get() {
        return "initialize_event";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof EventUtils
       */

    }, {
      key: "ATTACHED_EVENT",
      get: function get() {
        return "attached_event";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof EventUtils
       */

    }, {
      key: "DETACHED_EVENT",
      get: function get() {
        return "detached_event";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof EventUtils
       */

    }, {
      key: "ACTIVATE_EVENT",
      get: function get() {
        return "activate_event";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof EventUtils
       */

    }, {
      key: "DEACTIVATE_EVENT",
      get: function get() {
        return "deactivate_event";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof EventUtils
       */

    }, {
      key: "CHANGE",
      get: function get() {
        return "change";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof EventUtils
       */

    }, {
      key: "CLICK",
      get: function get() {
        return "click";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof EventUtils
       */

    }, {
      key: "VIEW_EVENT",
      get: function get() {
        return "view_event";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof EventUtils
       */

    }, {
      key: "MODEL_EVENT",
      get: function get() {
        return "model_event";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof EventUtils
       */

    }, {
      key: "COMPONENT_EVENT",
      get: function get() {
        return "component_event";
      }
    }]);

    return EventUtils;
  }();

  /**
   *
   
   * EventChannel
   * @extends {EventDispatcher}
   */

  var EventChannel =
  /*#__PURE__*/
  function (_EventDispatcher) {
    _inherits(EventChannel, _EventDispatcher);

    /**
     * @description Eventchannel use to Publish event to Channel subscriber
     * It also known as PubSub
     * @example EventBroadCaster.navEventChannel.dispatchEvent(navEvent);
     * @param {String} _id - EventChannel ID
     * @memberof EventChannel
     */
    function EventChannel(_id) {
      var _this;

      _classCallCheck(this, EventChannel);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(EventChannel).call(this));
      _this.id = _id;
      return _this;
    }

    return EventChannel;
  }(EventDispatcher);

  /**
   *
   * 
   * EventBroadCaster
   */

  var EventBroadCaster =
  /*#__PURE__*/
  function () {
    /**
     * @description Singleton Static Class use to Broadcast Events in Application on Publish / Subscribe to Application Channel and Navigation Channel
     * @memberof EventBroadCaster
     */
    function EventBroadCaster() {
      _classCallCheck(this, EventBroadCaster);

      if (!EventBroadCaster.instance) {
        EventBroadCaster.instance = this;
        this.appEvtChannel = new EventChannel("APPLICATIONEVENT");
        this.navEvtChannel = new EventChannel("NAVIGATIONEVENT");
      }

      return EventBroadCaster.instance;
    }
    /**
     * @description Returns Application Event Channel Instance
     * @returns {Object}
     * @readonly
     * @memberof EventBroadCaster
     */


    _createClass(EventBroadCaster, [{
      key: "appEventChannel",
      get: function get() {
        return this.appEvtChannel;
      }
      /**
       * @description Returns Navigation Event Channel Instance
       * @returns {Object} 
       * @readonly
       * @memberof EventBroadCaster
       */

    }, {
      key: "navEventChannel",
      get: function get() {
        return this.navEvtChannel;
      }
    }]);

    return EventBroadCaster;
  }();

  var MessageBus = new EventBroadCaster(); // prevents new properties from being added to the object

  Object.freeze(MessageBus);

  /**
   *
   * 
   * NavigationEvent
   * @extends {Event}
   */

  var NavigationEvent =
  /*#__PURE__*/
  function (_Event) {
    _inherits(NavigationEvent, _Event);

    /**
     * @description Generates Event with Navigation Type . Useful to dispatched Event with EventName, Params, Event Type, Route
     * @param {string} _type
     * @param {string} _eventName
     * @param {Object} _params
     * @param {string} _route
     * @param {*} _bubbles
     * @param {Boolean} _cancelable
     * @memberof NavigationEvent
     */
    function NavigationEvent(_type, _eventName, _params, _route, _bubbles, _cancelable) {
      var _this;

      _classCallCheck(this, NavigationEvent);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(NavigationEvent).call(this, _type, _bubbles, _cancelable));
      _this.type = _type;
      _this.eventName = _eventName;
      _this.params = _params;
      _this.route = _route;
      return _this;
    }
    /**
     *
     *
     * @returns {Object} - creates and return NavigationEvent Instance
     * @memberof NavigationEvent
     */


    _createClass(NavigationEvent, [{
      key: "clone",
      value: function clone() {
        return new NavigationEvent(this.type, this.eventName, this.params, this.route, this.bubbles, this.cancelable);
      }
    }]);

    return NavigationEvent;
  }(Event);

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
   *
   * Generates Unique Instance ID
   * @class InstanceId
   */
  var InstanceId =
  /*#__PURE__*/
  function () {
    function InstanceId() {
      _classCallCheck(this, InstanceId);

      if (!InstanceId.instance) {
        InstanceId.instance = this;
        this.counter = 0;
      }

      return InstanceId.instance;
    }
    /**
     *
     * Returns Unique Instance ID
     * @readonly
     * @memberof InstanceId
     */


    _createClass(InstanceId, [{
      key: "generate",
      get: function get() {
        return this.counter++;
      }
    }]);

    return InstanceId;
  }();

  var GenInstanceId = new InstanceId(); // prevents new properties from being added to the object

  /**
   *
   * Core UI Template Utility Class 
   * Templates for 
   * View, ViewNavigator, ViewStack, Component, Container
   * @class ElementUtils
   */

  var ElementUtils =
  /*#__PURE__*/
  function () {
    function ElementUtils() {
      _classCallCheck(this, ElementUtils);
    }

    _createClass(ElementUtils, null, [{
      key: "component",

      /**
       * 
       * TODO:: Search Component in View Scope Only
       * TODO :: Search Container in View Scope Only
       * TODO :: Search View,ViewStack in ViewNavigator Scope Only 
       */

      /**
       *
       * Find  Component DOM Element by ComponentID
       * @static
       * @param {string} _componentId
       * @returns {string} Component DOM Element with ".vjs-component" css class
       * @memberof ElementUtils
       */
      value: function component(_componentId) {
        return document.querySelector(".vjs-component." + _componentId);
      }
      /**
       *
       * Find  Container DOM Element by ContainerID
       * @static
       * @param {string} _containerId
       * @returns {string} Container DOM Element with ".vjs-container" css class
       * @memberof ElementUtils
       */

    }, {
      key: "container",
      value: function container(_containerId) {
        return document.querySelector(".vjs-container." + _containerId);
      }
      /**
       *
       * Find  View DOM Element by ViewID
       * @static
       * @param {string} _viewId
       * @returns {string} View DOM Element with ".vjs-view" css class
       * @memberof ElementUtils
       */

    }, {
      key: "view",
      value: function view(_viewId) {
        return document.querySelector(".vjs-view." + _viewId);
      }
      /**
       *
       * Find  ViewStack DOM Element by ViewStackID
       * @static
       * @param {string} _viewStackId
       * @returns {string} ViewStack DOM Element with ".vjs-viewstack" css class
       * @memberof ElementUtils
       */

    }, {
      key: "viewStack",
      value: function viewStack(_viewStackId) {
        return document.querySelector(".vjs-viewstack." + _viewStackId);
      }
      /**
       *
       * Find  ViewNavigator DOM Element by ViewNavigatorID
       * @static
       * @param {string} _viewNavId
       * @returns {string} ViewNavigator DOM Element with ".vjs-viewnavigator" css class
       * @memberof ElementUtils
       */

    }, {
      key: "viewNavigator",
      value: function viewNavigator(_viewNavId) {
        return document.querySelector(".vjs-viewnavigator." + _viewNavId);
      }
      /**
       *
       * Creates  Component Base DOM Element by ComponentID
       * @static
       * @param {string} _componentId
       * @returns {string} Component DOM Element with ".vjs-component" css class
       * @memberof ElementUtils
       */

    }, {
      key: "constructComponentBaseElement",
      value: function constructComponentBaseElement(_componentId) {
        return "<div class=\"vjs-component ".concat(_componentId, "\"></div>");
      }
      /**
       *
       * Creates  Container Base DOM Element by ContainerID
       * @static
       * @param {string} _containerId
       * @returns {string} Container DOM Element with ".vjs-container" css class
       * @memberof ElementUtils
       */

    }, {
      key: "constructContainerBaseElement",
      value: function constructContainerBaseElement(_containerId) {
        return "<div class=\"vjs-container ".concat(_containerId, "\"></div>");
      }
      /**
       *
       * Creates  View Base DOM Element by ViewID
       * @static
       * @param {string} _viewId
       * @returns {string} View DOM Element with ".vjs-view" css class
       * @memberof ElementUtils
       */

    }, {
      key: "constructViewBaseElement",
      value: function constructViewBaseElement(_viewId) {
        return "<div class=\"vjs-view ".concat(_viewId, "\"></div>");
      }
      /**
       *
       * Creates  ViewStack Base DOM Element by ViewStackID
       * @static
       * @param {string} _viewStackId
       * @returns {string} ViewStack DOM Element with ".vjs-viewstack" css class
       * @memberof ElementUtils
       */

    }, {
      key: "constructViewStackBaseElement",
      value: function constructViewStackBaseElement(_viewStackId) {
        return "<div class=\"vjs-viewstack ".concat(_viewStackId, "\"></div>");
      }
      /**
       *
       * Creates  ViewNavigator Base DOM Element by ViewNavigatorID
       * @static
       * @param {string} _navigatorId
       * @returns {string} ViewNavigator DOM Element with ".vjs-viewnavigator" css class
       * @memberof ElementUtils
       */

    }, {
      key: "constructNavigatorBaseElement",
      value: function constructNavigatorBaseElement(_navigatorId) {
        return "<div class=\"vjs-viewnavigator ".concat(_navigatorId, "\"></div>");
      }
      /**
       *
       * Hide DOM Element
       * @static
       * @param {string} _el - DOM Element
       * @memberof ElementUtils
       */

    }, {
      key: "hideElement",
      value: function hideElement(_el) {
        _el.style.display = 'none';
      }
      /**
       *
       * Show DOM Element
       * @static
       * @param {string} _el -  DOM Element
       * @memberof ElementUtils
       */

    }, {
      key: "showElement",
      value: function showElement(_el) {
        _el.style.display = 'block';
      }
      /**
       *
       * Check if DOM Element is visible
       * @static
       * @param {string} _el - DOM Element
       * @returns {Boolean} 
       * @memberof ElementUtils
       */

    }, {
      key: "isVisible",
      value: function isVisible(_el) {
        return _el.style.display == "block" ? true : false;
      }
      /**
       *
       * Generate Unique Component Instance ID
       * @static
       * @returns {string} 
       * @memberof ElementUtils
       */

    }, {
      key: "generateComponentId",
      value: function generateComponentId() {
        return "component" + GenInstanceId.generate;
      }
      /**
       *
       * Generate Unique Container Instance ID
       * @static
       * @returns {string}
       * @memberof ElementUtils
       */

    }, {
      key: "generateContainerId",
      value: function generateContainerId() {
        return "container" + GenInstanceId.generate;
      }
    }]);

    return ElementUtils;
  }();

  /**
   * 
   * View
   * @extends {EventDispatcher}
   */

  var View =
  /*#__PURE__*/
  function (_EventDispatcher) {
    _inherits(View, _EventDispatcher);

    /**
     * @description View consider as single UI screen. 
     * View contains Contents consist of "Containers" and "Components". 
     * View can be use with Core HTML Components also.
     * View manages View Template or DOM Content such behaviour, event listners etc.
     * View created and manage by ViewNavigator.
     * @param {String} _id - View Id
     * @param {String} _route - View Route
     * @param {String} _navevent - View Navigation Event Name
     * @param {String} _navparams - Parameters pass to View 
     * @param {String} _parentViewStackId - Parent Viewstack Id 
     * @memberof View
     */
    function View(_id, _route, _navevent, _navparams, _parentViewStackId) {
      var _this;

      _classCallCheck(this, View);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(View).call(this));
      _this.id = _id;
      _this.route = _route;
      _this.navEvent = _navevent;
      _this.navParams = _navparams;
      _this.parentViewStackId = _parentViewStackId;
      _this.isAttached = false;
      _this.isActive = false;

      _this.initView();

      return _this;
    }
    /**
     *
     *
      @param {Event} event - Back Navigation Event dispatch by view component or method
     * @memberof View
     */


    _createClass(View, [{
      key: "dispatchNavBackEvent",
      value: function dispatchNavBackEvent(event) {
        event.preventDefault();
        var navEvent = new NavigationEvent(EventUtils.NAV_CHANGE_EVENT, EventUtils.BACK_NAV_EVENT, null, this.route);
        MessageBus.navEventChannel.dispatchEvent(navEvent);
      }
      /**
       *
       * @override
       * @description Call by View Constructor
       * @public
       * @memberof View
       */

    }, {
      key: "initView",
      value: function initView() {}
      /**
       * @override
       * @description Create View Contents and Internal Components
       * @public
       * @memberof View
       */

    }, {
      key: "createViewContent",
      value: function createViewContent() {}
      /**
       * @override
       * @description Add Event Handlers for view Internal Components
       * @public
       * @memberof View
       */

    }, {
      key: "addViewHandler",
      value: function addViewHandler() {}
      /**
       * @override
       * @description Remove Event Handlers for view Internal Components
       * @memberof View
       */

    }, {
      key: "removeViewHandler",
      value: function removeViewHandler() {}
      /**
       * @override
       * @description Bind View Component Properties with Model or other view Components
       * @public
       * @memberof View
       */

    }, {
      key: "bindView",
      value: function bindView() {}
      /**
       * @override
       * @description Remove Bind View Component Properties with Model or other view Components
       * @public
       * @memberof View
       */

    }, {
      key: "unBindView",
      value: function unBindView() {}
      /**
       * @override
       * @description Destroy Method used to cleanup view resources
       * Call by ViewNavigator to destroy view
       * Remove Event Handlers, Make Properties null, 
       * Remove View Components and its reference.
       * @public
       * @memberof View
       **/

    }, {
      key: "destroy",
      value: function destroy() {}
      /**
       * @description
       * View Lifecycle Method,
       * Call by ViewNavigator,
       * 
       * attachView Responsible to render view content, listners etc,
       * 
       * Dispatch "ATTACHED_EVENT" when view got attached / rendered,
       * 
       * Following methods call by attachView :
       * createViewContent
       * addViewHandler
       * bindView
       * @param {String} _parentEl 
       */

    }, {
      key: "attachView",
      value: function attachView() {
        var _parentEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (!this.isAttached) {
          var parentEl = _parentEl;
          if (parentEl == null) parentEl = ElementUtils.viewStack(this.parentViewStackId);
          parentEl.insertAdjacentHTML('beforeend', ElementUtils.constructViewBaseElement(this.id));
          this.isAttached = true;
          var tmpEle = this.getViewElement();
          ElementUtils.hideElement(tmpEle); //Create View Contents and Internal Components

          this.createViewContent(); //Add Event Handlers for view Internal Components

          this.addViewHandler(); //Bind View Component Properties with Model or other view Components

          this.bindView();
          this.dispatchEvent(EventUtils.ATTACHED_EVENT);
        }
      }
      /**
       * @description 
       * View Lifecycle Method
       * 
       * Call by ViewNavigator
       * 
       * attached View visible
       * @public
       * @memberof View
       */

    }, {
      key: "activateView",
      value: function activateView() {
        if (!this.isActive) {
          var tmpViewEl = this.getViewElement();
          ElementUtils.showElement(tmpViewEl);
          this.isActive = true;
        }
      }
      /**
       * @description
       * View Lifecycle Method
       * 
       * Call by ViewNavigator
       * 
       * attached View if visible (active) then will become nonvisible
       * @public
       * @memberof View
       */

    }, {
      key: "deActivateView",
      value: function deActivateView() {
        if (this.isActive) {
          var tmpViewEl = this.getViewElement();
          ElementUtils.hideElement(tmpViewEl);
          this.isActive = false;
        }
      }
      /**
       * @description
       * View Lifecycle Method
       * 
       * Call by ViewNavigator
       * 
       * View will be remove if View is attached 
       * @public
       * @memberof View  
      */

    }, {
      key: "detachView",
      value: function detachView() {
        if (this.isAttached) {
          this.unBindView();
          this.removeViewHandler();
          var tmpViewEle = this.getViewElement();
          tmpViewEle.parentNode.removeChild(tmpViewEle);
          this.isAttached = false;
          this.dispatchEvent(EventUtils.DETACHED_EVENT);
        }
      }
      /**
       * @description RefreshView method reset View properties or data
       * @override
       * @memberof View
      */

    }, {
      key: "refreshView",
      value: function refreshView() {}
      /**
       *
       * @description Returns View DOM Element
       * @returns {string} 
       * @memberof View
       */

    }, {
      key: "getViewElement",
      value: function getViewElement() {
        var tmpViewEl = null;

        if (this.isAttached) {
          tmpViewEl = ElementUtils.view(this.id);
        }

        return tmpViewEl;
      }
      /**
       *
       * @description Add Content DOM ELement to View DOM Element
       * @param {string} _tmpViewContentEl - Content DOM Element
       * @memberof View
       */

    }, {
      key: "addToViewElement",
      value: function addToViewElement(_tmpViewContentEl) {
        var tmpViewElement = this.getViewElement();
        tmpViewElement.insertAdjacentHTML('beforeend', _tmpViewContentEl);
      }
    }]);

    return View;
  }(EventDispatcher);

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
   *
   *
   * @class ElementState
   */
  var ElementState =
  /*#__PURE__*/
  function () {
    function ElementState() {
      _classCallCheck(this, ElementState);
    }

    _createClass(ElementState, null, [{
      key: "LOADING",

      /**
       *
       *
       * @readonly
       * @static
       * @memberof ElementState
       */
      get: function get() {
        return "loading";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof ElementState
       */

    }, {
      key: "LOADED",
      get: function get() {
        return "loaded";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof ElementState
       */

    }, {
      key: "SUCCESS",
      get: function get() {
        return "success";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof ElementState
       */

    }, {
      key: "ERROR",
      get: function get() {
        return "error";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof ElementState
       */

    }, {
      key: "WARNING",
      get: function get() {
        return "warning";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof ElementState
       */

    }, {
      key: "READONLY",
      get: function get() {
        return "readonly";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof ElementState
       */

    }, {
      key: "ENABLED",
      get: function get() {
        return "enabled";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof ElementState
       */

    }, {
      key: "DISABLED",
      get: function get() {
        return "disabled";
      }
      /**
       *
       *
       * @readonly
       * @static
       * @memberof ElementState
       */

    }, {
      key: "DEFAULT",
      get: function get() {
        return "default";
      }
    }]);

    return ElementState;
  }();

  /**
   *
   *
   * Component
   * @extends {EventDispatcher}
   */

  var Component =
  /*#__PURE__*/
  function (_EventDispatcher) {
    _inherits(Component, _EventDispatcher);

    /**
     * Creates an instance of Component.
     * @param {string} [_id=null] - ComponentID
     * @param {string} [_parentViewId=null] - Component Parent View ID
     * @param {string} [_parentContainerId=null] - Component Parent Container ID
     * @param {boolean} [_createDOMElement=true] - True if Component DOM element create from Template , False if taken from DOM.
     * @memberof Component
     */
    function Component() {
      var _this;

      var _id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var _parentViewId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var _parentContainerId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var _createDOMElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      _classCallCheck(this, Component);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Component).call(this));
      _this.isEnabled = true;
      _this.isAttached = false;
      _this.elState = ElementState.DEFAULT;
      _this.isRequired = false;
      _this.isReadOnly = false;
      _this.createDOMElement = _createDOMElement;
      _this.id = _id;
      _this.formId = "defaultform";
      if (_id == null || _id == "") _this.id = ElementUtils.generateComponentId();
      _this.parentViewId = _parentViewId;
      _this.parentContainerId = _parentContainerId;
      return _this;
    }
    /**
     *
     * Initialise Component properties and model
     * Call by View or Parent
     * @memberof Component
     */


    _createClass(Component, [{
      key: "init",
      value: function init() {
        this.initComponent();
      }
      /**
       * @override
       * @description call by init method
       * @memberof Component
       */

    }, {
      key: "initComponent",
      value: function initComponent() {}
      /**
       * creates DOM Contents of Component
       * Overrides by SubClass
       * Call by attach Method
       */

    }, {
      key: "createDOMContent",
      value: function createDOMContent() {}
      /**
       *
       * Add Component Content DOM Element to Component
       * @param {string} _tmpCompContentEl - DOMElement 
       * @memberof Component
       */

    }, {
      key: "addToComponentElement",
      value: function addToComponentElement(_tmpCompContentEl) {
        var tmpCompElement = this.componentElement;
        tmpCompElement.insertAdjacentHTML('beforeend', _tmpCompContentEl);
      }
      /**
       *
       * 
       * @description Add Event Handlers for Component DOM Elements and Model
       * Call by attach & set domElement Method
       * @override
       * @memberof Component
       */

    }, {
      key: "addEventHandler",
      value: function addEventHandler() {}
      /**
       * @override
       * @description Remove Event Handlers for Component DOM Elements and Model
       * call by destroy method
       * @memberof Component
       */

    }, {
      key: "removeEventHandler",
      value: function removeEventHandler() {}
      /**
       * Overrides by SubClass
       * Bind Component Properties with Model or other Components
       * call by attach & view
       */

    }, {
      key: "bind",
      value: function bind() {}
      /**
       * Overrides by SubClass
       * Remove Bind on Component Properties with Model or other Components
       */

    }, {
      key: "unBind",
      value: function unBind() {}
      /**
       * returns Component DOM Element
       */

    }, {
      key: "changeState",

      /**
       * change Component State
       */
      value: function changeState() {
        var _state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "default";

        this.elState = _state;
        this.changeComponentState();
      }
      /**
       * change Component State
       * Overrides by Subclass
       */

    }, {
      key: "changeComponentState",
      value: function changeComponentState() {}
      /**
       * returns True if Component is Required
       */

    }, {
      key: "setComponentRequired",

      /**
       * Overrides by Subclass
       */
      value: function setComponentRequired() {}
      /**
       * returns True if Component is ResdyOnly
       */

    }, {
      key: "setComponentReadOnly",

      /**
       * Overrides by Subclass
       */
      value: function setComponentReadOnly() {}
      /**
       * Boolean Property , returns True if Component is Enabled
       */

    }, {
      key: "setComponentEnabled",

      /**
       * Overrides by Subclass
       */
      value: function setComponentEnabled() {}
      /**
       * Boolean Property , returns True if Component is Visible
       */

    }, {
      key: "attach",

      /**
      * Component Lifecycle Method
      * Call by View or call manually 
      * attach Responsible to render component content, listners etc
      * Dispatch "ATTACHED_EVENT" when view got attached / rendered 
      * Following methods call by attach method
      * createDOMContent
      * addViewHandler
      * bind
      *  
      */
      value: function attach() {
        if (!this.isAttached) {
          this.isAttached = true;

          if (this.createDOMElement == true) {
            var parentEl = ElementUtils.container(this.parentContainerId);
            parentEl.insertAdjacentHTML('beforeend', ElementUtils.constructComponentBaseElement(this.id));
            var tmpEle = this.componentElement;
            ElementUtils.hideElement(tmpEle); //Create  Contents and Internal Components

            this.createDOMContent();
          } //Add Event Handlers for view Internal Components


          this.addEventHandler(); //Bind  Component Properties with Model or other  Components

          this.bind();
          this.enabled = true;
          this.visible = true;
          this.dispatchEvent(EventUtils.ATTACHED_EVENT);
        }
      }
      /**
       * Component Lifecycle Method
       * Call by View or call manually 
       * Component will be remove if Component is attached
      */

    }, {
      key: "detach",
      value: function detach() {
        if (this.isAttached) {
          this.unBind();
          this.removeEventHandler();
          var tmpComponentEle = this.componentElement;
          tmpComponentEle.parentNode.removeChild(tmpComponentEle);
          this.isAttached = false;
          this.dispatchEvent(EventUtils.DETACHED_EVENT);
        }
      }
      /**
       * Refresh Component data and model and event listners
       * Overrides by SubClass
       */

    }, {
      key: "refresh",
      value: function refresh() {}
      /**
       * Overrides by SubClass
       * Destroy Method used to cleanup component resources
       * Call by View or call manually to destroy view
       * Remove Event Handlers, Make Properties null, 
       * Remove DOM Element contents and its reference.
       **/

    }, {
      key: "destroy",
      value: function destroy() {}
    }, {
      key: "componentElement",
      get: function get() {
        var tmpComponentEl = null;

        if (this.isAttached) {
          tmpComponentEl = ElementUtils.component(this.id);
        }

        return tmpComponentEl;
      }
      /**
       * returns ParentViewID
       */

    }, {
      key: "parentView",
      get: function get() {
        return this.parentViewId;
      }
      /**
       * returns Parent Container ID
       */

    }, {
      key: "parentContainer",
      get: function get() {
        return this.parentContainerId;
      }
      /**
       * returns Component current state
       */

    }, {
      key: "currentState",
      get: function get() {
        return this.elState;
      }
    }, {
      key: "required",
      get: function get() {
        return this.isRequired;
      },
      set: function set() {
        var _isRequired = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.isRequired = _isRequired;
        this.setComponentRequired();
      }
    }, {
      key: "readOnly",
      get: function get() {
        return this.isReadOnly;
      },
      set: function set() {
        var _isReadOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.isReadOnly = _isReadOnly;

        if (this.isReadOnly == true) {
          this.changeState(ElementState.READONLY);
        } else {
          this.changeState(ElementState.DEFAULT);
        }

        this.setComponentReadOnly();
      }
    }, {
      key: "enabled",
      get: function get() {
        return this.isEnabled;
      },
      set: function set() {
        var _isenabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.isEnabled = _isenabled;
        this.setComponentEnabled();
      }
    }, {
      key: "visible",
      get: function get() {
        var tmpComponentEl = this.componentElement;
        return ElementUtils.isVisible(tmpComponentEl);
      },
      set: function set(_visible) {
        var tmpComponentEl = this.componentElement;
        if (_visible) ElementUtils.showElement(tmpComponentEl);else ElementUtils.hideElement(tmpComponentEl);
      }
    }]);

    return Component;
  }(EventDispatcher);

  /**
   *
   * Container
   * @extends {EventDispatcher}
   */

  var Container =
  /*#__PURE__*/
  function (_EventDispatcher) {
    _inherits(Container, _EventDispatcher);

    /**
     * @description Container contains View4Js Components
     * @param {string} [_id=null]
     * @param {string} [_parentViewId=null]
     * @param {boolean} [_createDOMElement=true]
     * @memberof Container
     */
    function Container() {
      var _this;

      var _id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var _parentViewId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var _createDOMElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      _classCallCheck(this, Container);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Container).call(this));
      _this.isEnabled = false;
      _this.createDOMElement = _createDOMElement;
      _this.id = _id;
      if (_id == null || _id == "") _this.id = ElementUtils.generateContainerId();
      _this.parentViewId = _parentViewId;
      return _this;
    }
    /**
     *
     * @override
     * @memberof Container
     */


    _createClass(Container, [{
      key: "initContainer",
      value: function initContainer() {}
      /**
       *
       * @description Call by View or Parent
       * @public
       * @memberof Container
       */

    }, {
      key: "init",
      value: function init() {
        this.initContainer();
      }
      /**
       * @description Call by attach Method
       * @override
       * @memberof Container
       */

    }, {
      key: "createDOMContent",
      value: function createDOMContent() {}
      /**
       *
       * @description Get Container HTML Content
       * @readonly
       * @memberof Container
       */

    }, {
      key: "attach",
      // 

      /**
       * @description
       * Container Lifecycle Method,
       * Call by View or manually 
       * 
       * attachView Responsible to render view content, listners etc,
       * 
       * Dispatch "ATTACHED_EVENT" when view got attached / rendered
       * @memberof Container
       */
      value: function attach() {
        if (!this.isAttached) {
          parentEl = ElementUtils.view(this._parentViewId);

          if (this.createDOMElement == true) {
            parentEl.insertAdjacentHTML('beforeend', ElementUtils.constructContainerBaseElement(this.id));
            var tmpEle = this.element;
            ElementUtils.hideElement(tmpEle); //Create  Contents and Internal Components

            this.createDOMContent();
          }

          this.enabled = true;
          this.visible = true;
          this.isAttached = true;
          this.dispatchEvent(EventUtils.ATTACHED_EVENT);
        }
      }
      /**
       * @description
       * Container Lifecycle Method
       * 
       * Call by View or Manually
       * 
       * Container will be remove if View is attached 
       * @public
       * @memberof Container  
      */

    }, {
      key: "detach",
      value: function detach() {
        if (this.isAttached) {
          var tmpContainerEl = this.componentElement;
          tmpContainerEl.parentNode.removeChild(tmpContainerEl);
          this.isAttached = false;
          this.dispatchEvent(EventUtils.DETACHED_EVENT);
        }
      }
      /**
       *
       * @description Call by View
       * @override
       * @memberof Container
       */

    }, {
      key: "refresh",
      value: function refresh() {}
      /**
       *
       * @description Call by View
       * @override
       * @memberof Container
       */

    }, {
      key: "destroy",
      value: function destroy() {//TODO
      }
    }, {
      key: "containerElement",
      get: function get() {
        var tmpContainerEl = null;

        if (this.isAttached) {
          tmpContainerEl = ElementUtils.container(this.id);
        }

        return tmpContainerEl;
      }
      /**
       *
       * @description Returns Parent ViewID
       * @readonly
       * @memberof Container
       */

    }, {
      key: "parent",
      get: function get() {
        return this._parentViewId;
      }
      /**
       * @description Returns true if Container is enabled
       * @returns {Boolean} 
       * @readonly 
       * @memberof Container
       */

    }, {
      key: "enabled",
      get: function get() {
        return this.isEnabled;
      },
      set: function set() {
        var _isenabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.isEnabled = _isenabled;
      }
      /**
       * Boolean Property , returns True if Component is Visible
       * @returns {Boolean} true if Container is visible
       * @memberof Container
       */

    }, {
      key: "visible",
      get: function get() {
        var tmpContainerEl = this.containerElement;
        return ElementUtils.isVisible(tmpContainerEl);
      },
      set: function set(_visible) {
        var tmpContainerEl = this.containerElement;
        if (_visible) ElementUtils.showElement(tmpContainerEl);else ElementUtils.hideElement(tmpContainerEl);
      }
    }]);

    return Container;
  }(EventDispatcher);

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
   *
   *
   * @class ClassError
   * @extends Error
   */
  var ClassError$1 =
  /*#__PURE__*/
  function (_Error) {
    _inherits(ClassError, _Error);

    function ClassError() {
      var _getPrototypeOf2;

      var _this;

      var _type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Class';

      _classCallCheck(this, ClassError);

      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      // Pass remaining arguments (including vendor specific ones) to parent constructor
      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ClassError)).call.apply(_getPrototypeOf2, [this].concat(params))); // Maintains proper stack trace for where our error was thrown (only available on V8)

      if (Error.captureStackTrace) {
        Error.captureStackTrace(_assertThisInitialized(_this), ClassError);
      } // Custom debugging information


      _this.type = _type;
      _this.date = new Date();
      return _this;
    }

    return ClassError;
  }(_wrapNativeSuper(Error));

  /**
   *
   *
   * ViewStack
   * @extends {EventDispatcher}
   */

  var ViewStack =
  /*#__PURE__*/
  function (_EventDispatcher) {
    _inherits(ViewStack, _EventDispatcher);

    /**
     * ViewStack maintains history of Views.
     * @param {string} _id - ViewStack ID
     * @param {string} _route - Path Route Name
     * @param {string} _parentId - ViewStack ParentID
     * @memberof ViewStack
     */
    function ViewStack(_id, _route, _parentId) {
      var _this;

      _classCallCheck(this, ViewStack);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ViewStack).call(this));
      _this.id = _id;
      _this.route = _route;
      _this.parentId = _parentId;
      _this.viewStack = [];
      _this.isRendered = false;

      _this.initViewStack();

      return _this;
    }
    /**
     *
     * @description Initialize ViewStack , Implement by Subclass
     * @override
     * @memberof ViewStack
     */


    _createClass(ViewStack, [{
      key: "initViewStack",
      value: function initViewStack() {}
      /**
       *
       * @description Push View in Viewstack
       * @param {string} _viewId
       * @param {array} _views
       * @memberof ViewStack
       */

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
      /**
       * @description 
       * Navigator will call view destroy method which will remove 
       * View DOM Element, EventListners reference to DOM Element,
       * Properties, Finally Object null to make garbage collected
       * @memberof ViewStack
       */

    }, {
      key: "popViewElement",
      value: function popViewElement() {
        this.viewStack.pop();
      }
      /**
       *
       * @description Returns Active View Id 
       * @returns {string} ViewID
       * @memberof ViewStack
       */

    }, {
      key: "getActiveViewId",
      value: function getActiveViewId() {
        if (this.viewStack.length > 0) return this.viewStack[this.viewStack.length - 1];
      }
      /**
       *
       * @description Returns Viewstack DOMElement
       * @public
       * @returns {string} DOM ELement
       * @memberof ViewStack
       */

    }, {
      key: "getViewStackElement",
      value: function getViewStackElement() {
        var el = null;

        if (this.isRendered) {
          el = this.getViewStackRootElement();
        }

        return el;
      }
      /**
       *  
       * @description Returns Viewstack Root DOMElement
       * @override
       * @private 
       * @returns {string} DOM Element
       * @memberof ViewStack
       */

    }, {
      key: "getViewStackRootElement",
      value: function getViewStackRootElement() {
        return ElementUtils.viewStack(this.id);
      }
      /**
       *
       * @description Render ViewStack DOMElement contents
       * @public
       * @memberof ViewStack
       */

    }, {
      key: "render",
      value: function render() {
        if (!this.isRendered) {
          this.renderViewStack();
          this.renderViewStackContent();
          this.isRendered = true;
        }
      }
      /**
       *
       * @description Render ViewStack DOMElement 
       * Called by Render method
       * @private
       * @memberof ViewStack
       */

    }, {
      key: "renderViewStack",
      value: function renderViewStack() {
        var tmpParentNavigatorEl = ElementUtils.viewNavigator(this.parentId);
        var tmpViewStackEl = ElementUtils.constructViewStackBaseElement(this.id);
        tmpParentNavigatorEl.insertAdjacentHTML('beforeend', tmpViewStackEl);
      }
      /**
       *
       * @override
       * @memberof ViewStack
       */

    }, {
      key: "renderViewStackContent",
      value: function renderViewStackContent() {}
      /**
       * 
       * @description 
       * Destroy Method used to cleanup viewstack resources
       * Call by ViewNavigator to destroy view
       * Remove Event Handlers, Make Properties null, 
       * Remove View Components and its reference.
       * @override
       * @public
       * @memberof ViewStack
       */

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

  /**
   * 
   * ViewNavigator
   * @extends {EventDispatcher}
   */

  var ViewNavigator =
  /*#__PURE__*/
  function (_EventDispatcher) {
    _inherits(ViewNavigator, _EventDispatcher);

    /**
     * @description
     * UI navigation  manages by ViewNavigator. 
     * 
     * ViewNavigator" is base class which have simple view navigation functionality.
     * 
     * ViewNavigator manages set of view using stack-based history mechanism which also called as ViewStack.
     * 
     * Each Viewstack represent its own view history stack. So View4Js supports multiple history stack too.
     * 
     * ViewNavigator also Manages LifeCycle of View.
     *
     * @param {String} _id - ViewNavigator ID
     * @param {String} [_parentId=null] - Parent ID View or "root" DOM Element
     * @todo {Boolean} navigationHistory - Enable or Disable Navigation History. 
     * If true ViewNavigator will keep View History.
     * @memberof ViewNavigator
     */
    function ViewNavigator(_id) {
      var _this;

      var _parentId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      _classCallCheck(this, ViewNavigator);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ViewNavigator).call(this));
      _this.id = _id; // HTML ID attribute only 

      _this.parentId = _parentId;
      _this.activeViewId = null;
      _this.activeViewStackId = null;
      _this.activeRoute = null;
      _this.views = {};
      _this.viewstacks = {};
      _this.eventRoute = new EventRouter();
      _this.isRendered = false;
      _this.navigationHistory = true;

      _this.initNavigator();

      return _this;
    }
    /**
     * @description Implemented by Subclass 
     * Call by ViewNavigator Constructor
     * @override
     * @memberof ViewNavigator
     */


    _createClass(ViewNavigator, [{
      key: "initNavigator",
      value: function initNavigator() {}
      /**
       * Sets Navigation History 
       * Boolean Property , returns True if Component is Enabled
       */

    }, {
      key: "createView",

      /**
       * 
       * @description 
       * By Default View class will be created
       * When Overrides by Subclass , custom Views will be created
       * @override
       * @param {String} _viewId - View ID
       * @param {String} _route - Navigation Route / Path 
       * @param {String} _navparams - Navigation Parameters pass to View
       * @param {String} _viewStackId - Parent Viewstack ID of View
       * @returns {Object} - View Instance
       * @memberof ViewNavigator
       */
      value: function createView(_viewId, _route, _navparams, _viewStackId) {
        return new View(_viewId, _route, _navparams, _viewStackId);
      }
      /**
       * @description 
       * By Default ViewStack class will be created
       * When Overrides by Subclass , custom Viewstack will be created 
       * @override
       * @param {String} _viewStackId - ViewStack ID
       * @param {String} _route - Navigation Route / Path 
       * @param {String} _parentId - Parent ViewNavigator ID
       * @returns {Object} - ViewStack Instance
       * @memberof ViewNavigator
       */

    }, {
      key: "createViewStack",
      value: function createViewStack(_viewStackId, _route, _parentId) {
        return new ViewStack(_viewStackId, _route, _parentId);
      }
      /**
       * @description 
       * Call by ViewManager
       * Navigation Route and Navigation EventRoute Combination must be unique
       * @param {String} _route - Navigation Route
       * @param {String} _navevent - Navigation Event Route 
       * @param {String} _navparams - Parameters pass to View
       * @memberof ViewNavigator
       */

    }, {
      key: "navigate",
      value: function navigate(_route, _navevent, _navparams) {
        var tmpviewStackId = null;

        if (this.navigationHistory == false) {
          this.navigateBack(_route);
        }

        tmpviewStackId = this.eventRoute.findViewStackId(_navevent, _route);
        var tmpViewStack = this.getViewStack(tmpviewStackId);
        if (tmpViewStack == null) tmpViewStack = this.createViewStack(tmpviewStackId, _route, this.id); // Viewstack have _parentId

        tmpViewStack.render(); // will construct Element and add it to DOM parent

        this.activeViewStackId = tmpviewStackId;
        this.viewstacks[tmpviewStackId] = tmpViewStack;
        var tmpviewId = this.eventRoute.findViewId(_navevent, _route);
        var tmpView = this.getView(tmpviewId);
        if (tmpView == null) tmpView = this.createView(tmpviewId, _route, _navevent, _navparams, tmpviewStackId);
        this.removeActiveMenuElement();
        var tmpViewStackEl = tmpViewStack.getViewStackElement();
        tmpView.attachView(tmpViewStackEl); // will construct Element and add it to DOM parent

        tmpViewStack.pushViewElement(tmpviewId, this.views);
        tmpView.activateView();
        this.activeViewId = tmpviewId;
        this.views[tmpviewId] = tmpView;
        this.activeRoute = _route;
        this.setActiveMenuElement(_navevent);
      }
      /**
       * @description 
       * Call by ViewManager or ViewNavigator internally
       * Navigate back to previous View if history set to true
       * @param {String} _route
       * @memberof ViewNavigator 
       */

    }, {
      key: "navigateBack",
      value: function navigateBack(_route) {
        if (_route == this.activeRoute) {
          var tmpViewStack = this.getViewStack(this.activeViewStackId);
          tmpViewStack.popViewElement();
          var tmpView = this.views[this.activeViewId];
          tmpView.deActivateView();
          tmpView.detachView();
          tmpView.destroy();
          this.removeActiveMenuElement();
          tmpView = null; // make garbage collected

          this.views[this.activeViewId] = null;
          delete this.views[this.activeViewId];

          if (this.navigationHistory == true) {
            this.activeViewId = tmpViewStack.getActiveViewId();
            var tmpViewBack = this.views[this.activeViewId];
            tmpViewBack.activateView();
            var tmpNavEvent = this.views[this.activeViewId].navEvent;
            this.setActiveMenuElement(tmpNavEvent);
            this.activeRoute = this.views[this.activeViewId].route;
          }
        }
      }
      /**
       * @description Navigate Back to Specific View
       * @param {String} _viewId - View ID
       * @todo To be Implemented
       * @memberof ViewNavigator
       */

    }, {
      key: "navigateBackToView",
      value: function navigateBackToView(_viewId) {}
      /**
       * @description Navigate to Specific View
       * @param {String} _viewId - View ID
       * @todo To be Implemented
       * @memberof ViewNavigator
       */

    }, {
      key: "navigateToView",
      value: function navigateToView(_viewId) {}
      /**
       *
       * @description This method will be implemented by Subclass
       * @memberof ViewNavigator
       */

    }, {
      key: "removeActiveMenuElement",
      value: function removeActiveMenuElement() {}
      /**
       *
       * @description This method will be implemented by Subclass
       * @param {string} _navEvent - Navigation Event Name
       * @memberof ViewNavigator
       */

    }, {
      key: "setActiveMenuElement",
      value: function setActiveMenuElement(_navEvent) {}
      /**
       * @description Get ViewStack Object by ViewStackId
       * @param {String} _viewStackId - ViewStackID
       * @returns {Object} - ViewStack Instance
       * @memberof ViewNavigator
       */

    }, {
      key: "getViewStack",
      value: function getViewStack(_viewStackId) {
        var tmpVstack = null;
        tmpVstack = this.viewstacks[_viewStackId];
        return tmpVstack;
      }
      /**
       * @description Get ViewObject by ViewId
       * @param {string} _viewId - ViewID
       * @returns {Object} - View Instance
       * @memberof ViewNavigator
       */

    }, {
      key: "getView",
      value: function getView(_viewId) {
        var tmpV = null;
        tmpV = this.views[_viewId];
        return tmpV;
      }
      /**
       * @description 
       * ViewNavigator Lifecycle Method,
       * Call by ViewManager,
       * Render ViewNavigator DOM Content
       * @public
       * @memberof ViewNavigator
       */

    }, {
      key: "render",
      value: function render() {
        if (!this.isRendered) {
          this.renderNavigator();
          this.renderNavigatorContent();
        }
      }
      /**
       *
       * @description Renders, ViewNavigator DOM Element , it call by Render Method 
       * @private
       * @memberof ViewNavigator
       */

    }, {
      key: "renderNavigator",
      value: function renderNavigator() {
        var tmpParentId = this.parentId;
        var tmpParentElement = null;

        if (this.parentId != "root") {
          tmpParentElement = ElementUtils.view(this.parentId);
        } else {
          tmpParentElement = document.getElementById(tmpParentId);
        }

        if (tmpParentElement != null) {
          var tmpNavigatorEl = ElementUtils.constructNavigatorBaseElement(this.id);
          tmpParentElement.insertAdjacentHTML('beforeend', tmpNavigatorEl);
          this.isRendered = true;
        } else {
          throw new ClassError("ViewNavigator", "No Parent Element found for Navigator");
        }
      }
      /**
       * @description Render Navigator Subclass DOM Element content
       * @private
       * @override
       * @memberof ViewNavigator
       */

    }, {
      key: "renderNavigatorContent",
      value: function renderNavigatorContent() {}
      /**
       * 
       * @description 
       * ViewNavigator Lifecycle Method,
       * Call by ViewManager to destroy ViewNavigator,
       * Remove Event Handlers, Make Properties null, 
       * Remove Views and Viewstack objects.
       * Remove ViewNavigator DOM Element and Its Contents
       * Remove EventRoute Object
       * @public
       * @memberof ViewNavigator
       */

    }, {
      key: "destroy",
      value: function destroy() {
        for (var viewObj in this.views) {
          var tmpview = this.views[viewObj];
          tmpview.destroy();
        }

        for (var viewStkObj in this.viewstacks) {
          var tmpviewstk = this.viewstacks[viewStkObj];
          tmpviewstk.destroy();
        }

        var tmpNavigatorEl = ElementUtils.viewNavigator(this.id);
        tmpNavigatorEl.parentNode.removeChild(tmpNavigatorEl);
        this.views = null;
        this.viewstacks = null;
        this.parentId = null;
        this.id = null;
        this.parentId = null;
        this.activeViewId = null;
        this.activeViewStackId = null;
        this.activeRoute = null;
        this.eventRoute = null;
        this.isRendered = false;
      }
    }, {
      key: "history",
      get: function get() {
        return this.navigationHistory;
      },
      set: function set() {
        var _navigationHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        this.navigationHistory = _navigationHistory;
      }
      /**
       * @description Set EventRouter for ViewNavigator, EventRouter is useful for EventBased Navigation and for navigation of single view or multiple views.
       * @param {Object} _router - EventRouter
       * @memberof ViewNavigator
       */

    }, {
      key: "eventRouter",
      set: function set(_router) {
        if (!_router instanceof EventRouter) {
          throw new ClassError("ViewNavigator", "Wrong Type of Router");
        }

        this.eventRoute = _router;
      }
      /**
       * @description Returns EventRouter instance of ViewNavigator
       * @returns {object} - EventRouter Instance
       * @readonly
       * @memberof ViewNavigator
       */
      ,
      get: function get() {
        return this.eventRoute;
      }
    }]);

    return ViewNavigator;
  }(EventDispatcher);

  /**
   *
   * ViewManager
   * @extends {EventDispatcher}
   */

  var ViewManager =
  /*#__PURE__*/
  function (_EventDispatcher) {
    _inherits(ViewManager, _EventDispatcher);

    /**
     * @description ViewManager manages ViewNavigator.It Subscribe to EventBroadcaster's Navigation channel to receive navigation change events.
     * ViewManager find ViewNavigator based on Path Routes data and it match route info received in navigation change event.
     * 
     * @memberof ViewManager
     */
    function ViewManager() {
      var _this;

      _classCallCheck(this, ViewManager);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ViewManager).call(this));

      _this.preinitialize();

      _this.initialize();

      return _this;
    }
    /**
     * @description preinitialize navigators,router etc.
     * @private
     * @memberof ViewManager
     */


    _createClass(ViewManager, [{
      key: "preinitialize",
      value: function preinitialize() {
        var _this2 = this;

        this.navigators = {};
        this.currentNavigatorIds = [];
        this.router = new Router();
        this.rootId = "root";
        this.currentRoute = null;
        MessageBus.navEventChannel.addEventListener(EventUtils.NAV_CHANGE_EVENT, function (event) {
          _this2.handleNavChangeEvent(event);
        });
      }
      /**
       * @description Implement by subclass to initialise 
       * @override
       * @public
       * @memberof ViewManager
       */

    }, {
      key: "initialize",
      value: function initialize() {}
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

    }, {
      key: "createNavigator",

      /**
       * @description ViewManager calls createNavigator method when ViewNavigator is not created yet. 
       * @param {string} _navigatorId - ViewNavigatorId
       * @param {string} _parentId - ParentId is DOM Element id or ViewID
       * @returns {Object} - New Instance of ViewNavigator
       * @memberof ViewManager
       */
      value: function createNavigator(_navigatorId, _parentId) {
        return new ViewNavigator(_navigatorId, _parentId);
      }
      /**
       * @description ViewManager maintains navigators object in Key, Value form.
       * Where key is viewNavigatorID and value is ViewNavigator Object Instance
       * @param {Object} _navigator - ViewNavigator
       * @param {string} _navigatorId - ViewNavigatorID
       * @memberof ViewManager
       */

    }, {
      key: "addNavigator",
      value: function addNavigator(_navigator, _navigatorId) {
        this.navigators[_navigatorId] = _navigator; //this.currentNavigatorIds.push(_navigatorId);
      }
      /**
       * @returns {Object} - ViewNavigator Object Instance by ViewNavigatorId.
       * @param {string} _navigatorId - ViewNavigatorID
       * @memberof ViewManager
       */

    }, {
      key: "getNavigator",
      value: function getNavigator(_navigatorId) {
        var tmpnavNav = null;
        if (this.navigators[_navigatorId] != null) tmpnavNav = this.navigators[_navigatorId];
        return tmpnavNav;
      }
      /**
       * @returns {Array} - NavigatorID Array 
       * @param {string} _route - Path Route Name
       * @memberof ViewManager 
       */

    }, {
      key: "findRouteNavigator",
      value: function findRouteNavigator(_route) {
        var tmpNavigatorIds = this.router.findNavigator(_route);
        return tmpNavigatorIds;
      }
      /**
       * @returns {string} - ParentID of ViewNavigator 
       * @param {string} _navigatorId - ViewNavigatorID
       * @memberof ViewManager
       */

    }, {
      key: "getNavigatorParent",
      value: function getNavigatorParent(_navigatorId) {
        var tmpNavParentId = this.router.findNavigatorParent(_navigatorId);
        return tmpNavParentId;
      }
    }, {
      key: "handleNavChangeEvent",
      value: function handleNavChangeEvent(e) {
        var route = e.route;
        var navevent = e.eventName;
        var navparams = e.params;
        var navigatorIds = this.findRouteNavigator(route);

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

    }, {
      key: "changeBackNavigation",
      value: function changeBackNavigation(_navigatorIds, _route) {
        if (_navigatorIds.length > 0) {
          for (var j = 0; j < _navigatorIds.length; j++) {
            var tmpNavId = _navigatorIds[j];
            var tmpNavigator = this.getNavigator(tmpNavId);

            if (tmpNavigator.history == true) {
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

    }, {
      key: "changeNavigation",
      value: function changeNavigation(_navigatorIds, _route, _navevent, _navparams) {
        this.checkAndDestroyNavigators(_navigatorIds, _route);

        if (_navigatorIds.length > 0) {
          for (var k = 0; k < _navigatorIds.length; k++) {
            var tmpNavid = _navigatorIds[k];
            var tmpNavigator = this.getNavigator(tmpNavid);

            if (tmpNavigator == null) {
              // Add code here to find parent of Navigator.
              var tmpParentElId = this.getNavigatorParent(tmpNavid);
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
    }, {
      key: "chkAndDestroyNestedNavs",
      value: function chkAndDestroyNestedNavs(_route) {
        // Find Navigators Ids with current active route
        var tmpCurrNavIds = this.findRouteNavigator(_route);
        var tmpCurrViewIds = [];
        var tmpNestNavIds = []; // Chk Active route Navigators have history false
        // If History false then get its ViewId

        if (tmpCurrNavIds.length > 0) {
          for (var x = 0; x < tmpCurrNavIds.length; x++) {
            var tmpCurrNavId = tmpCurrNavIds[x];

            if (this.navigators[tmpCurrNavId] != null) {
              var tmpViewId = this.navigators[tmpCurrNavId].activeViewId;

              if (this.navigators[tmpCurrNavId].history == false) {
                tmpCurrViewIds.push(tmpViewId);
              }
            }
          }
        } // Find Navigators who have Active ViewId as Parent


        if (tmpCurrViewIds.length > 0) {
          for (var y = 0; y < tmpCurrViewIds.length; y++) {
            var tmpViwId = tmpCurrViewIds[y];
            var tmpNestNavId = this.chkViewAsNavigatorParent(tmpViwId);

            if (tmpNestNavId != null) {
              tmpNestNavIds.push(tmpNestNavId);
            }
          }
        } // Destory Navigators who have Active ViewId as Parent


        if (tmpNestNavIds.length > 0) {
          this.destroyUnusedNavigators(tmpNestNavIds);
        }
      }
    }, {
      key: "chkViewAsNavigatorParent",
      value: function chkViewAsNavigatorParent(_viewId) {
        var tmpNavId = null;

        for (var nav in this.navigators) {
          if (this.navigators[nav] != null) {
            var tmpParentId = this.navigators[nav].parentId;

            if (tmpParentId != null && tmpParentId == _viewId) {
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

    }, {
      key: "checkAndDestroyNavigators",
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
      /**
       * @description
       * checkUnusedNavigator will check if ViewNavigator is used or unused.
       * @private
       * @param {string} _currentnavId 
       * @param {Array} _navigatorIds
       * @returns {string} - unused navigatorid
       * @memberof ViewManager 
       */

    }, {
      key: "checkUnusedNavigator",
      value: function checkUnusedNavigator(_currentnavId, _navigatorIds) {
        var unused = true;

        for (var n = 0; n < _navigatorIds.length; n++) {
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

    }, {
      key: "destroyUnusedNavigators",
      value: function destroyUnusedNavigators(_unusedNavigators) {
        if (_unusedNavigators.length > 0) {
          for (var p = 0; p < _unusedNavigators.length; p++) {
            var tmpNavid = _unusedNavigators[p];
            this.removeNavigator(tmpNavid);
          }
        }
      }
      /**
       * @description removes ViewNavigator object instance from navigators array.
       * @param {String} _navigatorId - NavigatorId
       * @memberof ViewManager
       */

    }, {
      key: "removeNavigator",
      value: function removeNavigator(_navigatorId) {
        var tmpnav = this.navigators[_navigatorId];
        tmpnav.destroy();
        tmpnav = null;
        this.navigators[_navigatorId] = null;
      }
    }, {
      key: "destroyAll",

      /**
       *
       * @todo Implment destroy method
       * @memberof ViewManager
       */
      value: function destroyAll() {//TODO
      }
    }, {
      key: "routes",
      set: function set(_router) {
        if (!_router instanceof Router) {
          throw new ClassError$1("ViewManager", "Wrong Type of Router");
        }

        this.router = _router;
      },
      get: function get() {
        return this.router;
      }
    }]);

    return ViewManager;
  }(EventDispatcher);

  /**
   * GenericEvent
   * @extends {Event}
   */

  var GenericEvent =
  /*#__PURE__*/
  function (_Event) {
    _inherits(GenericEvent, _Event);

    /**
     * @description Useful to dispatched Event with EventName, Params, Event Type
     * @param {string} _type
     * @param {string} _eventName
     * @param {Object} _params
     * @param {*} _bubbles
     * @param {Boolean} _cancelable
     * @memberof GenericEvent
     */
    function GenericEvent(_type, _eventName, _params, _bubbles, _cancelable) {
      var _this;

      _classCallCheck(this, GenericEvent);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(GenericEvent).call(this, _type, _bubbles, _cancelable));
      _this.type = _type;
      _this.eventName = _eventName;
      _this.params = _params;
      return _this;
    }
    /**
     *
     *
     * @returns {Object) - creates and return GenericEvent Instance
     * @memberof GenericEvent
     */


    _createClass(GenericEvent, [{
      key: "clone",
      value: function clone() {
        return new GenericEvent(this.type, this.eventName, this.params, this.bubbles, this.cancelable);
      }
    }]);

    return GenericEvent;
  }(Event);

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
  var BindingUtil =
  /*#__PURE__*/
  function () {
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
    function BindingUtil() {
      _classCallCheck(this, BindingUtil);

      if (!BindingUtil.instance) {
        BindingUtil.instance = this;
        this.BindObjDictionary = {};
        this.objCounter = 0;
        this.bindObjIdPrefix = "bindobj";
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


    _createClass(BindingUtil, [{
      key: "Binds",
      value: function Binds(_srcObj, _srcProp, _evtname, _targObj, _targProp) {
        var srcObject = new Object();
        var srcPropStr = _srcProp + "prop";
        var srcObjKey = null;
        this.objCounter++;
        var tmpId = this.bindObjIdPrefix + this.objCounter;

        if (_srcObj.nodeName) {
          srcObjKey = tmpId; //_srcObj.id;
          //TODO:: Following line will be enabled for data-id attribute
          // srcObjKey = _srcObj.dataset.id;

          _srcObj.dataset.bindid = srcObjKey;
          this.addToBindDictionary(srcObjKey, _srcObj, _evtname);
          srcObject = this.BindObjDictionary[srcObjKey];
        } else {
          srcObjKey = tmpId;
          _srcObj.bindid = srcObjKey;
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
        var eleid;
        console.info(_typeof(srcObjfrmEvt));

        if (srcObjfrmEvt.bindid) {
          eleid = srcObjfrmEvt.bindid;
        } else {
          eleid = srcObjfrmEvt.dataset.bindid;
        }

        var srcObject = this.BindObjDictionary[eleid];
        var srcPropArrayLen = srcObject.srcPropArray.length;

        for (var i = 0; i < srcPropArrayLen; i++) {
          var tmpProp = srcObject.srcPropArray[i];
          var tmpPropStr = tmpProp + "prop"; // compare

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

    }, {
      key: "addBinding",
      value: function addBinding(srcObj, srcProp, evtname, targObj, targProp, twoway) {
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

    }, {
      key: "removeBinding",
      value: function removeBinding(_srcObj, _evtname) {
        // determine is it dom element or plain object
        var srcObject;
        if (_srcObj == null) return;

        if (_srcObj.nodeName) {
          var eleid = _srcObj.dataset.bindid;

          if (this.BindObjDictionary[eleid] != null) {
            srcObject = this.BindObjDictionary[eleid];
            this.removeListeners(srcObject);
          } else {
            srcObject = this.BindObjDictionary[srcObj.bindid];
            this.removeListeners(srcObject);
          }
        } else {
          if (this.BindObjDictionary[srcObj.bindid] != null) {
            srcObject = this.BindObjDictionary[srcObj.bindid];
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

  exports.BindingUtils = BindingUtilss;
  exports.ClassError = ClassError$1;
  exports.Component = Component;
  exports.Container = Container;
  exports.ElementState = ElementState;
  exports.ElementUtils = ElementUtils;
  exports.Event = Event;
  exports.EventBroadCaster = MessageBus;
  exports.EventChannel = EventChannel;
  exports.EventDispatcher = EventDispatcher;
  exports.EventRouter = EventRouter;
  exports.EventUtils = EventUtils;
  exports.GenericEvent = GenericEvent;
  exports.InstanceId = GenInstanceId;
  exports.NavigationEvent = NavigationEvent;
  exports.Router = Router;
  exports.View = View;
  exports.ViewManager = ViewManager;
  exports.ViewNavigator = ViewNavigator;
  exports.ViewStack = ViewStack;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
