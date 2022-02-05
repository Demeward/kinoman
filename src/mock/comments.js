import {EMOTIONS, COMMENTATOR_NAMES, COMMENTS_CONTENT} from "../constants.js";
import {getRandomItem, getRandomNumber} from "../utils/common";

export const generateRandomDate = () => {
  const start = new Date(`2016-03-16`).getTime();
  const end = new Date(`2020-04-21`).getTime();
  const randomDate = new Date((Math.random() * (end - start)) + start);

  return randomDate;
};

const generateComment = (currentElement, index) => {
  return {
    id: index,
    date: generateRandomDate(),
    emotion: getRandomItem(EMOTIONS),
    authorName: getRandomItem(COMMENTATOR_NAMES),
    message: getRandomItem(COMMENTS_CONTENT),
  };
};

const generateComments = () => {
  const count = getRandomNumber(1, 5);

  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
