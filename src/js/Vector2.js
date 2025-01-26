"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
class Vector2 {
    get X() { return this.x; }
    get Y() { return this.y; }
    set X(x) { this.x = x; }
    set Y(y) { this.y = y; }
    set XY(v) {
        this.x = v.x;
        this.y = v.y;
    }
    get XY() {
        return new Vector2(this.x, this.y);
    }
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    mult(n) {
        return new Vector2(this.x * n, this.y * n);
    }
    div(n) {
        return new Vector2(this.x / n, this.y / n);
    }
    /**
     *
     * @returns Die Länge des Vektors
     */
    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        return this.div(this.mag());
    }
    /**
     *
     * @param max
     * @returns  Ein neuer Vektor, der maximal die Länge max hat
     */
    limit(max) {
        if (this.mag() > max) {
            return this.normalize().mult(max);
        }
        return this;
    }
    drawFromCenter(g) {
        g.beginPath();
        g.moveTo(0, 0);
        g.lineTo(this.x, this.y);
        g.stroke();
    }
    static random(startX = -1, endX = 1, startY = -1, endY = 1) {
        return new Vector2(Math.random() * (endX - startX) + startX, Math.random() * (endY - startY) + startY);
    }
    static fromAngle(angle) {
        return new Vector2(Math.cos(angle), Math.sin(angle));
    }
}
exports.Vector2 = Vector2;
