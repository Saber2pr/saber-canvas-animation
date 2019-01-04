"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./core/saber-ts-launch-browser-npm"));
var saber_interval_1 = require("saber-interval");
var saber_canvas_1 = require("saber-canvas");
var saber_observable_1 = require("saber-observable");
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
