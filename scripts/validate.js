const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => { //функция показа ошибки
  const errorElement = formElement.querySelector(`.${inputErrorClass}${inputElement.name}`); //находим span ошибки
  //const errorElement = inputElement.closest('.popup__input-section').querySelector('.popup__input-error'); //еще один способ
  errorElement.textContent = errorMessage; //добавляем соержание ошибки
  errorElement.classList.add(errorClass); //добавляем класс появления
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => { //функция скрытия ошибки
  const errorElement = formElement.querySelector(`.${inputErrorClass}${inputElement.name}`);
  errorElement.textContent = ''; //очищаем текст ошибки
  errorElement.classList.remove(errorClass);
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => { //функция проверки поля на валидность
  const isElementValid = inputElement.validity.valid;

  if (!isElementValid) {//в зависимости от валидности поля показываем или прячем сообщение об ошибке
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, inputErrorClass, errorClass, errorMessage);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => { //функция переключения кнопки
  const hasNotValidInput = inputList.some(inputElement => { //ищем хотя бы 1 невалидный инпут
    return !inputElement.validity.valid
  });

  if (hasNotValidInput) { //в зависимости от валидности полей переключаем кнопку
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => { //Формула установки слушателей
  const inputList = Array.from(formElement.querySelectorAll(inputSelector)); //получаем массив всех инпутов-полей из формы
  const buttonElement = formElement.querySelector(submitButtonSelector); //получаем кнопку формы

  inputList.forEach(inputElement => { //на все поля формы ставим слушатели
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass); //в слушателе проверяем валидность поля
      toggleButtonState(inputList, buttonElement, inactiveButtonClass); //в слушателе переключаем состояние кнопки
    })
  })
  toggleButtonState(inputList, buttonElement, inactiveButtonClass); //вне слушателя переключаем состояние кнопки, чтобы изначально она была отключена
}

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => { //главная функция валидации
  const formList = Array.from(document.querySelectorAll(formSelector));//получаем массив из всех форм на странице

  formList.forEach((formElement) => { // для всех форм вызываем функцию setEventListeners
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });

};
// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input-error_type_',
  errorClass: 'popup__input-error_active'
});
