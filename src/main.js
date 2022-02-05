import {FILMS_COUNT} from "./constants";
import UserProfileComponent from "./components/user-profile-component.js";
import MenuComponent from "./components/menu-component.js";
import FilmsBoardComponent from "./components/films-board-component.js";
import StatisticsComponent from "./components/statistics-component";
import StatisticCounterComponent from "./components/statistic-counter-component.js";
import {generateUserProfile} from "./mock/user-profile.js";
import {generateFilms} from "./mock/film.js";
import {render} from "./utils/render.js";
import PageController from "./controllers/page.js";
import FilterController from "./controllers/filter";
import Movies from "./models/movies";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooterStatisticElement = document.querySelector(`.footer__statistics`);

const userProfile = generateUserProfile();

const movies = new Movies();
movies.setFilms(generateFilms(FILMS_COUNT));

render(siteHeaderElement, new UserProfileComponent(userProfile));

const statisticsComponent = new StatisticsComponent(movies);
const menuComponent = new MenuComponent();
const filterController = new FilterController(menuComponent.getElement(), movies);
render(siteMainElement, menuComponent);
filterController.render();

const boardComponent = new FilmsBoardComponent();
render(siteMainElement, boardComponent);

const pageController = new PageController(boardComponent, movies);
pageController.render();

menuComponent.setOnChangeHandler((menuItem) => {
  switch (menuItem) {
    case `stats`:
      statisticsComponent.show();
      pageController.hide();
      break;
    default:
      statisticsComponent.hide();
      pageController.show();
  }
});

render(siteMainElement, statisticsComponent);
statisticsComponent.hide();

render(siteFooterStatisticElement, new StatisticCounterComponent());
