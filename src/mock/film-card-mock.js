import dayjs from 'dayjs';

const filmTitles = ['Made for Each Other', 'Popeye the Sailor Meets Sindbad the Sailor', 'Sagebrush Trail', 'The Dance of Life', 'The Man with the Golden Arm', 'The Great Flamarion', 'Santa Claus Conquers the Martians'];


const filmPosters = ['made-for-each-other.png', 'popeye-meets-sinbad.png', 'sagebrush-trail.jpg', 'santa-claus-conquers-the-martians.jpg', 'the-dance-of-life.jpg', 'the-great-flamarion.jpg', 'the-man-with-the-golden-arm.jpg'];

const filmDescriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'];

const MAX_DESCRIPTION_LENGTH = 5;

const commentEmotions = ['smile', 'sleeping', 'puke', 'angry'];


function getRandomInt (min, max){
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];


const getRandomLengthArray = (array, maxLength) => {
  const arr = new Array(getRandomInt(1, maxLength));
  for (let index = 0; index < arr.length; index++) {
    let value = getRandomArrayElement(array);
    while (arr.indexOf(value) >= 0) {
      value = getRandomArrayElement(array);
    }
    arr[index] = value;
  }
  return arr.join(' ');
};

const generateComment = () => {
  return {
    id: getRandomInt(0, 100),
    author: 'Ilya O`Reilly',
    comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    date: '2019-05-11T16:12:32.554',
    emotion: getRandomArrayElement(commentEmotions),
  }
}

const generateFilmCard = () => {
  return {
    id: getRandomInt(0, 100),
    comments: [...new Array(getRandomInt(0, 5))].map(() => generateComment()),
    filmInfo: {
      title: getRandomArrayElement(filmTitles),
      alternativeTitle: 'Laziness Who Sold Themselves',
      rating: getRandomInt(0, 10),
      poster: getRandomArrayElement(filmPosters),
      ageRating: 0,
      director: 'Tom Ford',
      writers: ["Takeshi Kitano"],
      actors: ["Morgan Freeman"],
      release: {
        date: '2019-05-11T00:00:00.000Z',
        releaseCountry: 'Finland'
      },
      runtime: '77',
      genre: ['Comedy'],
      description: getRandomLengthArray(filmDescriptions, MAX_DESCRIPTION_LENGTH)
    },
    isWatchlist: Boolean(getRandomInt(0, 1)),
    isAlreadyWatched: Boolean(getRandomInt(0, 1)),
    watchingDate: dayjs().format('D/MMMM/YYYY'),
    isFavorite: Boolean(getRandomInt(0, 1)),

  }
}

export {generateFilmCard};
