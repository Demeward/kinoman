import {createElement} from '../utils/render.js';
import {AbstractComponent} from './abstract-component';

const createTopRatedFilmsTemplate = (films) => {
  if(films.some(film => film.filmInfo.rating !== 0)) {
    return (
      `<section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>

        <div class="films-list__container">

        </div>
      </section>`
    )
  }

  else {
    return '';
  }
}

const createMostCommentedFilmsTemplate = (films) => {
  if(films.some(film => film.comments.length !== 0)) {
    return (
      `<section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>

        <div class="films-list__container">

        </div>
      </section>`
    )
  }

  else {
    return '';
  }
}

const createContentAreaTemplate = (films) => {
  return (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">

      </div>

    </section>

    ${createTopRatedFilmsTemplate(films)}

    ${createMostCommentedFilmsTemplate(films)}
  </section>`
  )
};

class ContentArea extends AbstractComponent {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createContentAreaTemplate(this._films);
  }
}

export default ContentArea;
