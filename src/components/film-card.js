import dayjs from 'dayjs';
import {createElement} from '../utils/render.js';
import {AbstractComponent} from './abstract-component';

const getUserDetails = (userDetails) => {
  if (userDetails) {
    return 'film-card__controls-item--active';
  }
};

const createFilmCardTemplate = (film) => {
  const {comments, filmInfo: {title, poster, description, rating, runtime, release : {date, releaseCountry}, genre: [firstGenre]}, userDetails} = film;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${dayjs(date).year()}</span>
        <span class="film-card__duration">${runtime}m</span>
        <span class="film-card__genre">${firstGenre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getUserDetails(userDetails.isWatchlist)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getUserDetails(userDetails.isAlreadyWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${getUserDetails(userDetails.isFavorite)}">Mark as favorite</button>
      </form>
    </article>`
  )
};

class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setClickHandler(handler) {
    this.getElement().querySelectorAll('.film-card__poster, .film-card__title, .film-card__comments')
     .forEach((element) => {
       element.addEventListener('click', handler);
     })
  }
}

export default FilmCard;
