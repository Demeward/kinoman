import {createElement} from '../utils/render.js';
import {AbstractComponent} from './abstract-component';

const createEmptyFilmsListTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>
    </section>`
  )
}

class EmptyFilmsList extends AbstractComponent  {

  getTemplate() {
    return createEmptyFilmsListTemplate();
  }
}

export default EmptyFilmsList;
