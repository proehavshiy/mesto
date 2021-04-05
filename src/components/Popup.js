import { config } from '../utils/constants.js';

export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscCloseBind = this._handleEscClose.bind(this); //.bind() возвращает новую функцию. Поэтому чтобы поставить и снять слушатель, нужно обращаться через переменную
  }
  open() {
    this._popupElement.classList.add(config.openedPopupClass);
    document.addEventListener('keyup', this._handleEscCloseBind);//если bind не привязать к слушателю, потеряется контекст
  }
  close() {
    this._popupElement.classList.remove(config.openedPopupClass);
    document.removeEventListener('keyup', this._handleEscCloseBind);//если bind не привязать к слушателю, потеряется контекст
  }
  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
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
    this._popupElement.addEventListener('click',  this._handleClickClose.bind(this));//если колбэк не забиндить, будет потеря контекста/ привязываем this к экземпляру класса
  }
}
