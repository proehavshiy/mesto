import { config } from '../utils/constants.js';

export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    //bind
    this._handleEscCloseBind = this._handleEscClose.bind(this); //.bind() возвращает новую функцию. Поэтому чтобы поставить и снять слушатель, нужно обращаться через переменную
    this._handleClickCloseBind = this._handleClickClose.bind(this)
  }
  open() {
    //чтобы попапы при перезагрузке страницы не мерцали, изначально у них display: none
    //при открытии им добавляется display: flex через класс popup__flexed
    //через нулевой таймаут сразу же добавляется класс открытия. если без таймаута, то плавного открытия-закрытия не будет
    this._popupElement.classList.add('popup__flexed');
    setTimeout( ()=> {this._popupElement.classList.add(config.openedPopupClass)},0);

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
    this._popupElement.addEventListener('click',  this._handleClickCloseBind);//если колбэк не забиндить, будет потеря контекста/ привязываем this к экземпляру класса
  }
}
