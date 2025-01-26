import { GameObject } from "./GameObject";

export class Rect extends GameObject{
    width: number;
    height: number;
    constructor(x:number=Infinity, y:number=Infinity, width:number=0, height:number=0, color = 'black'){ 
        super(x,y,color)
        this.width = width;
        this.height = height;
    }
    overlap(r:Rect){
        return this.X + this.width/2 > r.X - r.width/2 &&
            this.X - this.width/2 < r.X + r.width/2 &&
            this.Y + this.height/2 > r.Y - r.height/2 &&
            this.Y - this.height/2 < r.Y + r.height/2
    }
    draw(g:CanvasRenderingContext2D){
        g.fillStyle = this.color;
        g.fillRect(this.X-this.width/2, this.Y-this.height/2, this.width, this.height);
    }
}