import {createElement} from '../utils.js';

const getUserStatus = (filmsWatched) => {
  if(filmsWatched === 0){
    return '';
  }
  if(filmsWatched <= 10){
    return '<p class="profile__rating">Novice</p>';
  }
  if(filmsWatched <= 20){
    return '<p class="profile__rating">Fan</p>';
  }
  if(filmsWatched >= 21){
    return '<p class="profile__rating">Movie Buff</p>';
  }
}

const createUserStatusTemplate = (filmsWatched) => {
  return (
    `<section class="header__profile profile">
      ${getUserStatus(filmsWatched)}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

class UserStatus {
  constructor(moviesWatched) {
    this._moviesWatched = moviesWatched;
    this._element = null;
  }

  getTemplate() {
    return createUserStatusTemplate(this._moviesWatched);
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

export default UserStatus;
