import { Canvas } from './Canvas';
import { Game } from './Game';
import { Rect } from './Rect';

enum Direction {
    left,
    right,
    up,
    down
}

enum Control {
    ArrowUp = 'ArrowUp',
    ArrowLeft = 'ArrowLeft',
    ArrowDown = 'ArrowDown',
    ArrowRight = 'ArrowRight',
    w = 'w',
    a = 'a',
    s = 's',
    d = 'd'
}

class Snake_Rect extends Rect {
    constructor(x: number, y: number) {
        super(x, y, 10, 10, 'black');
    }
}

export class Snake extends Game {
    head!: Snake_Rect;
    direction!: Direction;
    body: Rect[] = [];
    food = new Rect(Infinity, Infinity, 10, 10, 'red');
    static highScore: number = 0;

    constructor(g: CanvasRenderingContext2D) {
        super(g, 50);
        this.initializeGame();
        this.setupControls();
    }

    private initializeGame() {
        this.g.fillStyle = 'black';
        this.g.font = '30px Arial';
        clearInterval(Snake.I);
        this.head = new Snake_Rect(0, 0);
        this.objects.push(this.head);
        this.body = [this.head];
        this.respawnFood();
        this.objects.push(this.food);
        this.direction = Direction.right;
    }

    private setupControls() {
        document.body.onkeydown = (e) => {
            switch (e.key) {
                case Control.ArrowUp:
                case Control.w: if (this.direction !== Direction.down) this.direction = Direction.up; break;
                case Control.ArrowLeft:
                case Control.a: if (this.direction !== Direction.right) this.direction = Direction.left; break;
                case Control.ArrowDown:
                case Control.s: if (this.direction !== Direction.up) this.direction = Direction.down; break;
                case Control.ArrowRight:
                case Control.d: if (this.direction !== Direction.left) this.direction = Direction.right; break;
            }
        };
    }

    Update = () => {
        this.moveBody();
        this.moveHead();
        this.checkCollisions();
        this.checkFoodCollision();
    }

    private moveBody() {
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
    }

    private moveHead() {
        switch (this.direction) {
            case Direction.up: this.head.y -= this.head.width; break;
            case Direction.down: this.head.y += this.head.width; break;
            case Direction.left: this.head.x -= this.head.width; break;
            case Direction.right: this.head.x += this.head.width; break;
        }

        if (this.head.x > this.g.canvas.width / 2) this.head.x = -this.g.canvas.width / 2;
        if (this.head.x < -this.g.canvas.width / 2) this.head.x = this.g.canvas.width / 2;
        if (this.head.y > this.g.canvas.height / 2) this.head.y = -this.g.canvas.height / 2;
        if (this.head.y < -this.g.canvas.height / 2) this.head.y = this.g.canvas.height / 2;
    }

    private checkCollisions() {
        this.body
            .slice(1)
            .forEach(r => {
                if (this.head.overlap(r)) {
                    Snake.highScore = Math.max(Snake.highScore, this.body.length - 1);
                    alert('Game Over');
                    new Snake(this.g);
                }

            });
    }

    private checkFoodCollision() {
        if (this.food.overlap(this.head)) {
            this.addTail();
            this.respawnFood();
        }
    }

    addTail = () => {
        let r = new Snake_Rect(-Infinity, -Infinity);
        this.body.push(r);
        this.objects.push(r);
    }

    Draw = () => {
        this.g.clearRect(-this.g.canvas.width / 2, -this.g.canvas.height / 2, this.g.canvas.width, this.g.canvas.height);
        this.objects.forEach(o => o.draw(this.g));
        this.g.fillStyle = 'black';
        this.g.font = '30px Arial';
        this.g.fillText('Score: ' + (this.body.length - 1), -this.g.canvas.width / 2 + 10, -this.g.canvas.height / 2 + 30);
        this.g.fillText('High Score: ' + Snake.highScore, -this.g.canvas.width / 2 + 10, -this.g.canvas.height / 2 + 60);
    }

    private respawnFood = () => {
        this.food.x = this.g.canvas.width * (Math.random() - 0.5);
        this.food.y = this.g.canvas.height * (Math.random() - 0.5);
    }

    static run() {
        const mainElement = document.querySelector('main') as HTMLElement;
        let c = Canvas.create(mainElement);
        let g = c.getContext('2d') as CanvasRenderingContext2D;
        g.translate(c.width / 2, c.height / 2);
        new Snake(g);
    }
}
