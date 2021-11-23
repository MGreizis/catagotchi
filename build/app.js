import Cat from './Cat.js';
class Game {
    cat;
    gameDOM;
    displayMood;
    displayEnergy;
    displayHunger;
    displayStatus;
    lastTickTimeStamp;
    constructor(gameDOM) {
        this.gameDOM = gameDOM;
        this.cat = new Cat();
        this.getDOMElements();
        this.updateDisplays();
        this.startRunning();
    }
    updateDisplays() {
        this.displayMood.innerHTML = String(this.cat.getMood());
        this.displayHunger.innerHTML = String(this.cat.getHunger());
        this.displayEnergy.innerHTML = String(this.cat.getEnergy());
        this.displayStatus.innerHTML = (this.cat.isAlive() === true ? 'Alive' : 'Dead');
    }
    gameTick() {
        if (this.cat.isAlive()) {
            this.cat.ignore();
            this.updateDisplays();
        }
    }
    getDOMElements() {
        this.displayHunger = this.gameDOM.querySelector('#displayHunger');
        this.displayMood = this.gameDOM.querySelector('#displayMood');
        this.displayEnergy = this.gameDOM.querySelector('#displayEnergy');
        this.displayStatus = this.gameDOM.querySelector('#displayStatus');
        this.gameDOM.querySelector('#buttonFeed').addEventListener('click', this.cat.feed.bind(this));
        this.gameDOM.querySelector('#buttonPlay').addEventListener('click', this.cat.play.bind(this));
        this.gameDOM.querySelector('#buttonSleep').addEventListener('click', this.cat.sleep.bind(this));
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
const init = () => {
    const catGame = new Game(document.querySelector('#game'));
};
window.addEventListener('load', init);
//# sourceMappingURL=app.js.map