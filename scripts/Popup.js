import { config } from './constants.js';

export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closePopupButton = this._popupElement.querySelector(config.closeButtonSelector);
    this._handleEscCloseBind = this._handleEscClose.bind(this); //если bind не привязать к слушателю, потеряется контекст
    this._handleClickCloseBind = this._handleClickClose.bind(this); //если bind не привязать к слушателю, потеряется контекст
  }
  open() {
    this._popupElement.classList.add(config.openedPopupClass);
    document.addEventListener('keyup', this._handleEscCloseBind);
    //this._popupElement.addEventListener('click', this._handleClickCloseBind);
  }
  close() {
    this._popupElement.classList.remove(config.openedPopupClass);
    document.removeEventListener('keyup', this._handleEscCloseBind);
    //this._popupElement.removeEventListener('click', this._handleClickCloseBind);
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
    //добавляем слушатель на закрытие попапа кликом по кнопке и кликом вне формы
    this._popupElement.addEventListener('click',  this._handleClickCloseBind);
  }
}
