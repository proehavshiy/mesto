import { config } from './constants.js';

export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {
    this._popupElement.classList.add(config.openedPopupClass);
    document.addEventListener('keyup', this._handleEscClose);
    this._popupElement.addEventListener('click', this._handleClickClose);
  }
  close() {
    this._popupElement.classList.remove(config.openedPopupClass);
    document.removeEventListener('keyup', this._handleEscClose);
    this._popupElement.removeEventListener('click', this._handleClickClose);
  }
  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      //const openedPopup = evt.currentTarget.querySelector(config.openedPopupSelector);
      this.close();
    }
  }
  _handleClickClose(evt) { // обработчик типа закрытия формы
    if (evt.target.classList.contains(config.openedPopupClass)) {
      this.close();
  }
    if (evt.target.classList.contains(config.closeButtonClass)) {
      this.close();
  }
  }
  setEventListeners() {
    //Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
  }
}
