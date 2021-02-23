// включение валидации вызовом enableValidation
// все настройки передаются при вызове

//enableValidation({
//  formSelector: '.popup__form',
//  inputSelector: '.popup__input',
//  submitButtonSelector: '.popup__button',
//  inactiveButtonClass: 'popup__button_disabled',
//  inputErrorClass: 'popup__input_type_error',
//  errorClass: 'popup__error_visible'
//});

const showInputError = (formElement, inputElement, errorMessage) => { //функция показа ошибки
  const errorElement = formElement.querySelector(`.${inputElement.classList[1]}-error`); //находим span ошибки
  //const errorElement = inputElement.closest('.popup__input-section').querySelector('.popup__input-error'); //еще один способ
  errorElement.textContent = errorMessage; //добавляем соержание ошибки
  errorElement.classList.add('popup__input-error_active'); //добавляем класс появления
};

const hideInputError = (formElement, inputElement) => { //функция сурытия ошибки
  const errorElement = formElement.querySelector(`.${inputElement.classList[1]}-error`);
  errorElement.textContent = ''; //очищаем текст ошибки
  errorElement.classList.remove('popup__input-error_active');
};

const checkInputValidity = (formElement, inputElement) => { //функция проверки поля на валидность
  const isElementValid = inputElement.validity.valid;

  if (!isElementValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
  console.log(inputElement.name, isElementValid);
};

const toggleButtonState = (inputList, buttonElement) => {
  //const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
  //const hasNotValidInput = inputList.some(findAtLeastOneNotValid);

  const hasNotValidInput = inputList.some(inputElement => { //ищем хотя бы 1 невалидный инпут
    return !inputElement.validity.valid
  });


  if (hasNotValidInput) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('popup__button-save_disabled');
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__button-save_disabled');
  }

  //console.log( !hasNotValidInput);
  //console.log(buttonElement.disabled);
};

const setEventListeners = (formElement) => { //Формула установки слушателей на все формы
  const inputList = Array.from(formElement.querySelectorAll('.popup__input')); //получаем массив всех инпутов-полей всех форм
  const buttonElement = formElement.querySelector('.popup__button-save');

  inputList.forEach(inputElement => { //на все поля всех форм ставим слушатели
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
      //console.log(inputElement)
    })
  })
  toggleButtonState(inputList, buttonElement);

  //console.log(inputList);
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach(setEventListeners); // добавляем всем формам слушатели


};
enableValidation();

//console.log(formList);
