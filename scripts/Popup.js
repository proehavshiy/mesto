import { config } from './constants.js';

export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closePopupButton = this._popupElement.querySelector(config.closeButtonSelector);
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
    this._closePopupButton.addEventListener('click',  this._handleClickClose);
  }
}

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

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; //колбэк сабмита формы
    this._popupForm = this._popupElement.querySelector(config.formSelector); //форма
    this._AllFormInputs = this._popupForm.querySelectorAll(config.inputSelector); //все инпуты формы
    this._submitFormButton = this._popupForm.querySelector(config.submitButtonSelector); //кнопка сабмит формы
  }
  _getInputValues() {
    //метод _getInputValues, который собирает данные всех полей формы.
    this._formInputValues = {};
    this._AllFormInputs.forEach( input => this._formInputValues[input.name] = input.value);
    return this._formInputValues;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    //должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    this._popupForm.addEventListener('submit', this._handleFormSubmit);
  }
  close() {
    super.close();
    //Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
    popupAddCardForm.reset();
  }
}

//handleFormSubmit: (formValues) => {
//  userInfo.setUserInfo({name: formValues.name, about: formValues.about});
//  popupProfile.closePopup();
//}
