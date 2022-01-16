import {createElement} from '../utils.js';

const createTotalMovieCountTemplate = (totalFilms) => {
  return (
    `<section class="footer__statistics">
      <p>${totalFilms.length} movies inside</p>
    </section>`
  )
};

class MovieCount {
  constructor(totalFilms) {
    this._totalFilms = totalFilms;
    this._element = null;
  }

  getTemplate() {
    return createTotalMovieCountTemplate(this._totalFilms);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default MovieCount;
