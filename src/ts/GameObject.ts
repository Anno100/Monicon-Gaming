import { Vector2 } from "./Vector2";

export class GameObject extends Vector2 {
    color: string;
    vector: Vector2;
    constructor(x: number, y: number, color: string) {
        super(x,y);
        this.X = x;
        this.Y = y;
        this.vector = new Vector2(x,y);
        this.color = color;
    }
}
