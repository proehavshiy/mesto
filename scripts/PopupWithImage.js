import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImage = this._popupElement.querySelector(config.popupOpenImageSelector);
    this.popupFigcaption = this._popupElement.querySelector(config.popupOpenImageFigcaptionSelector);
  }
  open(name, link) {
    super.open();
    this.popupImage.src = link;
    this.popupImage.alt = `картинка ${name}`;
    this.popupFigcaption.textContent = name;
    //В методе open класса PopupWithImage нужно вставлять в попап картинку и атрибут src изображения и подпись к картинке.
  }
}
