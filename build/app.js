class Catagotchi {
    alive;
    mood;
    energy;
    hunger;
    gameDOM;
    displayMood;
    displayEnergy;
    displayHunger;
    displayStatus;
    lastTickTimeStamp;
    constructor(gameDOM) {
        this.gameDOM = gameDOM;
        this.alive = true;
        this.mood = 10;
        this.energy = 10;
        this.hunger = 0;
        this.getDOMElements();
        this.updateDisplays();
        this.startRunning();
        this.meow();
    }
    meow() {
        if (!this.alive) {
            throw new Error('Dead catagotchi cannot meow. Something is wrong.');
        }
        console.log('meow!');
    }
    updateDisplays() {
        this.displayMood.innerHTML = String(this.mood);
        this.displayHunger.innerHTML = String(this.hunger);
        this.displayEnergy.innerHTML = String(this.energy);
        this.displayStatus.innerHTML = (this.alive === true ? 'Alive' : 'Dead');
    }
    gameTick() {
        if (this.alive) {
            if (this.hunger >= 10 || this.energy < 0) {
                this.catDied();
            }
            this.energy -= (Math.random() > 0.7 ? 1 : 0);
            this.mood -= (Math.random() > 0.4 ? 1 : 0);
            this.hunger += (Math.random() > 0.2 ? 1 : 0);
            this.updateDisplays();
        }
    }
    catDied() {
        this.alive = false;
    }
    feed() {
        this.hunger -= 2;
        this.mood += 1;
        this.meow();
    }
    play() {
        this.mood += 1;
        this.energy -= 2;
        this.hunger += 1;
    }
    sleep() {
        this.energy += 2;
        this.hunger += 1;
        this.mood += 1;
    }
    getDOMElements() {
        this.displayHunger = this.gameDOM.querySelector('#displayHunger');
        this.displayMood = this.gameDOM.querySelector('#displayMood');
        this.displayEnergy = this.gameDOM.querySelector('#displayEnergy');
        this.displayStatus = this.gameDOM.querySelector('#displayStatus');
        this.gameDOM.querySelector('#buttonFeed').addEventListener('click', this.feed.bind(this));
        this.gameDOM.querySelector('#buttonPlay').addEventListener('click', this.play.bind(this));
        this.gameDOM.querySelector('#buttonSleep').addEventListener('click', this.sleep.bind(this));
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
    const catGame = new Catagotchi(document.querySelector('#game'));
};
window.addEventListener('load', init);
//# sourceMappingURL=app.js.map