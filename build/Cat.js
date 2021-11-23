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
    feed() {
        this.hunger -= 2;
        this.mood += 1;
        console.log('Cat has been fed');
    }
    play() {
        this.mood += 1;
        this.energy -= 2;
        this.hunger += 1;
        console.log('Cat has been played with');
    }
    sleep() {
        this.energy += 2;
        this.hunger += 1;
        this.mood += 1;
        console.log('Cat has had a good nap');
    }
    isAlive() {
        return this.alive;
    }
    getMood() {
        return this.mood;
    }
    getEnergy() {
        return this.energy;
    }
    getHunger() {
        return this.hunger;
    }
}
//# sourceMappingURL=Cat.js.map