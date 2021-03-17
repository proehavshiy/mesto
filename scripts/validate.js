class FormValidator {
  constructor(validationSettings, form) {
    this._validationSettings = validationSettings;
    this._form = form;
  }
  enableValidation() {
    const _inputList = Array.from(this._form.querySelectorAll(this._validationSettings.inputSelector)); //получаем массив всех инпутов-полей из формы
    const _buttonElement = this._form.querySelector(this._validationSettings.submitButtonSelector); //получаем кнопку формы

    this._toggleButtonState(_inputList, _buttonElement);

    this._setEventListeners(_inputList, _buttonElement);


  }
  _setEventListeners(_inputList, _buttonElement) {
    //лисенер на каждый инпут формы
    _inputList.forEach(_inputElement => {
      _inputElement.addEventListener('input', () => {
        this._checkInputValidity(_inputElement); //проверка валидности инпута
        this._toggleButtonState(_inputList, _buttonElement); //переключение состояния кнопки в завис от валидности
      })
    })
      //удаление ошибок в полях при закрытии формы
    const _profileChangeButton = document.querySelector(this._validationSettings.profileChangeButtonSelector); //вешаем обработчики на кнопку открытия формы
    const _cardAddButton = document.querySelector(this._validationSettings.cardAddButtonSelector); //вешаем обработчики на кнопку открытия формы

    _profileChangeButton.addEventListener('click', () => {this._clearErrors()}); //вешаем обработчики на кнопку открытия формы
    // в форме редактир профиля при повторном открытии формы кнопка неактивна если в форме до этого поля были невалидны. исправление
    _profileChangeButton.addEventListener('click', () => {this._activateSaveButton()}); //вешаем обработчики на кнопку открытия формы

    _cardAddButton.addEventListener('click', () => {this._clearErrors()}); //вешаем обработчики на кнопку открытия формы
    _cardAddButton.addEventListener('click', () => {this._disableSaveButton()}); //отключаем при открытии кнопку submit в форме добавления новой карточки
  }
  _checkInputValidity(_inputElement) {
    const _isElementValid = _inputElement.validity.valid;

    if (!_isElementValid) {//в зависимости от валидности поля показываем или прячем сообщение об ошибке
      const _errorMessage = _inputElement.validationMessage;
      this._showInputError(_inputElement, _errorMessage);
    } else {
      this._hideInputError(_inputElement);
    }
  }
  _showInputError(_inputElement, _errorMessage) {
    //находим span ошибки
    const _errorElement = this._form.querySelector(`.${this._validationSettings.inputErrorClass}${_inputElement.name}`);
    //добавляем соержание ошибки
    _errorElement.textContent = _errorMessage;

    //добавляем класс ошибки инпуту
    _inputElement.classList.add(this._validationSettings.popupInputErrorClass);
    //добавляем класс появления
    _errorElement.classList.add(this._validationSettings.errorClass);
  }
  _hideInputError(_inputElement) {
    //находим span ошибки
    const _errorElement = this._form.querySelector(`.${this._validationSettings.inputErrorClass}${_inputElement.name}`);
    //очищаем текст ошибки
    _errorElement.textContent = '';
    //удаляем класс ошибки инпуту
    _inputElement.classList.remove(this._validationSettings.popupInputErrorClass);
    _errorElement.classList.remove(this._validationSettings.errorClass);
  }
  _toggleButtonState(_inputList, _buttonElement) {
    //ищем хотя бы 1 невалидный инпут
    const _hasNotValidInput = _inputList.some(_inputElement => {
      return !_inputElement.validity.valid
    });
    //в зависимости от валидности полей переключаем кнопку
    if (_hasNotValidInput) {
      _buttonElement.setAttribute('disabled', true);
      _buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
    } else {
      _buttonElement.removeAttribute('disabled');
      _buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
    }
  }
  _clearErrors() {
    // получаем все активные span с ошибками
    const _errorSpanElementsIsActive = Array.from(document.querySelectorAll(`.${this._validationSettings.errorClass}`));
    // получаем все активные input с ошибками
    const _errorInputElementsIsActive = Array.from(document.querySelectorAll(`.${this._validationSettings.popupInputErrorClass}`));
    _errorSpanElementsIsActive.forEach( (_errorElement) => {
      //удаляем у каждого текст
      _errorElement.textContent = '';
      //удаляем класс активности
      _errorElement.classList.remove(this._validationSettings.errorClass);
    });
    _errorInputElementsIsActive.forEach( (_errorElement) => {
      //удаляем класс активности
      _errorElement.classList.remove(this._validationSettings.popupInputErrorClass);
    });
  }
  _disableSaveButton() {
    // функция отключения кнопки submit в форме добавления карточки при открытии формы
    const _newCardSaveButton = document.querySelector(this._validationSettings.submitButtonAddNewCardSelector);
    _newCardSaveButton.setAttribute('disabled', true);
    _newCardSaveButton.classList.add(this._validationSettings.inactiveButtonClass);
  }
  _activateSaveButton() {
    // функция активации кнопки сохранить при открытии формы, если есть подставленные данные, и они валидны
    const _changeProfileSaveButton = document.querySelector(this._validationSettings.submitButtonChangeProfileSelector);
    //если у кнопки есть класс неактивности
    if (_changeProfileSaveButton.classList.contains(this._validationSettings.inactiveButtonClass)) {
      _changeProfileSaveButton.removeAttribute('disabled');
      _changeProfileSaveButton.classList.remove(this._validationSettings.inactiveButtonClass);
    }
  }
}


const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input-error_type_',
  errorClass: 'popup__input-error_active',
  profileChangeButtonSelector: '.profile__change-button',
  cardAddButtonSelector: '.profile__add-button',
  submitButtonAddNewCardSelector: '.popup__button-save_add-card',
  submitButtonChangeProfileSelector: '.popup__button-save_change-profile',
  popupInputErrorClass:'popup__input_error',
  pageSelector:'.page',
  profileTitleSelector: '.profile__title',
  profileSubtitleSelector: '.profile__subtitle',
  popupChangeProfileSelector: '.popup_change-profile',
  popupChangeProfileInputNameSelector: '.popup__input_profile-name',
  popupChangeProfileInputSigningSelector: '.popup__input_profile-signing',
}


const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));//получаем массив из всех форм на странице
formList.forEach((formElement) => {
  const formValidation = new FormValidator (validationSettings, formElement);
  formValidation.enableValidation();
});
