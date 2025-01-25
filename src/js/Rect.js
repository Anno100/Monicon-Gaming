"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
class Rect {
    constructor(x, y, width, height, color = 'black') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    overlap(r) {
        return this.x + this.width / 2 > r.x - r.width / 2 &&
            this.x - this.width / 2 < r.x + r.width / 2 &&
            this.y + this.height / 2 > r.y - r.height / 2 &&
            this.y - this.height / 2 < r.y + r.height / 2;
    }
    draw(g) {
        g.fillStyle = this.color;
        g.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}
exports.Rect = Rect;
