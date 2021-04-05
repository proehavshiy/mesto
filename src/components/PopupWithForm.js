import { config } from '../utils/constants.js';
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({popupSelector, handleForm}) {
    super(popupSelector);
    this._handleForm = handleForm; //колбэк сабмита формы
    this._popupForm = this._popupElement.querySelector(config.formSelector); //форма
    this._AllPopupFormInputs = this._popupForm.querySelectorAll(config.inputSelector); //все инпуты формы
  }
  //собирает данные всех инпутов формы
  _getInputValues() {
    this._formInputValues = {};

    this._AllPopupFormInputs.forEach( (input) => {
      this._formInputValues[input.name] = input.value
    });
    return this._formInputValues;
  }
  _handleFormSubmit(evt) {
    evt.preventDefault();
    this._formInputValues = this._getInputValues();
    this._handleForm(this._formInputValues);//создаем новую карточку
  }
  setEventListeners() {
    super.setEventListeners();
    //должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    this._popupForm.addEventListener('submit', this._handleFormSubmit.bind(this));//если колбэк сабмита не забиндить, будет потеря контекста/ привязываем this к экземпляру класса
  }
  close() {
    super.close();
    //Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
    this._popupForm.reset();
  }
}
