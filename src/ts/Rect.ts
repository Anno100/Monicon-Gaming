export class Rect {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    constructor(x:number, y:number, width:number, height:number, color = 'black'){ 
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    overlap(r:Rect){
        return this.x + this.width/2 > r.x - r.width/2 &&
            this.x - this.width/2 < r.x + r.width/2 &&
            this.y + this.height/2 > r.y - r.height/2 &&
            this.y - this.height/2 < r.y + r.height/2
    }
    draw(g:CanvasRenderingContext2D){
        g.fillStyle = this.color;
        g.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
    }
}