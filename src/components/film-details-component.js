import {formatDescription, formatRunTime} from "./film-card-component.js";
import SmartAbstractComponent from "./smart-abstract-component";
import CommentComponent from "./comment-component";
import Comment from "../models/comment";
import {EMOTIONS, COMMENTATOR_NAMES} from "../constants";
import {getRandomItem} from "../utils/common";

const createEmotionMarkup = (emotion, isEmojiChecked) => {
  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="smile" ${isEmojiChecked ? `checked` : ``}>
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>`
  );
};

const createEmotionTemplate = (checkedEmotion) => {
  return EMOTIONS.map((it) => createEmotionMarkup(it, it === checkedEmotion)).join(``);
};

const createEmotionImageMarkup = (emotion) => {
  const newMarkUp = `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}"></img>`;
  const markUp = emotion ? newMarkUp : ``;

  return markUp;
};

const createFilmDetailsTemplate = (film, comments, options = {}) => {
  const {fullImage, name, originalName, rating, director, writers, actors, releaseDate, runtime, country, genres, description, ratingAge} = film;
  const {emotion, message} = options;

  const moment = require(`moment`);
  const formattedRunTime = formatRunTime(runtime);
  const genreBlock = genres
    .map((genre) => createGenresBlock(genre))
    .join(``);

  const formattedReleaseDate = moment(releaseDate).format(`DD MMMM YYYY`);
  const formattedDescription = formatDescription(description);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${fullImage}" alt="${name}">

              <p class="film-details__age">${ratingAge}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${originalName}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formattedReleaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formattedRunTime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genreBlock}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${formattedDescription}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${film.isWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${film.isAlreadyWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${film.isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
            <ul class="film-details__comments-list">
                   ${commentsList(comments)}
            </ul>
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                 ${createEmotionImageMarkup(emotion)}
              </div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${message ? message : ``}</textarea>
              </label>
              <div class="film-details__emoji-list">
                ${createEmotionTemplate(emotion)}
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

const commentsList = (comments) => {
  return comments
    .map((comment) => new CommentComponent(comment).getTemplate())
    .join(``);
};

const createGenresBlock = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

export default class FilmDetailsComponent extends SmartAbstractComponent {
  constructor(film, comments) {
    super();

    this._film = film;
    this._emotion = null;
    this._comments = comments;
    this._newCommentMessage = null;
    this._deletingButtonId = null;
    this._setRemoveCommentClickHandler = null;
    this._setNewCommentSubmitHandler = null;
    this.setEmotionClickHandler();
    this._onCommentsChange = this._onCommentsChange.bind(this);
    this._comments.setDataChangeHandler(this._onCommentsChange);
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, this._comments.getComments(), {
      emotion: this._emotion,
      message: this._newCommentMessage,
    });
  }

  setCloseButtonClickHandler(handler) {
    const filmDetailsCloseBtnElement = this.getElement().querySelector(`.film-details__close-btn`);
    filmDetailsCloseBtnElement.addEventListener(`click`, handler);
    this._setCloseBtnHandler = handler;
  }

  setWatchListButtonClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, handler);
    this._setWatchListHandler = handler;
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, handler);
    this._setWatchedHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, handler);
    this._setFavorite = handler;
  }

  setRemoveCommentClickHandler(handler) {
    Array.from(this.getElement()
      .querySelectorAll(`.film-details__comment-delete`))
      .forEach((comment) => {
        comment.addEventListener(`click`, (evt) => {
          evt.preventDefault();

          const commentId = evt.target.dataset.id;
          handler(commentId);
        });
      });

    this._setRemoveCommentClickHandler = handler;
  }

  setDeletingButton(id) {
    this._deletingButtonId = id;
    this._comments.setRemoveComment(id);

    this.reRender();
  }

  setNewCommentSubmitHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, (evt) => {
        this._newCommentMessage = evt.target.value;
      });

    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, (evt) => {
        if (evt.keyCode === 13 && (evt.ctrlKey || evt.metaKey)) {
          if (this._emotion && this._newCommentMessage) {

            const newCommentData = this._createNewComment(this._newCommentMessage, this._emotion);

            const newComment = new Comment(newCommentData);
            handler(newComment);
          }
        }
      });

    this._setNewCommentSubmitHandler = handler;
  }

  setEmotionClickHandler() {
    Array.from(this.getElement()
      .querySelectorAll(`.film-details__emoji-label`))
      .forEach((emojiLabel) => {
        emojiLabel.addEventListener(`click`, (evt) => {
          evt.preventDefault();

          const emotion = emojiLabel.getAttribute(`for`).substring(`emoji-`.length);

          createEmotionImageMarkup(emotion);
          this._emotion = emotion;

          this.reRender();

          const inputField = this.getElement().querySelector(`.film-details__comment-input`);
          inputField.focus();
          inputField.selectionStart = inputField.value.length;
        });
      });
  }

   _createNewComment(message, emotion) {
    const currentCommentId = this._comments.getComments().length;
    const currentRandomAuthor = getRandomItem(COMMENTATOR_NAMES);

    return {
      id: currentCommentId,
      date: new Date(),
      emotion,
      authorName: currentRandomAuthor,
      message,
    };
  }

  reRender() {
    super.reRender();
  }

  disable() {
    this.getElement().querySelector(`.film-details__inner`).setAttribute(`disabled`, `disabled`);
    this.getElement().querySelector(`.film-details__comment-input`).setAttribute(`disabled`, `disabled`);
  }

  enable() {
    this.getElement().querySelector(`.film-details__inner`).removeAttribute(`disabled`);
    this.getElement().querySelector(`.film-details__comment-input`).removeAttribute(`disabled`);
  }

  _clearNewComment() {
    this._emotion = null;
    this._newCommentMessage = null;
  }

  _onCommentsChange() {
    this._clearNewComment();
    this.reRender();
  }

  recoveryListeners() {
    this.setRemoveCommentClickHandler(this._setRemoveCommentClickHandler);
    this.setCloseButtonClickHandler(this._setCloseBtnHandler);
    this.setWatchListButtonClickHandler(this._setWatchListHandler);
    this.setWatchedButtonClickHandler(this._setWatchedHandler);
    this.setFavoriteButtonClickHandler(this._setFavorite);
    this.setNewCommentSubmitHandler(this._setNewCommentSubmitHandler);
    this.setEmotionClickHandler();
  }
}
