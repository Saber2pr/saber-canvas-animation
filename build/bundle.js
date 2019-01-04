/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1));
var saber_interval_1 = __webpack_require__(2);
var saber_canvas_1 = __webpack_require__(4);
var saber_observable_1 = __webpack_require__(7);
var canvas = new saber_canvas_1.Canvas('test', 400, 400)
    .draw(new saber_canvas_1.Node(400, 400))
    .draw(new saber_canvas_1.Label('Canvas动画测试').setPosition(150, 200));
var createNodeObservable = function (color, x, y) {
    var observer = new saber_observable_1.Observable(new saber_canvas_1.Node(50, 50).setColor(color).setPosition(x, y));
    observer.subscribe(function (n) { return canvas.draw(n); });
    return observer;
};
var action = function (node) {
    canvas.clear(node);
    return function (dx, dy) {
        var next = node.setPosition(node.x + dx, node.y + dy);
        canvas.draw(next);
        return next;
    };
};
var observer0 = createNodeObservable('red', 0, 0);
var observer1 = createNodeObservable('green', 350, 0);
var observer2 = createNodeObservable('yellow', 0, 350);
var observer3 = createNodeObservable('blue', 350, 350);
saber_interval_1.schedule(function () {
    if (observer0.pull().x > 400) {
        observer0.pipe(function (node) { return action(node)(-350, 0); });
        observer1.pipe(function (node) { return action(node)(0, -350); });
        observer2.pipe(function (node) { return action(node)(0, 350); });
        observer3.pipe(function (node) { return action(node)(350, 0); });
    }
    else {
        observer0.pipe(function (node) { return action(node)(2, 0); });
        observer1.pipe(function (node) { return action(node)(0, 2); });
        observer2.pipe(function (node) { return action(node)(0, -2); });
        observer3.pipe(function (node) { return action(node)(-2, 0); });
    }
}, 2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: AK-12
 * @Date: 2019-01-03 18:32:19
 * @Last Modified by: AK-12
 * @Last Modified time: 2019-01-04 15:14:12
 */
exports.sayhello = function () {
    document.write('<p>observer0.pipe(node => action(node)(2, 0))</p>');
    document.write('<p>observer1.pipe(node => action(node)(0, 2))</p>');
    document.write('<p>observer2.pipe(node => action(node)(0, -2))</p>');
    document.write('<p>observer3.pipe(node => action(node)(-2, 0))</p>');
};
exports.sayhello();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: AK-12
 * @Date: 2018-12-28 20:09:54
 * @Last Modified by: AK-12
 * @Last Modified time: 2019-01-03 11:22:17
 */
/**
 * @export
 * @template T
 * @param {(count: number) => T} func
 * @param {number} [times=1]
 * @returns
 */
function call(func, times) {
    if (times === void 0) { times = 1; }
    var count = 0;
    var result;
    var loop = function () {
        if (count >= times) {
            return result;
        }
        count++;
        result = func(count);
        loop();
        return result;
    };
    return loop();
}
exports.call = call;
/**
 * Rules
 */
var Rules;
(function (Rules) {
    /**
     * @param obj
     */
    Rules.isUndefined = function (obj) {
        return typeof obj === 'undefined';
    };
    /**
     * @param obj
     */
    Rules.isNumber = function (obj) { return typeof obj === 'number'; };
    /**
     * @param obj
     */
    Rules.isFrameProps = function (obj) {
        return typeof obj['delta'] !== 'undefined';
    };
})(Rules = exports.Rules || (exports.Rules = {}));
function schedule(update, props) {
    var frame;
    if (Rules.isUndefined(props)) {
        frame = scheduleUpdateWithUndefined(update);
    }
    else if (Rules.isNumber(props)) {
        frame = scheduleUpdateWithNumber(update, props);
    }
    else if (Rules.isFrameProps(props)) {
        frame = scheduleUpdateWithFrameProps(update, props);
    }
    var unschedule = requestAnimationFrame(frame);
    return function () { return cancelAnimationFrame(unschedule); };
}
exports.schedule = schedule;
/**
 * the delta is const
 *
 * @export
 * @param {Update} update
 * @param {number} delta
 * @returns {Frame}
 */
function scheduleUpdateWithNumber(update, delta) {
    var before = Date.now();
    var frame = function () {
        if (Date.now() - before > delta) {
            before = Date.now();
            update(delta);
        }
        requestAnimationFrame(frame);
    };
    return frame;
}
exports.scheduleUpdateWithNumber = scheduleUpdateWithNumber;
/**
 * the delta can be changed
 *
 * @export
 * @param {Update} update
 * @param {FrameProps} frameProps
 * @returns {Frame}
 */
function scheduleUpdateWithFrameProps(update, frameProps) {
    var before = Date.now();
    var frame = function () {
        if (Date.now() - before > frameProps.delta) {
            before = Date.now();
            update(frameProps.delta);
        }
        requestAnimationFrame(frame);
    };
    return frame;
}
exports.scheduleUpdateWithFrameProps = scheduleUpdateWithFrameProps;
/**
 * the delta is 1/60 second
 *
 * @export
 * @param {Update} update
 * @returns {Frame}
 */
function scheduleUpdateWithUndefined(update) {
    var before = Date.now();
    var frame = function () {
        if (Date.now() - before > 17) {
            before = Date.now();
            update(17);
        }
        requestAnimationFrame(frame);
    };
    return frame;
}
exports.scheduleUpdateWithUndefined = scheduleUpdateWithUndefined;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(5));
__export(__webpack_require__(6));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Rules
 */
var Rules;
(function (Rules) {
    /**
     * @param obj
     */
    Rules.isLabel = function (obj) {
        return obj['type'] === 'Label';
    };
    /**
     * @param obj
     */
    Rules.isLabelPropsArray = function (obj) {
        return Rules.isLabel(obj[0]);
    };
    /**
     * @param obj
     */
    Rules.isNode = function (obj) {
        return obj['type'] === 'Node';
    };
    /**
     * @param obj
     */
    Rules.isNodePropsArray = function (obj) {
        return Rules.isNode(obj[0]);
    };
    /**
     * @param obj
     */
    Rules.isCanvas = function (obj) {
        return typeof obj['getContext'] !== 'undefined';
    };
    /**
     * @param obj
     */
    Rules.isCtx = function (obj) {
        return typeof obj['canvas'] !== 'undefined';
    };
})(Rules = exports.Rules || (exports.Rules = {}));
/**
 * @export
 * @class Canvas
 * @extends {Node}
 * @implements {ICanvas}
 */
var Canvas = /** @class */ (function () {
    /**
     *Creates an instance of Canvas.
     * @param {string} elementId
     * @param {number} MaxWidth
     * @param {number} MaxHeight
     * @memberof Canvas
     */
    function Canvas(elementId, MaxWidth, MaxHeight) {
        var canvas = document.getElementById(elementId);
        if (Rules.isCanvas(canvas)) {
            canvas.width = MaxWidth;
            canvas.height = MaxHeight;
            var ctx = canvas.getContext('2d');
            if (Rules.isCtx(ctx)) {
                this.ctx = ctx;
            }
        }
        else {
            throw 'cannot get canvas element by id: ' + elementId;
        }
    }
    Canvas.prototype.clear = function (rect) {
        if (rect) {
            var x = rect.x, y = rect.y, w = rect.w, h = rect.h;
            this.ctx.clearRect(x, y, w, h);
            return this;
        }
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        return this;
    };
    /**
     * @private
     * @param {INodeProps} props
     * @memberof Canvas
     */
    Canvas.prototype.fillNode = function (props) {
        var x = props.x, y = props.y, w = props.w, h = props.h, color = props.color;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    };
    /**
     * @private
     * @param {ILabelProps} props
     * @memberof Canvas
     */
    Canvas.prototype.fillLabel = function (props) {
        var x = props.x, y = props.y, h = props.h, color = props.color, fontSize = props.fontSize, fontStyle = props.fontStyle, text = props.text;
        this.ctx.font = String(fontSize) + 'px' + ' ' + fontStyle;
        this.ctx.strokeStyle = color;
        this.ctx.strokeText(text, x, y + h);
    };
    Canvas.prototype.draw = function () {
        var _this = this;
        var node = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            node[_i] = arguments[_i];
        }
        if (node.length > 0) {
            if (Rules.isLabelPropsArray(node)) {
                node.forEach(function (l) { return _this.fillLabel(l); });
                return this;
            }
            if (Rules.isNodePropsArray(node)) {
                node.forEach(function (n) { return _this.fillNode(n); });
                return this;
            }
            return this;
        }
        return this;
    };
    return Canvas;
}());
exports.Canvas = Canvas;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @export
 * @class Rect
 * @implements {IRect}
 */
var Rect = /** @class */ (function () {
    /**
     *Creates an instance of Rect.
     * @param {number} w
     * @param {number} h
     * @memberof Rect
     */
    function Rect(w, h) {
        this.x = 0;
        this.y = 0;
        this.w = w;
        this.h = h;
        this.type = 'Rect';
    }
    /**
     * @param {number} x
     * @param {number} y
     * @returns
     * @memberof Rect
     */
    Rect.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    };
    /**
     * @param {number} w
     * @param {number} h
     * @returns
     * @memberof Rect
     */
    Rect.prototype.setSize = function (w, h) {
        this.w = w;
        this.h = h;
        return this;
    };
    return Rect;
}());
exports.Rect = Rect;
/**
 * @export
 * @class Node
 * @extends {Rect}
 * @implements {INode}
 */
var Node = /** @class */ (function (_super) {
    __extends(Node, _super);
    /**
     *Creates an instance of Node.
     * @param {number} w
     * @param {number} h
     * @memberof Node
     */
    function Node(w, h) {
        var _this = _super.call(this, w, h) || this;
        _this.color = '#3a32af';
        _this.type = 'Node';
        return _this;
    }
    /**
     * @param {string} color
     * @returns
     * @memberof Node
     */
    Node.prototype.setColor = function (color) {
        this.color = color;
        return this;
    };
    return Node;
}(Rect));
exports.Node = Node;
/**
 * @export
 * @class Label
 * @extends {Node}
 * @implements {ILabel}
 */
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    /**
     *Creates an instance of Label.
     * @param {string} text
     * @param {number} [fontSize=23]
     * @memberof Label
     */
    function Label(text, fontSize) {
        if (fontSize === void 0) { fontSize = 23; }
        var _this = _super.call(this, text.length * fontSize, fontSize) || this;
        _this.fontStyle = 'serif';
        _this.color = '563a6d';
        _this.text = text;
        _this.fontSize = fontSize;
        _this.type = 'Label';
        return _this;
    }
    /**
     * @param {number} fontSize
     * @returns
     * @memberof Label
     */
    Label.prototype.setFontSize = function (fontSize) {
        this.fontSize = fontSize;
        this.setSize(this.text.length * fontSize, fontSize);
        return this;
    };
    /**
     * @param {string} fontStyle
     * @returns
     * @memberof Label
     */
    Label.prototype.setFontStyle = function (fontStyle) {
        this.fontStyle = fontStyle;
        return this;
    };
    /**
     * @param {string} text
     * @returns
     * @memberof Label
     */
    Label.prototype.setText = function (text) {
        this.text = text;
        return this;
    };
    return Label;
}(Node));
exports.Label = Label;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(8));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: AK-12
 * @Date: 2018-12-29 18:55:04
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-12-29 20:43:30
 */
/**
 * compose
 *
 * @export
 * @template argType
 * @param {...Array<(...args: argType[]) => argType>} funcs
 * @returns
 */
function compose() {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    if (funcs.length === 0) {
        return function (arg) { return arg; };
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce(function (a, b) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return a(b.apply(void 0, args));
    }; });
}
exports.compose = compose;
/**
 * clone
 *
 * @export
 * @template T
 * @param {T} value
 * @returns {T}
 */
function clone(value) {
    return JSON.parse(JSON.stringify(value));
}
exports.clone = clone;
/**
 * Observable
 *
 * @export
 * @class Observable
 * @template T
 */
var Observable = /** @class */ (function () {
    /**
     *Creates an instance of Observable.
     * @param {T} state
     * @memberof Observable
     */
    function Observable(state) {
        this.state = state;
        this.observers = new Array();
    }
    /**
     * subscribe
     *
     * @param {Observer<T>} observer
     * @returns {UnSubscribe<T>}
     * @memberof Observable
     */
    Observable.prototype.subscribe = function (observer) {
        var _this = this;
        this.observers.push(observer);
        return function () {
            return (_this.observers = _this.observers.filter(function (obser) { return obser !== observer; }));
        };
    };
    /**
     * pipe
     *
     * @param {...Array<(...args: T[]) => T>} funcs
     * @memberof Observable
     */
    Observable.prototype.pipe = function () {
        var _this = this;
        var funcs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            funcs[_i] = arguments[_i];
        }
        !(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, compose.apply(void 0, funcs.reverse())(this.state)];
        }); }); })().then(function (state) {
            _this.state = state;
            _this.observers.forEach(function (observer) { return observer(_this.state); });
        });
        return this;
    };
    /**
     * push
     *
     * @param {T} state
     * @memberof Observable
     */
    Observable.prototype.push = function (state) {
        return this.pipe(function () { return clone(state); });
    };
    /**
     * pull
     *
     * @returns {T}
     * @memberof Observable
     */
    Observable.prototype.pull = function () {
        return clone(this.state);
    };
    return Observable;
}());
exports.Observable = Observable;


/***/ })
/******/ ]);