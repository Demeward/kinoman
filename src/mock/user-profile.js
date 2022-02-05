import {USER_STATUSES} from "../constants.js";
import {getRandomNumber} from "../utils/common";

const generateUserProfile = () => {
  const quantityViewedFilms = getRandomNumber(0, 100);
  let userProfile = {};

  for (const status of USER_STATUSES) {
    if (quantityViewedFilms >= status.value) {
      userProfile.status = status.name;
    } else {
      if (typeof userProfile.status === `undefined`) {
        userProfile.status = status.name;
      }
      break;
    }
  }

  return userProfile;
};

export {generateUserProfile};
