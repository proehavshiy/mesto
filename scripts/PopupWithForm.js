import { Popup } from './Popup.js';

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
