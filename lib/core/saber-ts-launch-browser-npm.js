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
