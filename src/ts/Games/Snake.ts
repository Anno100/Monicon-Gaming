import { Canvas } from '../lib/Canvas';
import { Game } from '../lib/Game';
import { Rect } from '../lib/Rect';

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

const prompt = (message: string) => {
    let p = document.createElement('div');
    p.style.zIndex = '100';
    p.style.position = 'absolute';
    p.style.top = '50%';
    p.style.left = '50%';
    p.style.transform = 'translate(-50%, -50%)';
    p.style.backgroundColor = 'white';
    p.style.padding = '20px';
    p.style.border = '1px solid black';
    p.style.borderRadius = '5px';
    p.innerHTML = message;
    document.body.appendChild(p);

    let input = document.createElement('input');
    input.type = 'text'
    p.appendChild(input);

    Game.isRunning = false;
    input.focus();
    let r = true;
    input.onkeydown = (e) => {
        if (e.key === 'Enter') {
            let v = input.value
            Game.isRunning = true;
            //p.remove();
            return v;
            //TODO prompt nicht gut, bin müde

        }
    }

}

export class Snake extends Game {
    head!: Rect;
    direction!: Direction;
    body: Rect[] = [];
    static highScore: number = 0;
    grid = 20;
    food = new Rect(Infinity, Infinity, this.grid, this.grid, 'red');

    constructor(g: CanvasRenderingContext2D) {
        super(g, 50);
        //this.grid = Number(prompt('Enter grid size'))
        this.initializeGame();
        this.setupControls();
    }

    private initializeGame() {
        this.g.fillStyle = 'black';
        this.g.font = '30px Arial';
        clearInterval(Snake.I);
        this.head = new Rect(0, 0, this.grid, this.grid, 'black');
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
            this.body[i].XY = this.body[i - 1].XY;
        }
    }

    private moveHead() {
        switch (this.direction) {
            case Direction.up: this.head.Y -= this.head.width; break;
            case Direction.down: this.head.Y += this.head.width; break;
            case Direction.left: this.head.X -= this.head.width; break;
            case Direction.right: this.head.X += this.head.width; break;
        }

        if (this.head.X > this.g.canvas.width / 2) this.head.X = -this.g.canvas.width / 2;
        if (this.head.X < -this.g.canvas.width / 2) this.head.X = this.g.canvas.width / 2;
        if (this.head.Y > this.g.canvas.height / 2) this.head.Y = -this.g.canvas.height / 2;
        if (this.head.Y < -this.g.canvas.height / 2) this.head.Y = this.g.canvas.height / 2;
    }

    private checkCollisions() {
        this.body
            .slice(1)
            .forEach(r => {
                if (this.head.overlap(r)) {
                    Snake.highScore = Math.max(Snake.highScore, this.body.length - 1);
                    alert('Game Over');
                    clearInterval(this.I);
                    new Snake(this.g);
                }

            });
    }

    private checkFoodCollision() {
        if (this.food.overlap(this.head)) {
            this.addTail();
            this.respawnFood();

            //TODO sound for food
            let a = new AudioContext();
            for (let index = 0; index < 10; index++) {
                setTimeout(() => {
                    let o = a.createOscillator();
                    o.connect(a.destination);
                    o.frequency.value = 1000 + index * 100;
                    o.start(a.currentTime + 0.04*index);
                    o.stop(a.currentTime + 0.05*(index+1));
                }, index * 100);
                
            }
        }
    }

    addTail = () => {
        let r = new Rect(Infinity, Infinity, this.grid, this.grid, 'black');
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
        /**
         * 
        this.food.x = this.g.canvas.width * (Math.random() - 0.5);
        this.food.y = this.g.canvas.height * (Math.random() - 0.5);
         */
        this.food.XY = Rect.random(-this.g.canvas.width / 2, this.g.canvas.width / 2, -this.g.canvas.height / 2, this.g.canvas.height / 2);
    }

    static run() {
        const mainElement = document.querySelector('main') as HTMLElement;
        let c = Canvas.create(mainElement);
        let g = c.getContext('2d') as CanvasRenderingContext2D;
        g.translate(c.width / 2, c.height / 2);
        new Snake(g);
    }
}
