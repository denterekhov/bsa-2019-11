import View from './view';
import Fighter from './fighter';
import FightLogo from '../assets/fight.png';
import roundSound from '../assets/audio/round.mp3';
import koSound from '../assets/audio/ko.mp3';
import littleKick from '../assets/audio/little_kick.mp3';
import littlePunch from '../assets/audio/little_punch.mp3';
import bigPunch from '../assets/audio/big_punch.mp3';

class Fight extends View {
  constructor([fighter1, fighter2]) {
    super();
    this.fighter1 = new Fighter(fighter1);
    this.fighter2 = new Fighter(fighter2);
    this.sounds = [littleKick, littlePunch, bigPunch];
  }

  createMeter(fighter, className) {
    const attributes = { 
      min: '0',
      max: fighter.health,
      low: Math.floor(fighter.health / 4),
      high: Math.floor(fighter.health * 0.5),
      optimum: fighter.health,
      value: fighter.health
    };
    const meterElement = this.createElement({
      tagName: 'meter',
      className,
      attributes
    });

    return meterElement;
  }

  playSound(sound) {
    (new Audio(sound)).play();
  }

  playRandomKickSound() {
    const randomSound = Math.floor(Math.random() * this.sounds.length);
    (new Audio(this.sounds[randomSound])).play();
  }

  prepareForFight() {
    [...document.querySelectorAll('input[type=checkbox]')].forEach(el => el.disabled = true);
    document.querySelector('.start-fight').remove();
    const rootElement = document.getElementById('root');
    this.element = this.createElement({ tagName: 'div', className: 'battlefield' });
    const fighter1Wrapper = this.createElement({ tagName: 'div', className: 'fighter1-wrapper' });
    const fighter2Wrapper = this.createElement({ tagName: 'div', className: 'fighter2-wrapper' });

    const fighter1Health = this.createMeter(this.fighter1, 'fighter1-health');
    const fighter1 = this.createElement({ tagName: 'img', className: 'fighter1', attributes: { src: this.fighter1.source } });
    fighter1Wrapper.append(fighter1Health, fighter1);

    const fighter2Health = this.createMeter(this.fighter2, 'fighter2-health');
    const fighter2 = this.createElement({ tagName: 'img', className: 'fighter2', attributes: { src: this.fighter2.source } });
    fighter2Wrapper.append(fighter2Health, fighter2);

    const fightImg = this.createElement({ tagName: 'img', className: 'fightLogo', attributes: { src: FightLogo } });
    this.element.append(fighter1Wrapper, fightImg, fighter2Wrapper);
    rootElement.after(this.element);

    this.playSound(roundSound);

    setTimeout(() => {
      this.startFight();
    }, 2500);
  };

  startFight() {
    if(this.fighter1.health > 0) {
      const fighter1Element = document.querySelector('.fighter1');
      const fighter2Element = document.querySelector('.fighter2');
      const fighter1Health = document.querySelector('.fighter1-health');
      const fighter2Health = document.querySelector('.fighter2-health');
      const fighter2DamageIndicator = this.createElement({ tagName: 'div', className: 'damage-indicator' });

      fighter1Element.classList.add('left-kick');
      fighter2Element.classList.add('damage');
      const fighter2Damage = this.fighter1.getHitPower(this.fighter2);
      fighter2DamageIndicator.innerText = fighter2Damage > 0 ? `-${fighter2Damage}` : 0;
      fighter2Health.after(fighter2DamageIndicator);
      this.playRandomKickSound();
      
      setTimeout(() => {
        fighter2DamageIndicator.remove();
        fighter2Health.value -= fighter2Damage;
        fighter1Element.classList.remove('left-kick');
        fighter2Element.classList.remove('damage');
        
        if(this.fighter2.health > 0) {
          const fighter1DamageIndicator = this.createElement({ tagName: 'div', className: 'damage-indicator' });
          fighter2Element.classList.add('right-kick');
          fighter1Element.classList.add('damage');
          const fighter1Damage = this.fighter2.getHitPower(this.fighter1);
          fighter1DamageIndicator.innerText = fighter1Damage > 0 ? `-${fighter1Damage}` : 0;
          fighter1Health.after(fighter1DamageIndicator);
          this.playRandomKickSound();

          setTimeout(() => {
            fighter1DamageIndicator.remove();
            fighter1Health.value -= fighter1Damage;
            fighter2Element.classList.remove('right-kick');
            fighter1Element.classList.remove('damage');

            this.startFight();
          }, 800);
        } else {
          this.finishFight(this.fighter1);
        }
      }, 800);
    }  else {
      this.finishFight(this.fighter2);
    }
  }

  finishFight(winner) {
    [...document.querySelectorAll('input[type=checkbox]')].forEach(el => el.checked = false);

    const winnerElement = this.createElement({ tagName: 'div', className: 'winner' });
    winnerElement.innerText = `${winner.name} wins!`;
    const fightLogo = document.querySelector('.fightLogo');
    fightLogo.replaceWith(winnerElement);

    this.playSound(koSound);

    setTimeout(() => {
      [...document.querySelectorAll('input[type=checkbox]')].forEach(el => el.disabled = false);
      document.querySelector('.battlefield').remove();
    }, 5000);
  }
}

export default Fight;
