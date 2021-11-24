import Cat from './Cat.js';
import KeyListener from './KeyListener.js';

class Catagotchi {
  private cat: Cat;

  private keyListener: KeyListener;

  private readonly canvas : HTMLCanvasElement;

  private readonly ctx : CanvasRenderingContext2D;

  private catImage : HTMLImageElement;

  private lastTickTimeStamp : number;

  /**
   * Creates the Catagotchi game. Sets all of the attributes of the
   * cat (mood, hunger, sleep, aliveness) to their default states.
   * Once set, the DOM elements will be gathered and updated.
   * Finally, the cat will meow to indicate that it is indeed alive!
   *
   * @param canvas pass the DOM element where the game will run.
   */
  constructor(canvas : HTMLCanvasElement) {
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

  private writeTextToCanvas(
    text: string,
    xCoordinate: number,
    yCoordinate: number,
    fontSize = 20,
    color = 'red',
    alignment: CanvasTextAlign = 'center',
  ) {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }

  // eslint-disable-next-line class-methods-use-this
  private loadNewImage(source: string) : HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }

  private updateDisplays() {
    this.clearScreen();

    this.ctx.drawImage(this.catImage, 100, 0, this.canvas.height / 2, this.canvas.width / 2);

    this.writeTextToCanvas((this.cat.isAlive() ? 'Cat is alive' : 'Cat byebye'), 20, 30, 20, 'blue', 'left');
    this.writeTextToCanvas(`Mood: ${this.cat.getMood()}`, 20, 60, 20, 'green', 'left');
    this.writeTextToCanvas(`Energy: ${this.cat.getEnergy()}`, 20, 90, 20, 'red', 'left');
    this.writeTextToCanvas(`Hunger: ${this.cat.getHunger()}`, 20, 120, 20, 'yellow', 'left');
  }

  private clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);
  }

  /**
   * Called for every game tick. Updates attributes.
   * TODO: currently called from outside the current class. Make the game tick internal?
   * TODO: move the update of attributes to its own function.
   */
  public gameTick() {
    if (this.cat.isAlive()) {
      this.cat.ignore();
      this.executeUserAction();
      this.updateDisplays();
    }
  }

  private executeUserAction() {
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

  /**
   * Start the automatic updating process of this object
   */
  private startRunning() {
    // Set the last tick timestamp to current time
    this.lastTickTimeStamp = performance.now();
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
  }

  /**
   * This MUST be an arrow method in order to keep the `this` variable working
   * correctly. It will otherwise be overwritten by another object caused by
   * javascript scoping behaviour.
   *
   * @param timestamp a `DOMHighResTimeStamp` similar to the one returned by
   *   `performance.now()`, indicating the point in time when `requestAnimationFrame()`
   *   starts to execute callback functions
   */
  private step = (timestamp: number) => {
    // Check if it is time to perform the next Tick
    if (timestamp - this.lastTickTimeStamp >= 3000) {
      // Call the method of this object that needs to be called
      this.gameTick();
      this.lastTickTimeStamp = timestamp;
    }
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
  };
}

/**
 * Actually start the game
 *
 * @returns nothing
 */
const init = () => new Catagotchi(document.querySelector('#canvas'));

window.addEventListener('load', init);
