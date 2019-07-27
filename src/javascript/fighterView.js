import View from './view';
import { fighterService } from './services/fightersService';

class FighterView extends View {
  constructor(fighter, handleFighterClick, handleFighterCheckboxClick) {
    super();

    this.createFighter(fighter, handleFighterClick, handleFighterCheckboxClick);
  }

  createFighter(fighter, handleFighterClick, handleFighterCheckboxClick) {
    const { _id, name, source } = fighter;
    const checkboxElement = this.createCheckbox(_id);
    const imageElement = this.createImage(source);
    const nameElement = this.createName(name);
    const fighterElement = this.createElement({ tagName: 'div', className: 'fighter' });
    const crossElement = this.createElement({ tagName: 'span', className: 'cross' });
    this.element = this.createElement({ tagName: 'div', className: 'fighter_wrapper' });

    crossElement.addEventListener('click', async() => {
      await fighterService.removeFighter(_id);
    });

    fighterElement.append(imageElement, nameElement);
    fighterElement.addEventListener('click', event => handleFighterClick(event, fighter), false);
    checkboxElement.addEventListener('click', event => handleFighterCheckboxClick(event, fighter), false);
    this.element.append(checkboxElement, crossElement, fighterElement);
  }

  createName(name) {
    const nameElement = this.createElement({ tagName: 'span', className: 'name' });
    nameElement.innerText = name;

    return nameElement;
  }

  createCheckbox(id) {
    const checkboxElement = this.createElement({ tagName: 'input', attributes: { type: 'checkbox', id: id } });

    return checkboxElement;
  }

  createImage(source) {
    const attributes = { src: source };
    const imgElement = this.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });

    return imgElement;
  }
}

export default FighterView;