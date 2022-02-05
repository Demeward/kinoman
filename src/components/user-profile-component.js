import AbstractComponent from "./abstract-component.js";

const createUserProfileTemplate = (userProfile) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userProfile.status}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserProfileComponent extends AbstractComponent {
  constructor(userProfile) {
    super();

    this._userProfile = userProfile;
  }

  getTemplate() {
    return createUserProfileTemplate(this._userProfile);
  }
}
