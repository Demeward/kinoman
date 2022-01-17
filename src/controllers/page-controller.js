import FilmCard from '../components/film-card.js';
import FilmPopup from '../components/film-details.js';
import ContentArea from '../components/content-area.js';
import EmptyFilmsList from '../components/no-films-list.js';
import ShowMoreButton from '../components/show-more-button.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import {KeyCode} from '../utils.js';


const FILMS__PER__STEP = 5;
const EXTRA__FILM__COUNT = 2;

const bodyElement = document.querySelector('body');

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

class PageController {
  constructor(container) {
     this._container = container;

     this._noFilmsComponent = new EmptyFilmsList();
     this._contentAreaComponent = new ContentArea();
     this._showMoreButtonComponent = new ShowMoreButton();
  }

  render(films) {
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

    films.slice(0, FILMS__PER__STEP).forEach((film) => renderFilmCard(filmListElement, film));

    const filmsList = document.querySelector('.films-list');

    render(filmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    let showingFilmsCount = FILMS__PER__STEP;

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilms = showingFilmsCount;
      showingFilmsCount += FILMS__PER__STEP;

      films.slice(prevFilms, showingFilmsCount).forEach((film) => renderFilmCard(filmListElement, film));

      if(showingFilmsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    })

    const topRatedFilms = films.slice().sort((a, b) => b.filmInfo.rating - a.filmInfo.rating);
    const mostCommentedFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length);

    topRatedFilms.slice(0, EXTRA__FILM__COUNT).forEach((film) => renderFilmCard(topRatedfilmElement, film));

    mostCommentedFilms.slice(0, EXTRA__FILM__COUNT).forEach((film) => renderFilmCard(mostCommentedfilmElement, film));
  }
}










export default PageController
