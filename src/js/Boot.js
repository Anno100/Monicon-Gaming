"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Boot = void 0;
const Snake_1 = require("./Games/Snake");
const Pong_1 = require("./Games/Pong");
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    organization: "org-TJoOUxRmtt4VOQPMAif2sJB8",
    project: "$PROJECT_ID",
});
const openGame = (game) => {
    switch (game) {
        case 'Snake':
            Snake_1.Snake.run();
            break;
        case 'Pong':
            Pong_1.Pong.run();
            break;
        default: console.log('Game not found');
    }
};
class Boot {
    constructor() {
        document.body.style.height = (window.innerHeight - 50) + 'px';
        document.body.style.width = (window.innerWidth - 50) + 'px';
        document.querySelector('main').style.height = (window.innerHeight - 50) + 'px';
        document.querySelector('main').style.width = (window.innerWidth - 50) + 'px';
        document.querySelectorAll('navbar').forEach(e => {
            if (e.classList.contains('exit')) {
                let exit = document.createElement('button');
                exit.className = 'Exit';
                exit.innerHTML = 'x';
                exit.onclick = () => window.close();
                e.appendChild(exit);
            }
        });
        /**Set up navbuttons */
        Array.from(document.querySelectorAll('navbar button'))
            .filter(e => !e.classList.contains('Exit'))
            .map(e => e)
            .forEach(e => {
            e.onclick = () => {
                document.querySelector('main').innerHTML = '';
                openGame(e.innerHTML);
            };
        });
        Snake_1.Snake.run();
    }
}
exports.Boot = Boot;
