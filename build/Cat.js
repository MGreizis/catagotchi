export default class Cat {
    alive;
    mood;
    energy;
    hunger;
    constructor() {
        this.alive = true;
        this.mood = 10;
        this.energy = 10;
        this.hunger = 0;
        this.meow();
    }
    ignore() {
        if (this.getHunger() >= 10 || this.getEnergy() < 0) {
            this.catDied();
        }
        this.energy -= (Math.random() > 0.7 ? 1 : 0);
        this.mood -= (Math.random() > 0.4 ? 1 : 0);
        this.hunger += (Math.random() > 0.2 ? 1 : 0);
    }
    meow() {
        if (!this.alive) {
            throw new Error('Dead catagotchi cannot meow. Something is wrong.');
        }
        console.log('meow!');
    }
    catDied() {
        this.alive = false;
    }
    feed = () => {
        this.hunger -= 2;
        this.mood += 1;
        this.meow();
        console.log('The cat has been fed');
    };
    play = () => {
        this.mood += 1;
        this.energy -= 2;
        this.hunger += 1;
        console.log('The cat has been played with');
    };
    sleep = () => {
        this.energy += 2;
        this.hunger += 1;
        this.mood += 1;
        console.log('The cat has had a good nap');
    };
    getEnergy() {
        return this.energy;
    }
    getHunger() {
        return this.hunger;
    }
    getMood() {
        return this.mood;
    }
    isAlive() {
        return this.alive;
    }
}
//# sourceMappingURL=Cat.js.map