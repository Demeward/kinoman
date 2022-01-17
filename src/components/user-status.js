import {createElement} from '../utils/render.js';
import {AbstractComponent} from './abstract-component';

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

class UserStatus extends AbstractComponent {
  constructor(moviesWatched) {
    super();

    this._moviesWatched = moviesWatched;
  }

  getTemplate() {
    return createUserStatusTemplate(this._moviesWatched);
  }
}

export default UserStatus;
