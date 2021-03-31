import { initialCards } from './initial-сards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';
import {
  config,
  page,
  changeProfileButton,
  addCardButton,
  popupChangeProfileInputName,
  popupChangeProfileInputSigning,
  sectionElement
} from './constants.js';

//функция получения готовой карточки
function createCard(cardData) {
  //как handleCardClick передаем метод open popupWithImage. чтобы получить картинку и подпись карточки и подставить их в попап
  const handleCardClick = popupWithImage.open.bind(popupWithImage); //если .bind(popupWithImage) не поставить, ошибка потери контекста
  const newCard = new Card (cardData, handleCardClick);
  return newCard.generateCard();
  };

//функционал отрисовки карточек
const cardDisplay = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = createCard(item); //создание изначальных карточек
    cardDisplay.appendItem(newCard); //вставка изначальных карточек
    }
  }, sectionElement);

//попап с картинкой
const popupWithImage = new PopupWithImage(config.popupOpenImageSelector);

//попап добавления карточки
const popupAddCard = new PopupWithForm({
  popupSelector: config.popupAddCardSelector,
  handleForm: (formData) => {
    const newCard = createCard({name:formData['location-name'], link:formData['image-link']});//через колбэк создаем новую карточку с данными из инпутов формы
    cardDisplay.prependItem(newCard);//вставляем карточку в html методом cardDisplay
    popupAddCard.close();
  }
});

//попап редактирования профиля
const popupChangeProfile = new PopupWithForm({
  popupSelector: config.popupChangeProfileSelector,
  handleForm: (formData) => {
    //обновление данных профиля страницы из инпутов формы при сабмите
    popupChangeProfileInfo.setUserInfo({name:formData['profile-name'], signing:formData['profile-signing']});
    popupChangeProfile.close();
  }
});

// данные для попапа редактирования профиля
const popupChangeProfileInfo = new UserInfo({
  profileTitle: config.profileTitleSelector,
  profileSubtitle: config.profileSubtitleSelector
});

//колбэк попапа изменения профиля
function handlePopupChangeProfile() {
  //вызываем функцию, чтобы при переоткрытии снова подставились значения
  fillInputValue();
  popupChangeProfile.open();
};

// заполнение полей формы редактир профиля при открытии
function fillInputValue() {
  const formValues = popupChangeProfileInfo.getUserInfo(); //объект с данными из профиля для заполнения полей
  popupChangeProfileInputName.value = formValues.inputName;
  popupChangeProfileInputSigning.value = formValues.inputSigning;
};

//колбэк открытия попапа добавления карточки
function handlePopupAddCard() {
  popupAddCard.open()
};

function popupControl() {
  //Слушатели - кнопки
  changeProfileButton.addEventListener('click', () => handlePopupChangeProfile());
  addCardButton.addEventListener('click', () => handlePopupAddCard());
  //Слушатели - попапы
  popupWithImage.setEventListeners();
  popupAddCard.setEventListeners();
  popupChangeProfile.setEventListeners();

  //отображение карточек в html
  cardDisplay.renderItems();

  //подключение валидации формам
  const formList = Array.from(document.querySelectorAll(config.formSelector));//получаем массив из всех форм на странице
  formList.forEach((formElement) => {
    const openButton = page.querySelector(`.${formElement.name}-open-button`);
    const formValidation = new FormValidator (config, formElement, openButton);
    formValidation.enableValidation();
  });
};

popupControl();

