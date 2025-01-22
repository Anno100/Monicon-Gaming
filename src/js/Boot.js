"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Boot = void 0;
class Boot {
    constructor() {
        document.body.querySelectorAll('hello').forEach(e => {
            e.innerHTML = 'Hello World';
        });
        document.body.querySelectorAll('navbar').forEach(e => {
        });
    }
}
exports.Boot = Boot;
