import {PREVIEW_IMAGES, FILM_NAMES, DIRECTORS, WRITERS, ACTORS, COUNTRIES, GENRES, DESCRIPTIONS_CONTENT} from "../constants.js";
import {generateRandomDate} from "./comments";
import {getRandomNumber, getRandomItem, getRandomItems} from "../utils/common";

const generatePreviewImage = (key) => {
  return PREVIEW_IMAGES[key];
};

const generateName = (key) => {
  return FILM_NAMES[key];
};

const generateRating = () => {
  return (Math.random() * 10).toFixed(1);
};

const generateTime = () => {
  return {
    hour: getRandomNumber(1, 2),
    minutes: getRandomNumber(1, 60)
  };
};

const generateFilm = (currentElement, index) => {
  const key = getRandomNumber(0, 6);

  return {
    id: index,
    previewImage: generatePreviewImage(key),
    fullImage: generatePreviewImage(key),
    name: generateName(key),
    originalName: generateName(key),
    rating: generateRating(),
    director: getRandomItem(DIRECTORS),
    writers: getRandomItem(WRITERS),
    actors: getRandomItems(ACTORS, getRandomNumber(1, ACTORS.length)),
    releaseDate: generateRandomDate(),
    runtime: generateTime(),
    country: getRandomItem(COUNTRIES),
    genres: getRandomItems(GENRES, getRandomNumber(1, GENRES.length)),
    description: getRandomItems(DESCRIPTIONS_CONTENT, getRandomNumber(1, 5)),
    ratingAge: getRandomNumber(0, 18),
    isWatchlist: Math.random() < 0.5,
    isAlreadyWatched: Math.random() < 0.5,
    isFavorite: Math.random() < 0.5,
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};
