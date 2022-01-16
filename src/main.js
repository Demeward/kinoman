
import UserStatus from './components/user-status.js';
import NavigationMenu from './components/navigation-menu.js';
import SortFilms from './components/filter.js';
import ContentArea from './components/content-area.js';
import FilmCard from './components/film-card.js';
import EmptyFilmsList from './components/no-films-list.js';
import FilmPopup from './components/film-details.js';
import MovieCount from './components/movie-count.js';
import {generateFilmCard} from './mock/film-card-mock.js';
import {generateFilter} from './mock/filter-mock.js';
import {render, RenderPosition, KeyCode} from './utils.js';

const FILM__COUNT = 21;
const FILMS__PER__STEP = 5;
const EXTRA__FILM__COUNT = 2;

const filmCards = [...new Array(FILM__COUNT)].map(() => generateFilmCard());
const filters = generateFilter(filmCards);

const bodyElement = document.querySelector('body');
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

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
    filmCardPopup.getElement().querySelector('.film-details__close-btn').removeEventListener('click', onClickClosePopup);
  }

  const onClickOpenPopup = () => {
     if(bodyElement.querySelector('.film-details')) {
       bodyElement.removeChild(bodyElement.querySelector('.film-details'));
       filmCardPopup.getElement().querySelector('.film-details__close-btn').removeEventListener('click', onClickClosePopup);
       bodyElement.classList.remove('hide-overflow');
     }

     bodyElement.classList.add('hide-overflow');
     bodyElement.appendChild(filmCardPopup.getElement());

     filmCardPopup.getElement().querySelector('.film-details__close-btn').addEventListener('click', onClickClosePopup);
     document.addEventListener('keydown', onEscKeyClosePopup);
  }

  filmCardComponent.getElement().querySelector('.film-card__poster').addEventListener('click', onClickOpenPopup);

  filmCardComponent.getElement().querySelector('.film-card__title').addEventListener('click', onClickOpenPopup);

  filmCardComponent.getElement().querySelector('.film-card__comments').addEventListener('click', onClickOpenPopup);

  render(filmCardContainer, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
}

const renderContentArea = (filmsContainer, films) => {
  if (films.length === 0) {
    render(filmsContainer, new EmptyFilmsList().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  const contentArea = new ContentArea();
  const filmsContainers = contentArea.getElement().querySelectorAll('.films-list__container');
  const filmListElement = filmsContainers[0];
  const topRatedfilmElement = filmsContainers[1];
  const mostCommentedfilmElement = filmsContainers[2];

  render(filmsContainer, contentArea.getElement(), RenderPosition.BEFOREEND);

  films.slice(0, FILMS__PER__STEP).forEach((film) => renderFilmCard(filmListElement, film));

  const loadMoreButton = document.querySelector('.films-list__show-more');

  let showingFilmsCount = FILMS__PER__STEP;

  loadMoreButton.addEventListener('click', () => {
    const prevFilms = showingFilmsCount;
    showingFilmsCount += FILMS__PER__STEP;

    films.slice(prevFilms, showingFilmsCount).forEach((film) => renderFilmCard(filmListElement, film));

    if(showingFilmsCount >= filmCards.length) {
      loadMoreButton.remove();
    }
  })

  const topRatedFilms = films.slice().sort((a, b) => b.filmInfo.rating - a.filmInfo.rating);
  const mostCommentedFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length);

  topRatedFilms.slice(0, EXTRA__FILM__COUNT).forEach((film) => renderFilmCard(topRatedfilmElement, film));

  mostCommentedFilms.slice(0, EXTRA__FILM__COUNT).forEach((film) => renderFilmCard(mostCommentedfilmElement, film));
};

render(headerElement, new UserStatus(filters.alreadyWatched).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new NavigationMenu(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortFilms(filters).getElement(), RenderPosition.BEFOREEND);
renderContentArea(mainElement, filmCards);
render(footerElement, new MovieCount(filmCards).getElement(), RenderPosition.BEFOREEND);
