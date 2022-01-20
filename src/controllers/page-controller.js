import FilmCard from '../components/film-card.js';
import FilmPopup from '../components/film-details.js';
import ContentArea from '../components/content-area.js';
import EmptyFilmsList from '../components/no-films-list.js';
import ShowMoreButton from '../components/show-more-button.js';
import {SortFilms, SortType} from '../components/filter.js';

import {render, remove, RenderPosition} from '../utils/render.js';
import {KeyCode} from '../utils.js';


const FILMS__PER__STEP = 5;
const FILMS__COUNT_ON_START = 5;
const EXTRA__FILM__COUNT = 2;

const bodyElement = document.querySelector('body');
const mainElement = document.querySelector('main');

const renderFilmCard = (filmCardContainer, filmCard) => {
  const filmCardComponent = new FilmCard(filmCard);
  const filmCardPopup = new FilmPopup(filmCard);

  const onEscKeyClosePopup = (evt) => {
    if (evt.key === KeyCode.ESCAPE) {
      evt.preventDefault();
      onClickClosePopup();
      document.removeEventListener('keydown', onEscKeyClosePopup);
    }
  }

  const onClickClosePopup = () => {
    bodyElement.removeChild(bodyElement.querySelector('.film-details'));
    bodyElement.classList.remove('hide-overflow');
    filmCardPopup.removeClickHandler(onClickClosePopup);
  }

  const onClickOpenPopup = () => {
     if(bodyElement.querySelector('.film-details')) {
       bodyElement.removeChild(bodyElement.querySelector('.film-details'));
       filmCardPopup.removeClickHandler(onClickClosePopup);
       bodyElement.classList.remove('hide-overflow');
     }

     bodyElement.classList.add('hide-overflow');
     bodyElement.appendChild(filmCardPopup.getElement());

     filmCardPopup.setClickHandler(onClickClosePopup);
     document.addEventListener('keydown', onEscKeyClosePopup);
  }

  filmCardComponent.setClickHandler(onClickOpenPopup);

  render(filmCardContainer, filmCardComponent, RenderPosition.BEFOREEND);
}

const renderFilms = (filmListElement, films) => {
  films.forEach((film) => {
    renderFilmCard(filmListElement, film);
  });
}

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE: {
      sortedFilms = showingFilms.sort((a, b) => b.filmInfo.release.date - a.filmInfo.release.date);
      break;
    }

    case SortType.RATING: {
      sortedFilms = showingFilms.sort((a, b) => b.filmInfo.rating - a.filmInfo.rating);
      break;
    }

    case SortType.DEFAULT: {
      sortedFilms = showingFilms;
      break;
    }
  }

  return sortedFilms.slice(from, to);
}

class PageController {
  constructor(container) {
     this._container = container;

     this._noFilmsComponent = new EmptyFilmsList();
     this._contentAreaComponent = new ContentArea();
     this._showMoreButtonComponent = new ShowMoreButton();
     this._sortComponent = new SortFilms();
  }

  render(films) {
    render(mainElement, this._sortComponent, RenderPosition.BEFOREEND);

    const filmsContainer = this._container;

    if (films.length === 0) {
      render(filmsContainer, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    const filmsContainers = this._contentAreaComponent.getElement().querySelectorAll('.films-list__container');
    const filmListElement = filmsContainers[0];
    const topRatedfilmElement = filmsContainers[1];
    const mostCommentedfilmElement = filmsContainers[2];
    let showingFilmsCount = FILMS__COUNT_ON_START;

    render(filmsContainer, this._contentAreaComponent, RenderPosition.BEFOREEND);

    renderFilms(filmListElement, films.slice(0, showingFilmsCount));

    const renderShowMoreButton = () => {
      if (showingFilmsCount >= films.length) {
        return;
      }

      const filmsList = document.querySelector('.films-list');

      render(filmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevFilms = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + FILMS__PER__STEP;

        const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevFilms, showingFilmsCount);

        renderFilms(filmListElement, sortedFilms);

        if(showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      })
    }

    renderShowMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingFilmsCount = FILMS__PER__STEP;

      const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount)

      filmListElement.innerHTML = '';
      remove(this._showMoreButtonComponent);

      renderFilms(filmListElement, sortedFilms);

      if (films.length > showingFilmsCount){
       renderShowMoreButton();;
      }

    })

    const topRatedFilms = films.slice().sort((a, b) => b.filmInfo.rating - a.filmInfo.rating);
    const mostCommentedFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length);

    renderFilms(topRatedfilmElement, topRatedFilms.slice(0, EXTRA__FILM__COUNT));

    renderFilms(mostCommentedfilmElement, mostCommentedFilms.slice(0, EXTRA__FILM__COUNT));
  }
}










export default PageController
