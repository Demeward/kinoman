import SmartAbstractComponent from "./smart-abstract-component.js";

const HREF_PREFIX = `#`;

const createFiltersTemplate = (filterData, activeFilter) => {

  const filterLinks = filterData.map((filter) => {
    const {title, count} = filter;
    const activeClass = activeFilter === title ? `main-navigation__item--active` : ``;
    const quantity = title !== `All movies` ? `<span class="main-navigation__item-count">${count}</span>` : ``;
    return (
      `<a href="#${title}" id="${title}" class="main-navigation__item ${activeClass}">${title} ${quantity}</a>`
    );
  }).join(``);

  return `<div class="main-navigation__items">${filterLinks}</div>`;
};

export default class FilterComponent extends SmartAbstractComponent {
  constructor(filterData) {
    super();
    this._filterData = filterData;
    this._activeFilter = this.checkActiveFilter(filterData);
    this.filterChangeHandler = null;
    this.filterClickHandler = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._filterData, this._activeFilter);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A` || evt.target.parentNode.tagName === `A`) {
        evt.preventDefault();
        const selectedFilter = evt.target.parentNode.tagName === `A` ? evt.target.parentNode.getAttribute(`href`).substring(HREF_PREFIX.length) : evt.target.getAttribute(`href`).substring(HREF_PREFIX.length);
        if (selectedFilter === this._activeFilter) {
          return;
        }
        handler(selectedFilter);
        this._activeFilter = selectedFilter;
        this.reRender(this._filterData);
      }
    });
    this.filterChangeHandler = handler;
  }

  checkActiveFilter(filterData) {
    let activeFilter = ``;

    for (const item of filterData) {
      if (item.isChecked) {
        activeFilter = item.title;
        break;
      }
    }

    return activeFilter;
  }

  setFilterClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
    this.filterClickHandler = handler;
  }

  reRender(filterData) {
    this._filterData = filterData;
    super.reRender();
  }

  recoveryListeners() {
    this.setFilterChangeHandler(this.filterChangeHandler);
    this.setFilterClickHandler(this.filterClickHandler);
  }
}
