import dayjs from 'dayjs';
import {createElement} from '../utils/render.js';
import {AbstractSmartComponent} from './abstract-smart-component';

const createCommentMarkup = (comment) => {

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-sleeping">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${getCommentDateFormat(comment.date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  )
}

const getCommentDateFormat = (date) => {
  const moment = require(`moment`);
  const currentDate = new Date();
  let oldDate = new Date(date);
  let newDate;

  const days = Math.floor(((currentDate.getTime() - oldDate.getTime()) / 1000));

  if (days > 7) {
    newDate = moment(date).format(`YYYY/MM/DD HH:mm`);
  } else if (days > 1) {
    newDate = `${days} days ago`;
  } else {
    newDate = `Today`;
  }
  return newDate;
}

const createComments = (comments) => {
  const allComments = comments.map((comment) => createCommentMarkup(comment)).join(' ');
  return (
    `<ul class="film-details__comments-list">
     ${allComments}
    </ul>`
  )
}

const createEmotion = (emotion) => {
  const newMarkUp = `<img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}"></img>`;
  const markUp = emotion ? newMarkUp : ``;

  return markUp;
}

const getRuntime = (runtime) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
}

const getUserDetailsPopup = (userDetails) => {
  if (userDetails) {
    return 'checked';
  }
};

const getGenres = (genres) => genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(' ');
const getPeople = (people) => people.map((person) => person).join(' ');

const createFilmDetailsPopupTemplate = (film, options = {}) => {
  const {emotion} = options;
  const moment = require(`moment`);
  const formattedReleaseDate = moment(film.filmInfo.release.date).format(`YYYY`);

  return (
  `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${film.filmInfo.poster}" alt="">

            <p class="film-details__age">${film.filmInfo.ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${film.filmInfo.title}</h3>
                <p class="film-details__title-original">${film.filmInfo.alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${film.filmInfo.rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${film.filmInfo.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${getPeople(film.filmInfo.writers)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${getPeople(film.filmInfo.actors)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${formattedReleaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${getRuntime(film.filmInfo.runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${film.filmInfo.release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${getGenres(film.filmInfo.genre)}
              </tr>
            </table>

            <p class="film-details__film-description">
              The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${getUserDetailsPopup(film.isWatchlist)}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${getUserDetailsPopup(film.isAlreadyWatched)}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${getUserDetailsPopup(film.isFavorite)}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

          ${createComments(film.comments)}

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label">${createEmotion(emotion)}</div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`
  )
};

class FilmPopup extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._emotion = null;
    this._setCloseBtnHandler = null;
    this._setFavoriteHandler = null;
    this._setWatchlistHandler = null;
    this._setWatchedHandler = null;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsPopupTemplate(this._film, {
      emotion: this._emotion
    });
  }

  recoveryListeners() {
    this.setClickHandler(this._setCloseBtnHandler);
    this.setFavoriteClickHandler(this._setFavoriteHandler);
    this.setWatchlistClickHandler(this._setWatchlistHandler);
    this.setWatchedClickHandler(this._setWatchedHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  _subscribeOnEvents() {
    const emotionButtons = this.getElement().querySelectorAll('.film-details__emoji-item');

    emotionButtons.forEach((emojiLabel) => {
      emojiLabel.addEventListener('change', (evt) => {
        const emotion = evt.target.value;
        createEmotion(emotion);

        this._emotion = emotion;

        this.rerender();
      });
    });
  }

  setClickHandler(handler) {
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', handler);
    this._setCloseBtnHandler = handler;
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector('#favorite').addEventListener('click', handler);
    this._setFavoriteHandler = handler;
  }

  setWatchlistClickHandler(handler) {
    this.getElement().querySelector('#watchlist').addEventListener('click', handler);
    this._setWatchlistHandler = handler;
  }

  setWatchedClickHandler(handler) {
    this.getElement().querySelector('#watched').addEventListener('click', handler);
    this._setWatchedHandler = handler;
  }
}

export default FilmPopup;
