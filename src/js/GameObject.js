"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObject = void 0;
const Vector2_1 = require("./Vector2");
class GameObject extends Vector2_1.Vector2 {
    constructor(x, y, color) {
        super(x, y);
        this.X = x;
        this.Y = y;
        this.vector = new Vector2_1.Vector2(x, y);
        this.color = color;
    }
}
exports.GameObject = GameObject;
