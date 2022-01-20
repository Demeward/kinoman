import PageController from './controllers/page-controller.js';
import UserStatus from './components/user-status.js';
import NavigationMenu from './components/navigation-menu.js';
import MovieCount from './components/movie-count.js';
import {generateFilmCard} from './mock/film-card-mock.js';
import {generateFilter} from './mock/filter-mock.js';
import {render, remove, RenderPosition} from './utils/render.js';

const FILM__COUNT = 21;
const FILMS__PER__STEP = 5;
const EXTRA__FILM__COUNT = 2;

const filmCards = [...new Array(FILM__COUNT)].map(() => generateFilmCard());
const filters = generateFilter(filmCards);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');

const pageController = new PageController(mainElement);

render(headerElement, new UserStatus(filters.alreadyWatched), RenderPosition.BEFOREEND);
render(mainElement, new NavigationMenu(filters), RenderPosition.BEFOREEND);
pageController.render(filmCards);
render(footerStats, new MovieCount(filmCards), RenderPosition.BEFOREEND);
