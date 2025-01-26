export class Vector2 {
    private x: number;
    private y: number;
    get X() {return this.x;}
    get Y() {return this.y;}
    set X(x: number) { this.x = x; }
    set Y(y: number) { this.y = y; }

    set XY(v: Vector2) {
        this.x = v.x;
        this.y = v.y;
    }
    get XY() {
        return new Vector2(this.x, this.y);
    }

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    add(v: Vector2) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    sub(v: Vector2) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    mult(n: number) {
        return new Vector2(this.x * n, this.y * n);
    }
    div(n: number) {
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
    limit(max: number) {
        if (this.mag() > max) {
            return this.normalize().mult(max);
        }
        return this;
    }

    drawFromCenter(g: CanvasRenderingContext2D) {
        g.beginPath();
        g.moveTo(0, 0);
        g.lineTo(this.x, this.y);
        g.stroke();
    }

    static random(startX = -1, endX = 1, startY = -1, endY = 1) {
        return new Vector2(Math.random() * (endX - startX) + startX, Math.random() * (endY - startY) + startY);
    }
    static fromAngle(angle: number) {
        return new Vector2(Math.cos(angle), Math.sin(angle));
    }

    
}
