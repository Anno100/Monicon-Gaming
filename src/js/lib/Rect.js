"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
const GameObject_1 = require("./GameObject");
class Rect extends GameObject_1.GameObject {
    constructor(x = Infinity, y = Infinity, width = 0, height = 0, color = 'black') {
        super(x, y, color);
        this.width = width;
        this.height = height;
    }
    overlap(r) {
        return this.X + this.width / 2 > r.X - r.width / 2 &&
            this.X - this.width / 2 < r.X + r.width / 2 &&
            this.Y + this.height / 2 > r.Y - r.height / 2 &&
            this.Y - this.height / 2 < r.Y + r.height / 2;
    }
    draw(g) {
        g.fillStyle = this.color;
        g.fillRect(this.X - this.width / 2, this.Y - this.height / 2, this.width, this.height);
    }
}
exports.Rect = Rect;
