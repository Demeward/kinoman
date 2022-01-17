import {createElement} from '../utils/render.js';
import {AbstractComponent} from './abstract-component';

const createFilterTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  )
};

class SortFilms extends AbstractComponent {

    getTemplate() {
      return createFilterTemplate();
    }
}

export default SortFilms;
