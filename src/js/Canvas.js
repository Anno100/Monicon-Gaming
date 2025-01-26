"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
class Canvas {
    static create(parent, backgroundColor = 'white') {
        let c = document.createElement('canvas');
        parent.appendChild(c);
        c.style.backgroundColor = backgroundColor;
        c.height = Number(parent.style.height.replace('px', ''));
        c.width = Number(parent.style.width.replace('px', ''));
        return c;
    }
}
exports.Canvas = Canvas;
