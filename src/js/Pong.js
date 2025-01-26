"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pong = void 0;
const Canvas_1 = require("./Canvas");
const Game_1 = require("./Game");
const Rect_1 = require("./Rect");
class Pong extends Game_1.Game {
    constructor(g) {
        super(g);
        this.Update = () => {
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
        this.Draw = () => {
            this.g.clearRect(0, 0, this.g.canvas.width, this.g.canvas.height);
            this.ball.draw(this.g);
            this.paddle1.draw(this.g);
            this.paddle2.draw(this.g);
            this.g.fillText(this.score1 + ' - ' + this.score2, 300, 50);
        };
        this.ball = new Rect_1.Rect(300, 300, 10, 10, 'red');
        this.paddle1 = new Rect_1.Rect(10, 300, 10, 100, 'black');
        this.paddle2 = new Rect_1.Rect(590, 300, 10, 100, 'black');
        this.score1 = 0;
        this.score2 = 0;
    }
}
exports.Pong = Pong;
Pong.run = () => {
    const canvas = Canvas_1.Canvas.create(document.querySelector('main'), 'white');
    const g = canvas.getContext('2d');
    new Pong(g);
};
