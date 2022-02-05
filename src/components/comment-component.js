import AbstractComponent from "./abstract-component.js";
import {encode} from "he";

const createCommentsContainer = (comment) => {
  const {id, date, emotion, authorName, message: currentMessage} = comment;
  const message = encode(currentMessage);

  const formattedDate = formatDate(date);

  return (
    `<li data-id="${id}" class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${authorName}</span>
          <span class="film-details__comment-day">${formattedDate}</span>
          <button data-id="${id}" class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const formatDate = (date) => {
  const moment = require(`moment`);
  const currentDate = new Date();
  let newDate;

  const quantityDays = Math.round(((currentDate.getTime() - date.getTime()) / 86400000));

  if (quantityDays > 7) {
    newDate = moment(date).format(`YYYY/MM/DD HH:mm`);
  } else if (quantityDays > 1) {
    newDate = `${quantityDays} days ago`;
  } else {
    newDate = `Today`;
  }

  return newDate;
};

export default class CommentComponent extends AbstractComponent {
  constructor(comment) {
    super();

    this._comment = comment;
  }

  getTemplate() {
    return createCommentsContainer(this._comment);
  }
}
