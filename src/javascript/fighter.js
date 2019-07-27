import { getRandomChance } from './helpers/getRandom';

class Fighter {
  constructor({name, health, attack, defense, source}) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.source = source;
  }

  getHitPower(enemy) {
    const power = this.attack * getRandomChance();
    const damage = enemy.setDamage(power);
    return damage > 0 ? damage : 0;
  }

  getBlockPower() {
    const power = this.defense * getRandomChance();
    return power;
  }

  setDamage(power) {
    const damage = Math.floor(power - this.getBlockPower());
    this.health -= damage > 0 ? damage : 0;
    return damage;
  }
}

export default Fighter;
