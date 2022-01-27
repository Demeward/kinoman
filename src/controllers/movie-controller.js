import FilmCard from '../components/film-card.js';
import FilmPopup from '../components/film-details.js';
import {render, remove, replace, RenderPosition} from '../utils/render.js';
import {KeyCode} from '../utils.js';

class MovieController {
  constructor(container, onDataChange, onViewChange) {
     this._container = container;
     this._onDataChange = onDataChange;
     this._onViewChange = onViewChange;

     this._filmComponent = null;
     this._filmPopupComponent = null;

     this._onEscKeyClosePopup = this._onEscKeyClosePopup.bind(this);
     this._onClickClosePopup = this._onClickClosePopup.bind(this);
  }

  render(film) {
     const oldFilmComponent = this._filmComponent;
     const oldFilmPopupComponent = this._filmPopupComponent;
     const containerElement = this._container;
     this._bodyElement = document.querySelector(`body`);
     this._filmComponent = new FilmCard(film);
     this._filmPopupComponent = new FilmPopup(film);
     this._createFilmDataChangeHandlers(film);

     this._filmComponent.setClickHandler(() => {
        this._onViewChange();
        document.addEventListener('keydown', this._onEscKeyClosePopup);
        this._createFilmPopupDataChangeHandlers(film);
        render(this._bodyElement, this._filmPopupComponent, RenderPosition.BEFOREEND);
        this._bodyElement.classList.add('hide-overflow');
      });

     if (!oldFilmComponent && !oldFilmPopupComponent) {
      render(containerElement, this._filmComponent, RenderPosition.BEFOREEND);
    } else {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmPopupComponent, oldFilmPopupComponent);
      this._createFilmPopupDataChangeHandlers(film);
    }
}

  _createFilmDataChangeHandlers(film) {
    const watchlistClickHandler = this._createButtonClickHandler(film, {
     isWatchlist: !film.isWatchlist,
   });

    const watchedClickHandler = this._createButtonClickHandler(film, {
     isAlreadyWatched: !film.isAlreadyWatched,
   });

    const favoriteClickHandler = this._createButtonClickHandler(film, {
     isFavorite: !film.isFavorite,
   });

    this._filmComponent.setWatchlistClickHandler(watchlistClickHandler);
    this._filmComponent.setWatchedClickHandler(watchedClickHandler);
    this._filmComponent.setFavoriteClickHandler(favoriteClickHandler);
  }

  _createFilmPopupDataChangeHandlers(film) {
    const watchlistClickHandler = this._createButtonClickHandler(film, {
     isWatchlist: !film.isWatchlist,
   });

    const watchedClickHandler = this._createButtonClickHandler(film, {
     isAlreadyWatched: !film.isAlreadyWatched,
   });

    const favoriteClickHandler = this._createButtonClickHandler(film, {
     isFavorite: !film.isFavorite,
   });

   this._filmPopupComponent.setWatchlistClickHandler(watchlistClickHandler);
   this._filmPopupComponent.setWatchedClickHandler(watchedClickHandler);
   this._filmPopupComponent.setFavoriteClickHandler(favoriteClickHandler);
   this._filmPopupComponent.setClickHandler(this._onClickClosePopup);
   this._filmPopupComponent._subscribeOnEvents();
  }

  _onEscKeyClosePopup(evt) {
    if (evt.key === KeyCode.ESCAPE) {
      evt.preventDefault();
      this._onClickClosePopup();
    }
  }

  _onClickClosePopup() {
    this._bodyElement.classList.remove('hide-overflow');
    remove(this._filmPopupComponent);
    document.removeEventListener('keydown', this._onEscKeyClosePopup);
  }

  _setDefaultView() {
    this._onClickClosePopup();
  }

  _createButtonClickHandler(film, changedData) {
    return (evt) => {
      evt.preventDefault();

      this._onDataChange(this, film, Object.assign({}, film, changedData));
    }
  }
}

export default MovieController
