import { config } from './constants.js';
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector(config.popupOpenImageImageSelector);
    this._popupFigcaption = this._popupElement.querySelector(config.popupOpenImageFigcaptionSelector);
  }
  open(name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = `картинка ${name}`;
    this._popupFigcaption.textContent = name;
    //В методе open класса PopupWithImage нужно вставлять в попап картинку и атрибут src изображения и подпись к картинке.
  }
}
