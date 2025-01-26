"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(g, speed = 1) {
        this.objects = [];
        this.Update = () => { };
        this.Draw = () => {
            this.g.translate(this.g.canvas.width / 2, this.g.canvas.height / 2);
            this.g.fillText('Not implemented', 0, 0);
        };
        this.g = g;
        this.I = setInterval(() => {
            if (Game.isRunning)
                this.Update();
            this.Draw();
            //TODO: Delta time
        }, speed);
    }
}
exports.Game = Game;
Game.isRunning = true;
Game.I = setInterval(() => { }, 1);
Game.run = () => {
    document.querySelector('main').innerHTML = 'Game no ready';
};
