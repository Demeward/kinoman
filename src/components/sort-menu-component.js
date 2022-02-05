import AbstractComponent from "./abstract-component.js";

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const createSortMenuTemplate = () => {
  return (
    `<ul class="sort">
        <li><a href="#" data-sort-by="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" data-sort-by="${SortType.DATE}" class="sort__button">Sort by date</a></li>
        <li><a href="#" data-sort-by="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class SortMenuComponent extends AbstractComponent {
  constructor() {
    super();

    this._sortType = SortType.DEFAULT;
    this._callback = null;
  }

  getTemplate() {
    return createSortMenuTemplate();
  }

  _addEventListener(callback) {
    const element = this.getElement();

    element.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const activeButton = element.querySelector(`.sort__button--active`);
      activeButton.classList.remove(`sort__button--active`);
      evt.target.classList.add(`sort__button--active`);

      const sortType = evt.target.dataset.sortBy;

      if (this._sortType !== sortType) {
        this._sortType = sortType;
        callback(this._sortType);
      }
    });
  }

  setSortingCallback(callback) {
    if (callback) {
      this._addEventListener(callback);
    }
  }

  clearSortMenu() {
    const activeButton = this.getElement().querySelector(`.sort__button--active`);
    activeButton.classList.remove(`sort__button--active`);
    this.getElement().querySelector(`.sort__button`).classList.add(`sort__button--active`);
    this._sortType = SortType.DEFAULT;
  }
}
