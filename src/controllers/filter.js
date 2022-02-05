import {render} from "./../utils/render.js";
import {getFilteredFilms, FilterTypes} from "./../utils/filter.js";
import FilterComponent from "../components/filter-component.js";

export default class FilterController {
  constructor(container, movies) {
    this._container = container;
    this._movies = movies;
    this._activeFilter = FilterTypes.ALL;
    this._filterComponent = null;

    this.onFilterChange = this.onFilterChange.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this._movies.setFilmsChangeHandlers(this.onDataChange);
  }

  render() {
    const filterData = this._generateFilterData();

    this._filterComponent = new FilterComponent(filterData);
    render(this._container, this._filterComponent, `afterbegin`);

    this._filterComponent.setFilterChangeHandler(this.onFilterChange);
  }

  _generateFilterData() {
    const films = this._movies.getFilms();
    const filterData = Object.values(FilterTypes).map((filter) => {
      return {
        title: filter,
        count: getFilteredFilms(filter, films).length,
        isChecked: filter === this._activeFilter,
      };
    });

    return filterData;
  }

  onFilterChange(filterType) {
    this._activeFilter = filterType;
    this._movies.setFilter(filterType);
  }

  onDataChange() {
    const filterData = this._generateFilterData();
    this._filterComponent.reRender(filterData);
  }
}
