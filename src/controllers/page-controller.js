
import MovieController from './movie-controller.js';
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

// const renderFilms = (filmListElement, films, onDataChange) => {
//   return films.map((film) => {
//     const filmController = new MovieController(filmListElement, onDataChange);
//
//     filmController.render(film);
//
//     return filmController;
//   });
// }

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
     this._films = [];
     this._showedFilmsControllers = [];
     this._showingFilmsCount = FILMS__COUNT_ON_START;

     this._noFilmsComponent = new EmptyFilmsList();
     this._showMoreButtonComponent = new ShowMoreButton();
     this._sortComponent = new SortFilms();
     this._contentAreaComponent = null;

     this._onSortTypeChange = this._onSortTypeChange.bind(this);
     this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
     this._onDataChange = this._onDataChange.bind(this);
     this._onViewChange = this._onViewChange.bind(this);
  }

  render(films) {
    this._films = films;
    this._contentAreaComponent = new ContentArea(this._films);
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

    render(filmsContainer, this._contentAreaComponent, RenderPosition.BEFOREEND);

    const newFilms = this._renderFilms(filmListElement, this._films.slice(0, this._showingFilmsCount), this._onDataChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

    this._renderShowMoreButton();

    this._renderTopRatedFilms(this._films);
    this._renderMostCommentedFilms(this._films);
  }

  _renderFilms(filmsList, films) {
     return films.map((film) => {
       const filmController = new MovieController(filmsList, this._onDataChange, this._onViewChange);

       filmController.render(film);

       return filmController;
     });
  }

  _renderTopRatedFilms(films) {
     if(this._contentAreaComponent.getElement().querySelectorAll('.films-list__container')[1]) {
       const topRatedFilmsElement = this._contentAreaComponent.getElement().querySelectorAll('.films-list__container')[1];
       const topRatedFilms = films.slice().sort((a, b) => b.filmInfo.rating - a.filmInfo.rating);

       const newTopRatedFilms = this._renderFilms(topRatedFilmsElement, topRatedFilms.slice(0, EXTRA__FILM__COUNT), this._onDataChange);
       this._showedFilmsControllers = this._showedFilmsControllers.concat(newTopRatedFilms);
     }
  }

  _renderMostCommentedFilms(films) {
     if(this._contentAreaComponent.getElement().querySelectorAll('.films-list__container')[2]) {
       const mostCommentedFilmsElement = this._contentAreaComponent.getElement().querySelectorAll('.films-list__container')[2];
       const mostCommentedFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length);

       const newMostCommentedFilms = this._renderFilms(mostCommentedFilmsElement, mostCommentedFilms.slice(0, EXTRA__FILM__COUNT), this._onDataChange);
       this._showedFilmsControllers = this._showedFilmsControllers.concat(newMostCommentedFilms);
     }
  }

  _renderShowMoreButton() {
    if (this._showingFilmsCount >= this._films.length) {
      return;
    }

    const filmsList = document.querySelector('.films-list');

    render(filmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilms = this._showingFilmsCount;
      const filmListElement = this._contentAreaComponent.getElement().querySelectorAll('.films-list__container')[0];
      this._showingFilmsCount = this._showingFilmsCount + FILMS__PER__STEP;

      const sortedFilms = getSortedFilms(this._films, this._sortComponent.getSortType(), prevFilms, this._showingFilmsCount);

      const newFilms = this._renderFilms(filmListElement, sortedFilms, this._onDataChange);
      this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);

      if(this._showingFilmsCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    })
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = FILMS__PER__STEP;
    const filmListElement = this._contentAreaComponent.getElement().querySelectorAll('.films-list__container')[0];

    const sortedFilms = getSortedFilms(this._films, sortType, 0, this._showingFilmsCount)

    filmListElement.innerHTML = '';
    remove(this._showMoreButtonComponent);

    this._renderFilms(filmListElement, sortedFilms, this._onDataChange);

    if (this._films.length > this._showingFilmsCount){
     this._renderShowMoreButton();;
    }
  }

  _onDataChange(filmController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    filmController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((it) => it._setDefaultView());
  }
}










export default PageController;
