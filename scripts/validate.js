function showInputError (formElement, inputElement, inputErrorClass, errorClass, popupInputErrorClass, errorMessage) { //функция показа ошибки
  const errorElement = formElement.querySelector(`.${inputErrorClass}${inputElement.name}`); //находим span ошибки
  //const errorElement = inputElement.closest('.popup__input-section').querySelector('.popup__input-error'); //еще один способ
  errorElement.textContent = errorMessage; //добавляем соержание ошибки

  inputElement.classList.add(popupInputErrorClass); //добавляем класс ошибки инпуту
  errorElement.classList.add(errorClass); //добавляем класс появления
};

function hideInputError (formElement, inputElement, inputErrorClass, errorClass, popupInputErrorClass) { //функция скрытия ошибки
  const errorElement = formElement.querySelector(`.${inputErrorClass}${inputElement.name}`);
  errorElement.textContent = ''; //очищаем текст ошибки
  inputElement.classList.remove(popupInputErrorClass); //удаляем класс ошибки инпуту
  errorElement.classList.remove(errorClass);
};

function checkInputValidity (formElement, inputElement, inputErrorClass, errorClass, popupInputErrorClass) { //функция проверки поля на валидность
  const isElementValid = inputElement.validity.valid;

  if (!isElementValid) {//в зависимости от валидности поля показываем или прячем сообщение об ошибке
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, inputErrorClass, errorClass, popupInputErrorClass, errorMessage);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass, popupInputErrorClass);
  }
};

function toggleButtonState (inputList, buttonElement, inactiveButtonClass) { //функция переключения кнопки
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

// подстановка значений в инпуты формы редактир профиля при открытии
function fillInputValuesPopupChangeProfile(validationSettings) {
  const page = document.querySelector(validationSettings.Selector_page);
  const popupChangeProfile = page.querySelector(validationSettings.Selector_popupChangeProfile);
  const profileTitle = page.querySelector(validationSettings.Selector_profileTitle);
  const profileSubtitle = page.querySelector(validationSettings.Selector_profileSubtitle);
  const popupChangeProfileInputName = popupChangeProfile.querySelector(validationSettings.Selector_popupChangeProfileInputName);
  const popupChangeProfileInputSigning = popupChangeProfile.querySelector(validationSettings.Selector_popupChangeProfileInputSigning);

  popupChangeProfileInputName.value = profileTitle.textContent;
  popupChangeProfileInputSigning.value = profileSubtitle.textContent;
};

function setEventListeners (formElement, validationSettings) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector)); //получаем массив всех инпутов-полей из формы
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector); //получаем кнопку формы

  //вызываем ее, чтобы поля в попапе редактирования профиля заполнялись перед валидацией, чтобы кнопка изначально была активной
  fillInputValuesPopupChangeProfile(validationSettings);
  //вне слушателя переключаем состояние кнопки, чтобы изначально она была отключена
  toggleButtonState(inputList, buttonElement, validationSettings.inactiveButtonClass);

  inputList.forEach(inputElement => { //на все поля формы ставим слушатели
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(formElement, inputElement, validationSettings.inputErrorClass, validationSettings.errorClass, validationSettings.popupInputErrorClass); //в слушателе проверяем валидность поля
      toggleButtonState(inputList, buttonElement, validationSettings.inactiveButtonClass); //в слушателе переключаем состояние кнопки
    })
  })
};


function clearErrors (validationSettings) { //функция удаления ошибок при открытии форм
  const errorElementsIsActive = Array.from(document.querySelectorAll(`.${validationSettings.errorClass}`)); // получаем все активные span с ошибками
  errorElementsIsActive.forEach( (errorElement) => {
    errorElement.textContent = ''; //удаляем у каждого текст
    errorElement.classList.remove(validationSettings.errorClass); //удаляем класс активности
  });
}

  function disableSaveButton (validationSettings) { // функция отключения кнопки submit в форме добавления карточки при открытии формы
    const newCardSaveButton = document.querySelector(validationSettings.submitButtonAddNewCardSelector);
    newCardSaveButton.setAttribute('disabled', true);
    newCardSaveButton.classList.add(validationSettings.inactiveButtonClass);
  }

  function activateSaveButton (validationSettings) {
    const changeProfileSaveButton = document.querySelector(validationSettings.submitButtonChangeProfileSelector);
    if (changeProfileSaveButton.classList.contains(validationSettings.inactiveButtonClass)) { //если у кнопки есть класс неактивности
      changeProfileSaveButton.removeAttribute('disabled');
      changeProfileSaveButton.classList.remove(validationSettings.inactiveButtonClass);
    }

    //console.log(changeProfileSaveButton.classList.contains(validationSettings.inactiveButtonClass));
  }

function enableValidation (validationSettings) { //главная функция валидации

  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));//получаем массив из всех форм на странице

  formList.forEach((formElement) => { // для всех форм вызываем функцию setEventListeners
    setEventListeners(formElement, validationSettings);
  });

  //удаление ошибок в полях при закрытии формы
  const profileChangeButton = document.querySelector(validationSettings.profileChangeButtonSelector); //вешаем обработчики на кнопку открытия формы
  const cardAddButton = document.querySelector(validationSettings.cardAddButtonSelector); //вешаем обработчики на кнопку открытия формы
  profileChangeButton.addEventListener('click', () => {clearErrors(validationSettings)}); //вешаем обработчики на кнопку открытия формы
  cardAddButton.addEventListener('click', () => {clearErrors(validationSettings)}); //вешаем обработчики на кнопку открытия формы
  cardAddButton.addEventListener('click', () => {disableSaveButton(validationSettings)}); //отключаем при открытии кнопку submit в форме добавления новой карточки
  // в форме редактир профиля при повторном открытии формы кнопка неактивна если в форме до этого поля были невалидны. исправление
  profileChangeButton.addEventListener('click', () => {activateSaveButton(validationSettings)}); //вешаем обработчики на кнопку открытия формы
};
//  включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
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
  Selector_page:'.page',
  Selector_profileTitle: '.profile__title',
  Selector_profileSubtitle: '.profile__subtitle',
  Selector_popupChangeProfile: '.popup_change-profile',
  Selector_popupChangeProfileInputName: '.popup__input_profile-name',
  Selector_popupChangeProfileInputSigning: '.popup__input_profile-signing',
});


