
import {createUserStatusTemplate} from './components/user-status.js';
import {createNavigationTemplate} from './components/navigation-menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createContentAreaTemplate} from './components/content-area.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createFilmDetailsPopupTemplate} from './components/film-details.js';
import {createTotalMovieCountTemplate} from './components/movie-count.js';
import {generateFilmCard} from './mock/film-card-mock.js';
import {generateFilter} from './mock/filter-mock.js';

const FILM__COUNT = 21;
const FILMS__PER__STEP = 5;
const EXTRA__FILM__COUNT = 2;

const filmCards = [...new Array(FILM__COUNT)].map(() => generateFilmCard());
const filters = generateFilter(filmCards);

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const topRatedFilms = filmCards.slice().sort((a, b) => b.filmInfo.rating - a.filmInfo.rating);

const mostCommentedFilms = filmCards.slice().sort((a, b) => b.comments.length - a.comments.length);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer')


render(headerElement, createUserStatusTemplate(filters.alreadyWatched), 'beforeend');
render(mainElement, createNavigationTemplate(filters), 'beforeend');
render(mainElement, createFilterTemplate(filters), 'beforeend');
render(mainElement, createContentAreaTemplate(), 'beforeend');
render(footerElement, createTotalMovieCountTemplate(filmCards), 'beforeend');
render(footerElement, createFilmDetailsPopupTemplate(filmCards[0]), 'afterend');

const filmListElement = document.querySelectorAll('.films-list__container')[0];
const topRatedfilmsElement = document.querySelectorAll('.films-list__container')[1];
const mostCommentedfilmsElement = document.querySelectorAll('.films-list__container')[2];

filmCards.slice(0, FILMS__PER__STEP).forEach((film) => render(filmListElement, createFilmCardTemplate(film), 'beforeend'));

topRatedFilms.slice(0, EXTRA__FILM__COUNT).forEach((film) => render(topRatedfilmsElement, createFilmCardTemplate(film), 'beforeend'));

mostCommentedFilms.slice(0, EXTRA__FILM__COUNT).forEach((film) => render(mostCommentedfilmsElement, createFilmCardTemplate(film), 'beforeend'));

const loadMoreButton = document.querySelector('.films-list__show-more');

let showingFilmsCount = FILMS__PER__STEP;

loadMoreButton.addEventListener('click', () => {
  const prevFilms = showingFilmsCount;
  showingFilmsCount += FILMS__PER__STEP;

  filmCards.slice(prevFilms, showingFilmsCount).forEach((film) => render(filmListElement, createFilmCardTemplate(film), 'beforeend'));

  if(showingFilmsCount >= filmCards.length) {
    loadMoreButton.remove();
  }
})
