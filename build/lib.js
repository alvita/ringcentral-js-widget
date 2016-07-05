/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _w = __webpack_require__(81);
	
	var _w2 = _interopRequireDefault(_w);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// TODO: make it compatible with Commonjs, AMD, UMD
	window.w = _w2.default;
	// export default w;

/***/ },

/***/ 81:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _component = __webpack_require__(82);
	
	var _transition = __webpack_require__(86);
	
	var _index = __webpack_require__(83);
	
	var _translation = __webpack_require__(87);
	
	var _insertion = __webpack_require__(90);
	
	// function fetchWidget(file) {
	//     return fetch(w.options.path + ensureTail(file, '.html'))
	//         .then(response => response.text())
	//         .then(body => {
	//             var template = document.createElement('template')
	//             template.innerHTML = body
	//             var clone = document.importNode(template.content, true)
	//             return clone
	//         })
	// }
	
	// function parseDocument(template) {
	//     return Promise.all(Array.from(template.querySelectorAll('*'))
	//         .filter(doc => doc.tagName.indexOf('-') > -1 || doc instanceof HTMLUnknownElement)
	//         .reduce((result, doc) => {
	//             return result.concat(preload({
	//                 [doc.tagName.toLowerCase()]: doc.tagName.toLowerCase()
	//             }))
	//         }, []))
	// }
	
	function initNestedWidget(widget, template, options) {
	    if (template.__flat) return widget;
	    // TODO: perf hit
	    var docs = widget.root.querySelectorAll('*');
	    var customElements = Array.from(docs).filter(function (doc) {
	        return doc.tagName.indexOf('-') > -1 || doc instanceof HTMLUnknownElement;
	    });
	    if (customElements.length === 0) template.__flat = true;
	    customElements.forEach(function (doc) {
	        // FIXME: dynamic is not needed
	        if (typeof doc.getAttribute('dynamic') !== 'undefine' && doc.getAttribute('dynamic') !== null) {
	            return;
	        }
	        var name = doc.tagName.toLowerCase();
	        var child = w(name, Object.assign(widget.custom[name] || {}, options));
	        // child.mount(doc)
	        widget.children.push({
	            target: doc,
	            widget: child
	        });
	        widget.refs[name] = child;
	        var childName = doc.getAttribute('data-info');
	        if (childName) widget.refs[name] = child;
	    });
	    return widget;
	}
	
	// function preload(widgets, callback) {
	//     return Promise.all(
	//         Object.keys(widgets).reduce(
	//             (result, name) => {
	//                 if (!w.templates[name])
	//                     w.templates[name] = {}
	//                 if (!w.templates[name].fetch)
	//                     w.templates[name].fetch = fetchWidget(widgets[name])
	//                 return result.concat(
	//                     w.templates[name].fetch
	//                     .then(template => {
	//                         if (!w.templates[name].template) {
	//                             w.templates[name].template = template
	//                             var scripts = template.querySelectorAll('script')
	//                             var style = template.querySelector('style')
	//                             Array.from(scripts).forEach(script => {
	//                                 if (script.src && script.src.indexOf('http') !== 0)
	//                                     script.src = w.options.path + script.getAttribute('src')
	//                                 document.body.appendChild(script)
	//                                 document.body.removeChild(script)
	//                             })
	//                             if (style)
	//                                 document.head.appendChild(style)
	//                         }
	//                         return template
	//                     })
	//                     .then(parseDocument)
	//                     .catch(err => console.error('Widgets preload error:' + err)))
	//             }, [])
	//     ).then(callback)
	// }
	
	// Public API
	// function w(name, options = {}) {
	//     if (!w.templates[name] || !w.templates[name].widget)
	//         throw Error('you need to preload widget:' + name + ' before init it')
	//     return initNestedWidget(new w.templates[name].widget({
	//         template: w.templates[name].template.cloneNode(true),
	//         actions: options.actions || {},
	//         data: options.data || {},
	//         logLevel: w.options.logLevel,
	//         internal: true // for check it's called by internal
	//     }))
	// }
	
	var WIDGETS = __w_widgets;
	function w(name) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var widgetInfo = WIDGETS[name];
	    w.templates[name] = w.templates[name] || {
	        // indicate that the template is not including nested widget, perf improvement for skip parsing
	        __flat: false
	    };
	    w.templates[name].template = widgetInfo.template;
	    (0, _insertion.insert)(name, widgetInfo, options.shadowRoot);
	    return initNestedWidget(new w.templates[name].widget({
	        is: name,
	        template: w.templates[name].template,
	        actions: options.actions || {},
	        data: options.data || {},
	        props: options.props || {},
	        logLevel: w.options.logLevel,
	        internal: true // for check it's called by internal
	    }), w.templates[name], {
	        // inherited options
	        logLevel: options.logLevel,
	        shadowRoot: options.shadowRoot
	    });
	}
	
	w.templates = {};
	w.options = {};
	w.register = function (settings) {
	    // var settings = new settings()
	    var draft = {};
	    draft.events = [];
	    draft.on = function (event, target, callback, capture) {
	        if (typeof target === 'function') {
	            capture = callback;
	            callback = target;
	            target = null;
	        }
	        draft.events.push({
	            event: event,
	            target: target,
	            callback: callback,
	            capture: capture
	        });
	    };
	    settings.call(draft);
	    Object.keys(w.templates).forEach(function (index) {
	        var template = w.templates[index];
	        if (template.template && !template.widget) template.widget = (0, _component.register)(draft);
	    });
	};
	w.config = function (options, callback) {
	    w.options.preload = options.preload || {};
	    w.options.path = options.path || '';
	    w.options.logLevel = options.logLevel || 0;
	    w.options.locale = options.locale || {};
	    Promise.all([preload(w.options.preload), Object.keys(w.options.locale).forEach(function (index) {
	        var locale = w.options.locale[index];
	        (0, _translation.loadLocale)(index, locale);
	    })]).then(callback);
	};
	w.customize = function (context, target, options) {
	    // inherit parent's data
	    options.data = Object.assign(context.data, options.data);
	    context.custom[target] = options;
	};
	w.transition = function (effect) {
	    return {
	        init: function init(target, options) {
	            return (0, _transition.transitionInit)(effect, target, options);
	        },
	        in: function _in(target, options) {
	            return (0, _transition.transitionIn)(effect, target, options);
	        },
	        out: function out(target, options) {
	            return (0, _transition.transitionOut)(effect, target, options);
	        },
	        toggle: function toggle(target, options) {
	            return (0, _transition.transitionToggle)(effect, target, options);
	        }
	    };
	};
	w.locale = _translation.loadLocale;
	w.translate = _translation.translate;
	w.t = _translation.translate;
	exports.default = w;

/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.register = undefined;
	
	var _index = __webpack_require__(83);
	
	var _fragment = __webpack_require__(84);
	
	var _lifecycle = __webpack_require__(85);
	
	var _lifecycle2 = _interopRequireDefault(_lifecycle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var logger;
	var functionSet = {
	    before: function before() {},
	    method: function method() {},
	    after: function after() {},
	    error: function error(e) {
	        logger.error(e);
	        throw e;
	    }
	};
	function register() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? settings : arguments[0];
	
	    var actions = _ref.actions;
	    var events = _ref.events;
	    var data = _ref.data;
	    var props = _ref.props;
	
	    if (!actions) console.warn('Widgets do not have actions defined, maybe you get some typo.');['init', 'mount', 'unmount', 'destroy', 'error'].forEach(function (action) {
	        actions[action] = Object.assign((0, _index.shallowCopy)(functionSet), actions[action]);
	    });
	    var Clone = function Clone(options) {
	        Widget.call(this, {
	            actions: actions,
	            events: events,
	            data: (0, _index.shallowCopy)(data),
	            props: (0, _index.shallowCopy)(props)
	        }, options);
	    };
	    for (var prop in actions) {
	        if (actions.hasOwnProperty(prop)) Clone.prototype[prop] = generateActions(actions[prop]);
	    }
	    return Clone;
	}
	
	function Widget(_ref2, options) {
	    var _this = this;
	
	    var actions = _ref2.actions;
	    var events = _ref2.events;
	    var _ref2$data = _ref2.data;
	    var data = _ref2$data === undefined ? {} : _ref2$data;
	    var _ref2$props = _ref2.props;
	    var props = _ref2$props === undefined ? {} : _ref2$props;
	
	    if (!options || !options.internal) {
	        console.error('You are trying to construct a widget manually, please use w()');
	        return Error('You are trying to construct a widget manually, please use w()');
	    }
	    logger = (0, _index.initLogger)(options.logLevel);
	    this._mounted = false;
	
	    this.refs = {};
	    this.props = props;
	    this.custom = {};
	    this.children = [];
	    this.data = Object.assign(data, options.data);
	    this.fragment = (0, _fragment.createFragment)(options.is, options.template);
	    this.root = (0, _fragment.getDocumentRoot)(options.is, this.fragment);
	    this.dom = undefined;
	    // var actions = shallowCopy(actions)
	    // options.actions = shallowCopy(options.actions)
	
	    // Object.keys(options.actions).forEach(index => bindToTarget(options.actions, index))
	    // Object.keys(actions).forEach(index => bindToTarget(actions, index))
	    for (var prop in options.actions) {
	        if (options.actions.hasOwnProperty(prop)) this[prop] = generateActions(actions[prop], options.actions[prop], prop);
	    }
	
	    ['mount', 'unmount', 'destroy'].forEach(function (action) {
	        _this[action] = generateActions({
	            before: actions[action].before,
	            method: extendLifecycle(_lifecycle2.default[action].bind(_this), actions[action].method),
	            after: actions[action].after
	        }, options.actions[action], action);
	    });
	
	    this.dom = (0, _fragment.generateDocument)(this, this.fragment);
	    // bind event
	    events.forEach(function (event) {
	        var target;
	        var capture = false;
	        if (event.event === 'scroll') capture = true;
	        if (!event.target) target = _this.root;else if (event.target === 'document') target = document;else target = _this.dom[event.target];
	        target.addEventListener(event.event, event.callback.bind(_this), capture || event.capture);
	    });
	    this.init.call(this);
	}
	
	function extendLifecycle(base, extend) {
	    return function (finish) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }
	
	        base.apply(undefined, args);
	        if (extend && (0, _index.isFunction)(extend)) return extend.call(this, finish);
	    };
	}
	
	function bindScope(scope, action) {
	    return {
	        before: action.before ? (0, _index.bind6Args)(action.before, scope) : null,
	        method: action.method ? (0, _index.bind6Args)(action.method, scope) : null,
	        after: action.after ? (0, _index.bind6Args)(action.after, scope) : null,
	        error: action.error ? (0, _index.bind6Args)(action.error, scope) : null
	    };
	}
	
	function generateActions(widgetAction) {
	    var userAction = arguments.length <= 1 || arguments[1] === undefined ? (0, _index.shallowCopy)(functionSet) : arguments[1];
	
	    return function (a, b, c, d, e, f) {
	        var _this2 = this;
	
	        var before = function before(a, b, c, d, e, f) {
	            userAction.before && userAction.before.call(_this2, a, b, c, d, e, f);
	            var result = widgetAction.before ? widgetAction.before.call(_this2, a, b, c, d, e, f) : undefined;
	            // Something like Monad
	            if (typeof result !== 'undefined') return result;
	            return {
	                __custom: true,
	                data: [a, b, c, d, e, f].filter(function (item) {
	                    return typeof item !== 'undefined';
	                })
	            };
	        };
	        var method = function method(arg) {
	            var _widgetAction$method;
	
	            if (arg && arg.__custom) return widgetAction.method && (_widgetAction$method = widgetAction.method).call.apply(_widgetAction$method, [_this2, (0, _index.bind6Args)(userAction.method, _this2)].concat(_toConsumableArray(arg.data))) || arg;else return widgetAction.method && widgetAction.method.call(_this2, (0, _index.bind6Args)(userAction.method, _this2), arg) || arg;
	        };
	        var after = function after(arg) {
	            if (arg && arg.__custom) {
	                var _userAction$after, _widgetAction$after;
	
	                arg = arg.data;
	                userAction.after && (_userAction$after = userAction.after).call.apply(_userAction$after, [_this2].concat(_toConsumableArray(arg)));
	                return widgetAction.after && (_widgetAction$after = widgetAction.after).call.apply(_widgetAction$after, [_this2].concat(_toConsumableArray(arg))) || arg;
	            } else {
	                userAction.after && userAction.after.call(_this2, arg);
	                return widgetAction.after && widgetAction.after.call(_this2, arg) || arg;
	            }
	        };
	        var error = function error(e) {
	            widgetAction.error && widgetAction.error.call(_this2, e);
	            userAction.error && userAction.error.call(_this2, e);
	            throw e;
	        };
	
	        return chainActions(before(a, b, c, d, e, f), [before, method, after], error);
	    };
	}
	
	// function wrapUserAction(widget, user, ...args) {
	//     var continueDefault = (user != null && user(...args))
	//     if (continueDefault || typeof continueDefault === 'undefined')
	//         return widget(...args) || (() => args)
	//     return [].concat(...args)
	// }
	
	function chainActions(result, actions, error) {
	    var start = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	
	    if (start + 1 === actions.length) return result;
	    if ((0, _index.isThenable)(result)) {
	        return actions.reduce(function (res, action, index) {
	            if (index > start) return res.then(action);
	            return res;
	        }, result).catch(error);
	    } else {
	        return chainActions(actions[start + 1](result), actions, error, start + 1);
	    }
	}
	
	exports.register = register;

/***/ },

/***/ 83:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initLogger = initLogger;
	exports.isThenable = isThenable;
	exports.isFunction = isFunction;
	exports.ensureTail = ensureTail;
	exports.toFunction = toFunction;
	exports.shallowCopy = shallowCopy;
	exports.assign = assign;
	exports.find = find;
	exports.bind = bind;
	exports.bindNoArgs = bindNoArgs;
	exports.bind6Args = bind6Args;
	function initLogger(level) {
	    return {
	        error: function error() {
	            var _console;
	
	            (_console = console).error.apply(_console, arguments);
	        },
	        warn: function warn() {
	            var _console2;
	
	            if (level > 0) (_console2 = console).warn.apply(_console2, arguments);
	        },
	        info: function info() {
	            var _console3;
	
	            if (level > 1) (_console3 = console).info.apply(_console3, arguments);
	        },
	        log: function log() {
	            var _console4;
	
	            if (level > 1) (_console4 = console).log.apply(_console4, arguments);
	        }
	    };
	}
	
	function isThenable(result) {
	    if (result && result.then && typeof result.then === 'function') return true;
	    return false;
	}
	
	function isFunction(fn) {
	    return typeof fn === 'function';
	}
	
	function ensureTail(string, tail) {
	    if (string.endsWith(tail)) return string;
	    return string + tail;
	}
	
	function toFunction(fn, defalut) {
	    if (fn && isFunction(fn)) return fn;else if (defalut && isFunction(defalut)) return defalut;else return function () {};
	}
	
	function shallowCopy(target) {
	    if (Array.isArray(target)) return target.slice(0);
	    return Object.assign({}, target);
	}
	
	function assign(target, name, source) {
	    var tmp = {};
	    tmp[name] = source;
	    return Object.assign(target, tmp);
	}
	
	function find(array, prop, value) {
	    return array.find(function (item) {
	        return item[prop] === value;
	    });
	}
	
	// From Vue
	function bind(fn, ctx) {
	    return function (a) {
	        var l = arguments.length;
	        return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	    };
	}
	
	// From React
	function bindNoArgs(func, context) {
	    if (!func) {
	        return null;
	    }
	    return function () {
	        return func.call(context);
	    };
	};
	
	function bind6Args(fn, ctx) {
	    return function (a, b, c, d, e, f) {
	        return fn.call(ctx, a, b, c, d, e, f);
	    };
	}

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createFragment = createFragment;
	exports.generateDocument = generateDocument;
	exports.getDocumentRoot = getDocumentRoot;
	
	var _index = __webpack_require__(83);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var fragments = [];
	
	// Create a fragment with a custom tag as wrapper
	function createFragment(name, template) {
	    var frag;
	    if (frag = (0, _index.find)(fragments, 'name', name)) return frag.fragment.cloneNode(true);
	
	    frag = document.createDocumentFragment();
	    var customTag = document.createElement(name);
	    var wrapper = document.createElement('div');
	    wrapper.innerHTML = template;
	
	    frag.appendChild(customTag);
	    customTag.appendChild([].concat(_toConsumableArray(wrapper.childNodes)).find(function (node) {
	        return node.nodeType === 1;
	    }));
	
	    fragments.push({
	        name: name,
	        fragment: frag.cloneNode(true)
	    });
	    return frag;
	}
	
	function generateDocument(widget, fragment) {
	    // FIXME: DOM based is slower then String based
	    var dom = {};
	    var getRefsToDOM = getRefsTo(dom);
	    Array.from(fragment.querySelectorAll('[data-info]')).forEach(getRefsToDOM);
	    return dom;
	}
	
	function getRefsTo(target) {
	    return function (doc) {
	        var info = doc.getAttribute('data-info');
	        target[info] = doc;
	    };
	}
	
	function assignEventTo(widget) {
	    return function (doc) {
	        var events = doc.getAttribute('data-event').split('|');
	        for (var i = 0; i < events.length; ++i) {
	            var event = events[i];
	            var eventName = void 0;
	            var action = void 0;
	            event.split(':').forEach(function (token, index) {
	                if (index === 0) eventName = token;else if (index === 1) action = token;
	            });
	            if (!widget[action]) {
	                logger.warn('No such method:' + action + ' in ' + events + ', check data-event and widget methods definition.');
	                return;
	            }
	            doc.addEventListener(eventName, widget[action].bind(widget));
	        }
	    };
	}
	
	function getDocumentRoot(name, fragment) {
	    return fragment.querySelector(name);
	}

/***/ },

/***/ 85:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var lifecycle = {
	    init: function init() {},
	    destroy: function destroy() {
	        this.unmount();
	        // TODO: find out better way to destroy it
	        for (var property in this) {
	            this[property] = null;
	        }
	    },
	    unmount: function unmount() {
	        if (!this._mounted || !this.root || !this.root.parentNode) return;
	        this.root.parentNode.removeChild(this.root);
	        this._mounted = false;
	    },
	    mount: function mount(target, prepend) {
	        if (this._mounted) return;
	
	        typeof target === 'string' && (target = document.querySelector(target));
	
	        if (this.target) {
	            // Already mounted and unmounted before
	            if (prepend) target.insertBefore(this.root, target.firstChild);else target.appendChild(this.root);
	        } else {
	            // First time mount
	            this.children.forEach(function (child) {
	                return child.widget.mount(child.target);
	            });
	            // templates can only have one root
	            if (prepend) target.insertBefore(this.root, target.firstChild);else target.appendChild(this.root);
	            this._mounted = true;
	        }
	        return this;
	    },
	    error: function error() {}
	};
	exports.default = lifecycle;

/***/ },

/***/ 86:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.transitionIn = transitionIn;
	exports.transitionOut = transitionOut;
	exports.transitionInit = transitionInit;
	exports.transitionToggle = transitionToggle;
	function transitionIn(effect, target) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    options && options.before && options.before();
	    target.classList.add(effect);
	    target.classList.add(effect + '-in');
	    target.classList.remove(effect + '-out');
	    window.setTimeout(function () {
	        return target.classList.remove(effect + '-in');
	    }, 17);
	    var after = function after() {
	        options && options.after && options.after();
	        target.removeEventListener('transitionend', after);
	    };
	    target.addEventListener('transitionend', after);
	}
	function transitionOut(effect, target) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    options && options.before && options.before();
	    target.classList.add(effect);
	    target.classList.remove(effect + '-in');
	    window.setTimeout(function () {
	        return target.classList.add(effect + '-out');
	    }, 17);
	    var after = function after() {
	        options && options.after && options.after();
	        target.removeEventListener('transitionend', after);
	    };
	    target.addEventListener('transitionend', after);
	}
	function transitionInit(effect, target) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    options && options.before && options.before();
	    target.classList.add(effect + '-in');
	    // window.setTimeout(() => target.classList.add(effect), 17)
	    var after = function after() {
	        options && options.after && options.after();
	        target.removeEventListener('transitionend', after);
	    };
	    target.addEventListener('transitionend', after);
	}
	function transitionToggle(effect, target) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    if (target.classList.contains(effect + '-out') || target.classList.contains(effect + '-in')) transitionIn(effect, target, options);else transitionOut(effect, target, options);
	}

/***/ },

/***/ 87:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.loadLocale = loadLocale;
	exports.translate = translate;
	
	var _nodePolyglot = __webpack_require__(88);
	
	var _nodePolyglot2 = _interopRequireDefault(_nodePolyglot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var polyglots = {};
	var polyglot = new _nodePolyglot2.default();
	function loadLocale(name, file) {
	    fetch(file).then(function (response) {
	        return response.json();
	    }).then(function (data) {
	        return polyglots[name] = new _nodePolyglot2.default({ phrases: data });
	    });
	}
	function translate(locale) {
	    return function (string) {
	        return polyglots[locale] ? polyglots[locale].t(string) : '';
	    };
	}

/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

	// Added for convenience in the Node environment.
	// The meat and potatoes exist in ./lib/polyglot.js.
	module.exports = __webpack_require__(89);


/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     (c) 2012 Airbnb, Inc.
	//
	//     polyglot.js may be freely distributed under the terms of the BSD
	//     license. For all licensing information, details, and documention:
	//     http://airbnb.github.com/polyglot.js
	//
	//
	// Polyglot.js is an I18n helper library written in JavaScript, made to
	// work both in the browser and in Node. It provides a simple solution for
	// interpolation and pluralization, based off of Airbnb's
	// experience adding I18n functionality to its Backbone.js and Node apps.
	//
	// Polylglot is agnostic to your translation backend. It doesn't perform any
	// translation; it simply gives you a way to manage translated phrases from
	// your client- or server-side JavaScript application.
	//
	
	
	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return factory(root);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(root);
	  } else {
	    root.Polyglot = factory(root);
	  }
	}(this, function(root) {
	  'use strict';
	
	  var replace = String.prototype.replace;
	
	  // ### Polyglot class constructor
	  function Polyglot(options) {
	    options = options || {};
	    this.phrases = {};
	    this.extend(options.phrases || {});
	    this.currentLocale = options.locale || 'en';
	    this.allowMissing = !!options.allowMissing;
	    this.warn = options.warn || warn;
	  }
	
	  // ### Version
	  Polyglot.VERSION = '1.0.0';
	
	  // ### polyglot.locale([locale])
	  //
	  // Get or set locale. Internally, Polyglot only uses locale for pluralization.
	  Polyglot.prototype.locale = function(newLocale) {
	    if (newLocale) this.currentLocale = newLocale;
	    return this.currentLocale;
	  };
	
	  // ### polyglot.extend(phrases)
	  //
	  // Use `extend` to tell Polyglot how to translate a given key.
	  //
	  //     polyglot.extend({
	  //       "hello": "Hello",
	  //       "hello_name": "Hello, %{name}"
	  //     });
	  //
	  // The key can be any string.  Feel free to call `extend` multiple times;
	  // it will override any phrases with the same key, but leave existing phrases
	  // untouched.
	  //
	  // It is also possible to pass nested phrase objects, which get flattened
	  // into an object with the nested keys concatenated using dot notation.
	  //
	  //     polyglot.extend({
	  //       "nav": {
	  //         "hello": "Hello",
	  //         "hello_name": "Hello, %{name}",
	  //         "sidebar": {
	  //           "welcome": "Welcome"
	  //         }
	  //       }
	  //     });
	  //
	  //     console.log(polyglot.phrases);
	  //     // {
	  //     //   'nav.hello': 'Hello',
	  //     //   'nav.hello_name': 'Hello, %{name}',
	  //     //   'nav.sidebar.welcome': 'Welcome'
	  //     // }
	  //
	  // `extend` accepts an optional second argument, `prefix`, which can be used
	  // to prefix every key in the phrases object with some string, using dot
	  // notation.
	  //
	  //     polyglot.extend({
	  //       "hello": "Hello",
	  //       "hello_name": "Hello, %{name}"
	  //     }, "nav");
	  //
	  //     console.log(polyglot.phrases);
	  //     // {
	  //     //   'nav.hello': 'Hello',
	  //     //   'nav.hello_name': 'Hello, %{name}'
	  //     // }
	  //
	  // This feature is used internally to support nested phrase objects.
	  Polyglot.prototype.extend = function(morePhrases, prefix) {
	    var phrase;
	
	    for (var key in morePhrases) {
	      if (morePhrases.hasOwnProperty(key)) {
	        phrase = morePhrases[key];
	        if (prefix) key = prefix + '.' + key;
	        if (typeof phrase === 'object') {
	          this.extend(phrase, key);
	        } else {
	          this.phrases[key] = phrase;
	        }
	      }
	    }
	  };
	
	  // ### polyglot.unset(phrases)
	  // Use `unset` to selectively remove keys from a polyglot instance.
	  //
	  //     polyglot.unset("some_key");
	  //     polyglot.unset({
	  //       "hello": "Hello",
	  //       "hello_name": "Hello, %{name}"
	  //     });
	  //
	  // The unset method can take either a string (for the key), or an object hash with
	  // the keys that you would like to unset.
	  Polyglot.prototype.unset = function(morePhrases, prefix) {
	    var phrase;
	
	    if (typeof morePhrases === 'string') {
	      delete this.phrases[morePhrases];
	    } else {
	      for (var key in morePhrases) {
	        if (morePhrases.hasOwnProperty(key)) {
	          phrase = morePhrases[key];
	          if (prefix) key = prefix + '.' + key;
	          if (typeof phrase === 'object') {
	            this.unset(phrase, key);
	          } else {
	            delete this.phrases[key];
	          }
	        }
	      }
	    }
	  };
	
	  // ### polyglot.clear()
	  //
	  // Clears all phrases. Useful for special cases, such as freeing
	  // up memory if you have lots of phrases but no longer need to
	  // perform any translation. Also used internally by `replace`.
	  Polyglot.prototype.clear = function() {
	    this.phrases = {};
	  };
	
	  // ### polyglot.replace(phrases)
	  //
	  // Completely replace the existing phrases with a new set of phrases.
	  // Normally, just use `extend` to add more phrases, but under certain
	  // circumstances, you may want to make sure no old phrases are lying around.
	  Polyglot.prototype.replace = function(newPhrases) {
	    this.clear();
	    this.extend(newPhrases);
	  };
	
	
	  // ### polyglot.t(key, options)
	  //
	  // The most-used method. Provide a key, and `t` will return the
	  // phrase.
	  //
	  //     polyglot.t("hello");
	  //     => "Hello"
	  //
	  // The phrase value is provided first by a call to `polyglot.extend()` or
	  // `polyglot.replace()`.
	  //
	  // Pass in an object as the second argument to perform interpolation.
	  //
	  //     polyglot.t("hello_name", {name: "Spike"});
	  //     => "Hello, Spike"
	  //
	  // If you like, you can provide a default value in case the phrase is missing.
	  // Use the special option key "_" to specify a default.
	  //
	  //     polyglot.t("i_like_to_write_in_language", {
	  //       _: "I like to write in %{language}.",
	  //       language: "JavaScript"
	  //     });
	  //     => "I like to write in JavaScript."
	  //
	  Polyglot.prototype.t = function(key, options) {
	    var phrase, result;
	    options = options == null ? {} : options;
	    // allow number as a pluralization shortcut
	    if (typeof options === 'number') {
	      options = {smart_count: options};
	    }
	    if (typeof this.phrases[key] === 'string') {
	      phrase = this.phrases[key];
	    } else if (typeof options._ === 'string') {
	      phrase = options._;
	    } else if (this.allowMissing) {
	      phrase = key;
	    } else {
	      this.warn('Missing translation for key: "'+key+'"');
	      result = key;
	    }
	    if (typeof phrase === 'string') {
	      options = clone(options);
	      result = choosePluralForm(phrase, this.currentLocale, options.smart_count);
	      result = interpolate(result, options);
	    }
	    return result;
	  };
	
	
	  // ### polyglot.has(key)
	  //
	  // Check if polyglot has a translation for given key
	  Polyglot.prototype.has = function(key) {
	    return key in this.phrases;
	  };
	
	
	  // #### Pluralization methods
	  // The string that separates the different phrase possibilities.
	  var delimeter = '||||';
	
	  // Mapping from pluralization group plural logic.
	  var pluralTypes = {
	    chinese:   function(n) { return 0; },
	    german:    function(n) { return n !== 1 ? 1 : 0; },
	    french:    function(n) { return n > 1 ? 1 : 0; },
	    russian:   function(n) { return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2; },
	    czech:     function(n) { return (n === 1) ? 0 : (n >= 2 && n <= 4) ? 1 : 2; },
	    polish:    function(n) { return (n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2); },
	    icelandic: function(n) { return (n % 10 !== 1 || n % 100 === 11) ? 1 : 0; }
	  };
	
	  // Mapping from pluralization group to individual locales.
	  var pluralTypeToLanguages = {
	    chinese:   ['fa', 'id', 'ja', 'ko', 'lo', 'ms', 'th', 'tr', 'zh'],
	    german:    ['da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hu', 'it', 'nl', 'no', 'pt', 'sv'],
	    french:    ['fr', 'tl', 'pt-br'],
	    russian:   ['hr', 'ru'],
	    czech:     ['cs'],
	    polish:    ['pl'],
	    icelandic: ['is']
	  };
	
	  function langToTypeMap(mapping) {
	    var type, langs, l, ret = {};
	    for (type in mapping) {
	      if (mapping.hasOwnProperty(type)) {
	        langs = mapping[type];
	        for (l in langs) {
	          ret[langs[l]] = type;
	        }
	      }
	    }
	    return ret;
	  }
	
	  // Trim a string.
	  var trimRe = /^\s+|\s+$/g;
	  function trim(str){
	    return replace.call(str, trimRe, '');
	  }
	
	  // Based on a phrase text that contains `n` plural forms separated
	  // by `delimeter`, a `locale`, and a `count`, choose the correct
	  // plural form, or none if `count` is `null`.
	  function choosePluralForm(text, locale, count){
	    var ret, texts, chosenText;
	    if (count != null && text) {
	      texts = text.split(delimeter);
	      chosenText = texts[pluralTypeIndex(locale, count)] || texts[0];
	      ret = trim(chosenText);
	    } else {
	      ret = text;
	    }
	    return ret;
	  }
	
	  function pluralTypeName(locale) {
	    var langToPluralType = langToTypeMap(pluralTypeToLanguages);
	    return langToPluralType[locale] || langToPluralType.en;
	  }
	
	  function pluralTypeIndex(locale, count) {
	    return pluralTypes[pluralTypeName(locale)](count);
	  }
	
	  // ### interpolate
	  //
	  // Does the dirty work. Creates a `RegExp` object for each
	  // interpolation placeholder.
	  var dollarRegex = /\$/g;
	  var dollarBillsYall = '$$$$';
	  function interpolate(phrase, options) {
	    for (var arg in options) {
	      if (arg !== '_' && options.hasOwnProperty(arg)) {
	        // Ensure replacement value is escaped to prevent special $-prefixed
	        // regex replace tokens. the "$$$$" is needed because each "$" needs to
	        // be escaped with "$" itself, and we need two in the resulting output.
	        var replacement = options[arg];
	        if (typeof replacement === 'string') {
	          replacement = replace.call(options[arg], dollarRegex, dollarBillsYall);
	        }
	        // We create a new `RegExp` each time instead of using a more-efficient
	        // string replace so that the same argument can be replaced multiple times
	        // in the same phrase.
	        phrase = replace.call(phrase, new RegExp('%\\{'+arg+'\\}', 'g'), replacement);
	      }
	    }
	    return phrase;
	  }
	
	  // ### warn
	  //
	  // Provides a warning in the console if a phrase key is missing.
	  function warn(message) {
	    root.console && root.console.warn && root.console.warn('WARNING: ' + message);
	  }
	
	  // ### clone
	  //
	  // Clone an object.
	  function clone(source) {
	    var ret = {};
	    for (var prop in source) {
	      ret[prop] = source[prop];
	    }
	    return ret;
	  }
	
	  return Polyglot;
	}));


/***/ },

/***/ 90:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.insert = insert;
	var importedScripts = [];
	var importedStyles = [];
	function insertScript(script, shadow) {
	    var tag = document.createElement('script');
	    tag.text = script;
	    if (shadow) shadow.appendChild(tag);else {
	        document.body.appendChild(tag);
	        document.body.removeChild(tag);
	    }
	}
	function insertStyle(style, shadow) {
	    var tag = document.createElement('style');
	    tag.innerHTML = style;
	    shadow ? shadow.appendChild(tag) : document.body.appendChild(tag);
	}
	function importStyle(src, shadow) {
	    var style = document.createElement('style');
	    style.src = src;
	    shadow ? shadow.appendChild(style) : document.body.appendChild(style);
	}
	function importScript(src, shadow) {
	    var script = document.createElement('script');
	    script.onload = function () {
	        console.log('script loaded:' + src);
	    };
	    script.src = src;
	    shadow ? shadow.appendChild(script) : document.body.appendChild(script);
	}
	
	function insert(name, input, shadow) {
	    input.imports.scripts.forEach(function (src) {
	        return importScript(src, shadow);
	    });
	    input.imports.styles.forEach(function (src) {
	        return importStyle(src, shadow);
	    });
	    if (input.script && importedScripts.indexOf(name) === -1) {
	        importedScripts.push(name);
	        insertScript(input.script, shadow);
	    }
	    if (input.style && importedStyles.indexOf(name) === -1) {
	        importedStyles.push(name);
	        insertStyle(input.style, shadow);
	    }
	}

/***/ }

/******/ });
//# sourceMappingURL=lib.js.map