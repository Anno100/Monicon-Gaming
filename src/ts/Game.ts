import { Rect } from "./Rect";


export class Game {
    g: CanvasRenderingContext2D;
    objects: Rect[] = [];
    Update = () => { };
    Draw = () => {
        this.g.translate(this.g.canvas.width / 2, this.g.canvas.height / 2);
        this.g.fillText('Not implemented', 0, 0);
    };
    static I: NodeJS.Timeout = setInterval(() => { }, 1);
    constructor(g: CanvasRenderingContext2D, speed = 1) {
        this.g = g;
        clearInterval(Game.I);
        setInterval(() => {
            this.Update();
            this.Draw();
        }, speed);
    }

    static run = () => {
        document.querySelector('main')!.innerHTML = 'Game no ready';
    };
}
