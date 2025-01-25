"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snake = void 0;
const Rect_1 = require("./Rect");
var Direction;
(function (Direction) {
    Direction[Direction["left"] = 0] = "left";
    Direction[Direction["right"] = 1] = "right";
    Direction[Direction["up"] = 2] = "up";
    Direction[Direction["down"] = 3] = "down";
})(Direction || (Direction = {}));
class Snake_Rect extends Rect_1.Rect {
    constructor(x, y) {
        super(x, y, 10, 10, 'black');
    }
}
let I;
let Objects = [];
class Snake {
    constructor(g) {
        this.g = g;
        this.g.fillStyle = 'black';
        this.length = 1;
        this.head = new Snake_Rect(0, 0);
        Objects.push(this.head);
        this.body = [this.head];
        let food = new Rect_1.Rect(300, 300, 10, 10, 'red');
        Objects.push(food);
        this.direction = Direction.right;
        document.body.onkeydown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                    if (this.direction != Direction.down)
                        this.direction = Direction.up;
                    break;
                case 'ArrowLeft':
                case 'a':
                    if (this.direction != Direction.right)
                        this.direction = Direction.left;
                    break;
                case 'ArrowDown':
                case 's':
                    if (this.direction != Direction.up)
                        this.direction = Direction.down;
                    break;
                case 'ArrowRight':
                case 'd':
                    if (this.direction != Direction.left)
                        this.direction = Direction.right;
                    break;
            }
        };
        I = setInterval(() => {
            for (let i = this.body.length - 1; i > 0; i--) {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }
            switch (this.direction) {
                case Direction.up:
                    this.head.y -= this.head.width;
                    break;
                case Direction.down:
                    this.head.y += this.head.width;
                    break;
                case Direction.left:
                    this.head.x -= this.head.width;
                    break;
                case Direction.right:
                    this.head.x += this.head.width;
                    break;
            }
            if (this.head.x > this.g.canvas.width / 2)
                this.head.x = -this.g.canvas.width / 2;
            if (this.head.x < -this.g.canvas.width / 2)
                this.head.x = this.g.canvas.width / 2;
            if (this.head.y > this.g.canvas.height / 2)
                this.head.y = -this.g.canvas.height / 2;
            if (this.head.y < -this.g.canvas.height / 2)
                this.head.y = this.g.canvas.height / 2;
            for (let i = 1; i < this.body.length; i++) {
                if (this.head.overlap(this.body[i])) {
                    Snake.highScore = Math.max(Snake.highScore, this.length - 1);
                    this.length = 1;
                    alert('Game Over');
                    Snake.run();
                }
            }
            if (food.overlap(this.head)) {
                this.length++;
                let r = new Snake_Rect(-Infinity, -Infinity);
                this.body.push(r);
                Objects.push(r);
                food.x = this.g.canvas.width * (Math.random() - 0.5);
                food.y = this.g.canvas.height * (Math.random() - 0.5);
            }
            this.g.clearRect(-this.g.canvas.width / 2, -this.g.canvas.height / 2, this.g.canvas.width, this.g.canvas.height);
            Objects.forEach(o => o.draw(this.g));
            this.g.fillStyle = 'black';
            this.g.font = '30px Arial';
            this.g.fillText('Score: ' + (this.length - 1), -this.g.canvas.width / 2 + 10, -this.g.canvas.height / 2 + 30);
            this.g.fillText('High Score: ' + Snake.highScore, -this.g.canvas.width / 2 + 10, -this.g.canvas.height / 2 + 60);
            console.log(this.body);
        }, 50);
    }
    static run() {
        const mainElement = document.querySelector('main');
        mainElement.innerHTML = '';
        clearInterval(I);
        Objects = [];
        let c = createFittingCanvas(mainElement);
        let g = c.getContext('2d');
        g.translate(c.width / 2, c.height / 2);
        new Snake(g);
    }
}
exports.Snake = Snake;
Snake.highScore = 0;
function createFittingCanvas(parent, backgroundColor = 'white') {
    let c = document.createElement('canvas');
    parent.appendChild(c);
    c.style.backgroundColor = backgroundColor;
    c.height = Number(parent.style.height.replace('px', ''));
    c.width = Number(parent.style.width.replace('px', ''));
    return c;
}
