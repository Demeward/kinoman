import {getFilteredFilms, FilterTypes} from "./../utils/filter.js";

export default class Movies {
  constructor() {
    this._films = [];
    this._activeFilter = FilterTypes.ALL;
    this._filterChangeHandlers = [];
    this.filmsChangeHandlers = [];
  }

  setFilms(films) {
    this._films = films;
  }

  getFilms() {
    return this._films;
  }

  getFilteredFilms() {
    return getFilteredFilms(this._activeFilter, this._films);
  }

  updateFilm(id, newFilm) {

    if (id === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, id), newFilm, this._films.slice(id + 1));
    this._callHandlers(this.filmsChangeHandlers);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  setFilter(filterType) {
    this._activeFilter = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandlers(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setFilmsChangeHandlers(handler) {
    this.filmsChangeHandlers.push(handler);
  }
}
