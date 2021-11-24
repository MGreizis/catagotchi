import Cat from './Cat.js';
import KeyListener from './KeyListener.js';
class Catagotchi {
    cat;
    keyListener;
    canvas;
    ctx;
    catImage;
    lastTickTimeStamp;
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.catImage = this.loadNewImage('img/NORMAL CAT.png');
        this.cat = new Cat();
        this.keyListener = new KeyListener();
        this.startRunning();
        this.updateDisplays();
    }
    writeTextToCanvas(text, xCoordinate, yCoordinate, fontSize = 20, color = 'red', alignment = 'center') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    updateDisplays() {
        this.clearScreen();
        this.ctx.drawImage(this.catImage, 100, 0, this.canvas.height / 2, this.canvas.width / 2);
        this.writeTextToCanvas((this.cat.isAlive() ? 'Cat is alive' : 'Cat byebye'), 20, 30, 20, 'blue', 'left');
        this.writeTextToCanvas(`Mood: ${this.cat.getMood()}`, 20, 60, 20, 'green', 'left');
        this.writeTextToCanvas(`Energy: ${this.cat.getEnergy()}`, 20, 90, 20, 'red', 'left');
        this.writeTextToCanvas(`Hunger: ${this.cat.getHunger()}`, 20, 120, 20, 'yellow', 'left');
    }
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);
    }
    gameTick() {
        if (this.cat.isAlive()) {
            this.cat.ignore();
            this.executeUserAction();
            this.updateDisplays();
        }
    }
    executeUserAction() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_F)) {
            this.cat.feed();
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_P)) {
            this.cat.play();
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_S)) {
            this.cat.sleep();
        }
    }
    startRunning() {
        this.lastTickTimeStamp = performance.now();
        requestAnimationFrame(this.step);
    }
    step = (timestamp) => {
        if (timestamp - this.lastTickTimeStamp >= 3000) {
            this.gameTick();
            this.lastTickTimeStamp = timestamp;
        }
        requestAnimationFrame(this.step);
    };
}
const init = () => new Catagotchi(document.querySelector('#canvas'));
window.addEventListener('load', init);
//# sourceMappingURL=app.js.map