export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector)); //массив всех инпутов из формы
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector); //submit кнопка формы
    //bind
    this._checkInputValidityBind = this._checkInputValidity.bind(this);
    this.toggleButtonStateBind = this.toggleButtonState.bind(this);
  }
  enableValidation() {
    this._setEventListeners();
  }
  //публичный метод для очистки ошибок в полях форм при открытии формы по кнопке
  hideInputErrors() {
    this._inputList.forEach(_inputElement => {
      this._hideInputError(_inputElement);
    })
  }
  _setEventListeners() {
    //лисенер на каждый инпут формы
    this._inputList.forEach(_inputElement => {
      _inputElement.addEventListener('input', () => {
        this._checkInputValidityBind(_inputElement); //проверка валидности инпута
        this.toggleButtonStateBind(); //переключение состояния кнопки в завис от валидности
      })
    })
  }
  _checkInputValidity(_inputElement) {
    if (!_inputElement.validity.valid) {//в зависимости от валидности поля показываем или прячем сообщение об ошибке
      this._showInputError(_inputElement);
    } else {
      this._hideInputError(_inputElement);
    }
  }
  _showInputError(_inputElement) {
    const _errorMessage = _inputElement.validationMessage;
    //находим span ошибки
    const _errorElement = this._form.querySelector(`.${this._config.inputErrorClass}${_inputElement.name}`);
    //добавляем содержание ошибки
    _errorElement.textContent = _errorMessage;
    //добавляем класс ошибки инпуту
    _inputElement.classList.add(this._config.popupInputErrorClass);
    //добавляем класс появления
    _errorElement.classList.add(this._config.errorClass);
  }
  _hideInputError(_inputElement) {
    //находим span ошибки
    const _errorElement = this._form.querySelector(`.${this._config.inputErrorClass}${_inputElement.name}`);
    //очищаем текст ошибки
    _errorElement.textContent = '';
    //удаляем класс ошибки инпуту
    _inputElement.classList.remove(this._config.popupInputErrorClass);
    _errorElement.classList.remove(this._config.errorClass);
  }
  toggleButtonState() {
    //ищем хотя бы 1 невалидный инпут
    const _hasNotValidInput = this._inputList.some(_inputElement => {
      return !_inputElement.validity.valid
    });
    //в зависимости от валидности полей переключаем кнопку
    if (_hasNotValidInput) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }
}
