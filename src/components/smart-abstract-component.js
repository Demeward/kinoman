import AbstractComponent from "./abstract-component.js";
import {replace} from "../utils/render.js";

export default class SmartAbstractComponent extends AbstractComponent {

  reRender() {
    const oldElement = this.getElement();
    this.removeElement();
    const newElement = this.getElement();
    replace(oldElement.parentNode, newElement, oldElement);
    this.recoveryListeners();
  }
}
