import {createElement} from '../utils/render.js';
import {AbstractComponent} from './abstract-component';

const createTotalMovieCountTemplate = (totalFilms) => {
  return (
    `<p>${totalFilms.length} movies inside</p>`
  )
};

class MovieCount extends AbstractComponent {
  constructor(totalFilms) {
    super();

    this._totalFilms = totalFilms;
  }

  getTemplate() {
    return createTotalMovieCountTemplate(this._totalFilms);
  }
}

export default MovieCount;
