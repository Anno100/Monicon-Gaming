import { Canvas } from "./Canvas";
import { Game } from "./Game";
import { Rect } from "./Rect";

export class Pong extends Game {
    ball: Rect;
    paddle1: Rect;
    paddle2: Rect;
    score1: number;
    score2: number;
    constructor(g: CanvasRenderingContext2D) {
        super(g);
        this.ball = new Rect(300, 300, 10, 10, 'red');
        this.paddle1 = new Rect(10, 300, 10, 100, 'black');
        this.paddle2 = new Rect(590, 300, 10, 100, 'black');
        this.score1 = 0;
        this.score2 = 0;
    }
    Update = () => {
        this.ball.x += 1;
        this.ball.y += 1;
        if (this.ball.x < 0) {
            this.score2++;
            this.ball.x = 300;
            this.ball.y = 300;
        }
        if (this.ball.x > 600) {
            this.score1++;
            this.ball.x = 300;
            this.ball.y = 300;
        }
    };
    Draw = () => {
        this.g.clearRect(0, 0, this.g.canvas.width, this.g.canvas.height);
        this.ball.draw(this.g);
        this.paddle1.draw(this.g);
        this.paddle2.draw(this.g);
        this.g.fillText(this.score1 + ' - ' + this.score2, 300, 50);
    };
    static run = () => {
        const canvas = Canvas.create(document.querySelector('main') as HTMLElement,'white');
        const g = canvas.getContext('2d') as CanvasRenderingContext2D;
        new Pong(g);
    };
}