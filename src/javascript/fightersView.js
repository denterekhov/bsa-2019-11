import View from './view';
import FighterView from './fighterView';
import Fight from './fight';
import { fighterService } from './services/fightersService';

class FightersView extends View {
  constructor(fighters) {
    super();
    
    this.handleFighterClick = this.handleFighterClick.bind(this);
    this.handleFighterCheckboxClick = this.handleFighterCheckboxClick.bind(this);
    this.createFighters(fighters);
  }

  fightersDetailsMap = new Map();

  createFighters(fighters) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleFighterClick, this.handleFighterCheckboxClick);
      return fighterView.element;
    });

    this.element = this.createElement({ tagName: 'div', className: 'fighters' });
    this.element.append(...fighterElements);
  }

  async handleFighterClick(event, fighter) {
    await this.checkIfFighterExist(fighter);
    const fighterInfo = this.fightersDetailsMap.get(fighter._id);
    this.showModal(fighterInfo);
  }

  async handleFighterCheckboxClick(event, fighter) {
    await this.checkIfFighterExist(fighter);

    if (this.getCheckedCheckboxLength() === 2) {
      this.setCheckboxStatus(true);
      const checkboxIds = [...document.querySelectorAll('input[type=checkbox]:checked')].map(el => el.id);
      const fightersForFight = [...this.fightersDetailsMap.values()].filter(fighter => checkboxIds.includes(fighter._id));
      const rootElement = document.getElementById('root');
      const buttonElement = this.createElement({ tagName: 'button', className: 'start-fight' });
      buttonElement.innerText = 'FIGHT!';
      const fight = new Fight(fightersForFight);
      buttonElement.addEventListener('click', () => fight.prepareForFight());
      rootElement.after(buttonElement);
    };

    if (this.getCheckedCheckboxLength() === 1) {
      this.setCheckboxStatus(false);
      if (document.querySelector('.start-fight')) document.querySelector('.start-fight').remove();
    };
  }

  getCheckedCheckboxLength() {
    return [...document.querySelectorAll('input[type=checkbox]:checked')].length;
  }

  setCheckboxStatus(status) {
    return [...document.querySelectorAll('input[type=checkbox]:not(:checked)')].forEach(el => el.disabled = status);
  }

  async checkIfFighterExist(fighter) {
    if(!this.fightersDetailsMap.get(fighter._id)) {
      const fullFighterInfo = await fighterService.getFighterById(fighter._id);
      this.fightersDetailsMap.set(fullFighterInfo._id, fullFighterInfo);
    };
  }

  showModal({ _id, name, source, ...charStats}) {
    const overlay = this.createElement({ tagName: 'div', className: 'overlay' });
    const modal = this.createElement({ tagName: 'div', className: 'modal' });
    const headerElement = this.createElement({ tagName: 'h4' });
    headerElement.innerText = name;
    modal.append(headerElement);

    for (const [key, value] of Object.entries(charStats)) {
      const labelElement = this.createElement({ tagName: 'label' });
      const text = document.createTextNode(`${key}:`);
      const inputElement = this.createElement({ tagName: 'input', attributes: { type: 'number', min: '0', name: key, value: value} });
      labelElement.append(text, inputElement);
      modal.append(labelElement);
    }

    const text = document.createTextNode('Save stats');
    const submitElement = this.createElement({ tagName: 'button' });

    submitElement.addEventListener('click', async() => {
      const changedValue = [...modal.querySelectorAll('input')].reduce((acc, el) => {
        acc[el.name] = el.value > 0 ? +el.value : 0;
        return acc;
      }, {});

      const fullNewValue = {
        _id,
        ...changedValue,
        name,
        source
      }

      const responseStatus = await fighterService.updateFighter(fullNewValue);
      if(responseStatus === 'OK') {
        this.fightersDetailsMap.set(_id, fullNewValue);
      }
      overlay.remove();
    });

    submitElement.append(text);
    modal.append(submitElement);
    overlay.append(modal);
    document.body.append(overlay);
  }
}

export default FightersView;