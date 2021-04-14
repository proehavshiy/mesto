import { config } from '../utils/constants.js';
import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
  constructor({popupSelector, handleForm}) {
    super(popupSelector);
    this._handleForm = handleForm; //колбэк сабмита формы
    this._popupForm = this._popupElement.querySelector(config.formSelector); //форма

  }
  _handleFormSubmit(evt) {
    evt.preventDefault();
    this._handleForm();//получаем id карточки и удаляем ее
  }
  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', this._handleFormSubmit.bind(this));//если колбэк сабмита не забиндить, будет потеря контекста/ привязываем this к экземпляру класса
  }
}
