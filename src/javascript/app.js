import View from './view';
import FightersView from './fightersView';
import { fighterService } from './services/fightersService';
import nanoid from 'nanoid';

class App extends View {
  constructor() {
    super();

    this.startApp();
  }

  static rootElement = document.getElementById('root');
  static loadingElement = document.getElementById('loading-overlay');

  async startApp() {
    try {
      App.loadingElement.style.visibility = 'visible';
      
      const fighters = await fighterService.getFighters();
      const fightersView = new FightersView(fighters);
      const fightersElement = fightersView.element;

      const buttonElement = this.createElement({ tagName: 'button', className: 'new-fighter' });
      buttonElement.innerText = 'Create new fighter';
      buttonElement.addEventListener('click', () => this.showModal(), false);


      App.rootElement.append(fightersElement, buttonElement);
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = 'Failed to load data';
    } finally {
      App.loadingElement.style.visibility = 'hidden';
    }
  }

  showModal() {
    const overlay = this.createElement({ tagName: 'div', className: 'overlay' });
    const modal = this.createElement({ tagName: 'div', className: 'modal' });
  
    const formElement = this.createElement({ tagName: 'form' });

    const labelNameElement = this.createElement({ tagName: 'label', attributes: { for: 'fighterName' } });
    labelNameElement.innerText = 'Name:';
    const inputNameElement = this.createElement({ tagName: 'input', attributes: { id: 'fighterName', type: 'text', maxlength: '20', name: 'name' } });

    const labelHealthElement = this.createElement({ tagName: 'label', attributes: { for: 'fighterHealth' } });
    labelHealthElement.innerText = 'Health:';
    const inputHealthElement = this.createElement({ tagName: 'input', attributes: { id: 'fighterHealth', type: 'number', min: '0', name: 'health' } });

    const labelAttackElement = this.createElement({ tagName: 'label', attributes: { for: 'fighterAttack' } });
    labelAttackElement.innerText = 'Attack:';
    const inputAttackElement = this.createElement({ tagName: 'input', attributes: { id: 'fighterAttack', type: 'number', min: '0', name: 'attack' } });

    const labelDefenseElement = this.createElement({ tagName: 'label', attributes: { for: 'fighterDefense' } });
    labelDefenseElement.innerText = 'Defense:';
    const inputDefenseElement = this.createElement({ tagName: 'input', attributes: { id: 'fighterDefense', type: 'number', min: '0', name: 'defense' } });

    const labelImageElement = this.createElement({ tagName: 'label', attributes: { for: 'fighterImage' } });
    labelImageElement.innerText = 'Avatar:';
    const inputImageElement = this.createElement({ tagName: 'input', attributes: { id: 'fighterImage', type: 'url', pattern: '^https?:\/\/.+\.(?:png|jpe?g|svg|gif)$', name: 'source' } });
    
    const submitElement = this.createElement({ tagName: 'button', attributes: { type: 'submit' } });
    submitElement.innerText = 'Create fighter';

    [inputNameElement, inputHealthElement, inputAttackElement, inputDefenseElement, inputImageElement].forEach(el => el.required = true);
    
    submitElement.addEventListener('click', async(e) => {
      if (modal.querySelector('form').checkValidity()) {
        const newFighter = [...modal.querySelectorAll('input')].reduce((acc, el) => {
          acc[el.name] = parseInt(el.value) ? +el.value : el.value;
          return acc;
        }, {_id: nanoid()});
        
        e.preventDefault();
        const responseStatus = await fighterService.createFighter(newFighter);

        overlay.remove();
      } 
    });
  
    formElement.append(labelNameElement, inputNameElement, labelHealthElement, inputHealthElement, labelAttackElement, inputAttackElement, labelDefenseElement, inputDefenseElement, labelImageElement, inputImageElement, submitElement);
    modal.append(formElement);
    overlay.append(modal);
    document.body.append(overlay);
  }
}

export default App;
