export default class Cat {
  private alive: boolean;

  private mood: number;

  private energy: number;

  private hunger: number;

  /**
   * Constructor for the Cat class. Sets the default attributes for the cat
   * (mood, hunger, energy levels and aliveness).
   */
  constructor() {
    this.alive = true;
    this.mood = 10;
    this.energy = 10;
    this.hunger = 0;

    this.meow();
  }

  /**
   * Call when the cat is ignored, decreasing its general health
   */
  public ignore(): void {
    this.energy -= (Math.random() > 0.7 ? 1 : 0);
    this.mood -= (Math.random() > 0.4 ? 1 : 0);
    this.hunger += (Math.random() > 0.2 ? 1 : 0);
  }

  /**
   * Meow says the cat.
   * Not accessible directly, but is used as a response by certain actions.
   * TODO: Add some sound effects
   */
  private meow() {
    if (!this.alive) {
      throw new Error('Dead catagotchi cannot meow. Something is wrong.');
    }
    console.log('meow!');
  }

  /**
   * Poor catagotchi died.
   */
  public catDied(): void {
    this.alive = false;
  }

  /**
   * Feed the Catagotchi. Will improve mood and reduce hunger.
   */
  public feed(): void {
    this.hunger -= 2;
    this.mood += 1;
    // this.meow();
    console.log('Cat has been fed');
  }

  /**
   * Play with the Catagotchi. It does make Catagotchi sleepy, though.
   */
  public play(): void {
    this.mood += 1;
    this.energy -= 2;
    this.hunger += 1;
    console.log('Cat has been played with');
  }

  /**
   * Ask Catagotchi to sleeeeep. Improved mood and energy, but makes it hungry too.
   */
  public sleep(): void {
    this.energy += 2;
    this.hunger += 1;
    this.mood += 1;
    console.log('Cat has had a good nap');
  }

  /**
   * Function that returns if the cat is alive
   *
   * @returns alive
   */
  public isAlive(): boolean {
    return this.alive;
  }

  /**
   * Function that returns the mood of the cat
   *
   * @returns mood
   */
  public getMood(): number {
    return this.mood;
  }

  /**
   * Function that returns the energy of the cat
   *
   * @returns energy
   */
  public getEnergy(): number {
    return this.energy;
  }

  /**
   * Function that returns the hunger of the cat
   *
   * @returns hunger
   */
  public getHunger(): number {
    return this.hunger;
  }
}
