import {AbstractComponent} from './abstract-component';
import {createElement} from '../utils/render.js';

const createShowMoreButton = () => (
  '<button class="films-list__show-more">Show more</button>'
);

class ShowMoreButton extends AbstractComponent {

  getTemplate() {
    return createShowMoreButton();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', handler);
  }
}

export default ShowMoreButton;
