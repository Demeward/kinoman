import {createElement} from '../utils/render.js';
import {AbstractComponent} from './abstract-component';

const createContentAreaTemplate = () => {
  return (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">

      </div>

    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">

      </div>
    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">

      </div>
    </section>
  </section>`
  )
};

class ContentArea extends AbstractComponent {

  getTemplate() {
    return createContentAreaTemplate();
  }
}

export default ContentArea;
