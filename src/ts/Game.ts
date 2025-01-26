import { Rect } from "./Rect";


export class Game {
    static isRunning = true;
    g: CanvasRenderingContext2D;
    objects: Rect[] = [];
    static I = setInterval(() => { }, 1);
    I:NodeJS.Timeout;
    Update = () => { };
    Draw = () => {
        this.g.translate(this.g.canvas.width / 2, this.g.canvas.height / 2);
        this.g.fillText('Not implemented', 0, 0);
    };
    constructor(g: CanvasRenderingContext2D, speed = 1) {
        this.g = g;
        this.I = setInterval(() => {
            if(Game.isRunning)this.Update();
            this.Draw();
            //TODO: Delta time
        }, speed);
        
    }

    static run = () => {
        document.querySelector('main')!.innerHTML = 'Game no ready';
    };
}
