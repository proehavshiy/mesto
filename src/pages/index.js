import { initialCards } from '../utils/initial-сards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  config,
  page,
  changeProfileButton,
  addCardButton,
  popupChangeProfileInputName,
  popupChangeProfileInputSigning,
  sectionElement
} from '../utils/constants';
import './index.css';

//функция сборки готовой карточки
function createCard(cardData) {
  //как handleCardClick передаем метод open popupWithImage. чтобы получить картинку и подпись карточки и подставить их в попап
  const handleCardClick = popupWithImage.open.bind(popupWithImage); //потеря контекста. эта функция навешивается как колбэк слушателю картинки карточки. И this будет определяться как картинка, куда мы кликнем
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
  handleForm: (formInputValues) => {
    const newCard = createCard({name:formInputValues['location-name'], link:formInputValues['image-link']});//через колбэк создаем новую карточку с данными из инпутов формы
    cardDisplay.prependItem(newCard);//вставляем карточку в html методом cardDisplay
    popupAddCard.close();
  }
});

//попап редактирования профиля
const popupChangeProfile = new PopupWithForm({
  popupSelector: config.popupChangeProfileSelector,
  handleForm: (formInputValues) => {
    //обновление данных профиля страницы из инпутов формы при сабмите
    changingProfileInfo.setUserInfo({name:formInputValues['profile-name'], signing:formInputValues['profile-signing']});
    popupChangeProfile.close();
  }
});

// данные для попапа редактирования профиля
const changingProfileInfo = new UserInfo({
  profileTitleSelector: config.profileTitleSelector,
  profileSubtitleSelector: config.profileSubtitleSelector
});

//колбэк попапа изменения профиля
function handlePopupChangeProfile() {
  //вызываем функцию, чтобы при переоткрытии снова подставились значения
  fillInputValue();
  popupChangeProfile.open();
};

// заполнение полей формы редактир профиля при открытии
function fillInputValue() {
  const formValues = changingProfileInfo.getUserInfo(); //объект с данными из профиля для заполнения полей
  popupChangeProfileInputName.value = formValues.inputName;
  popupChangeProfileInputSigning.value = formValues.inputSigning;
};

//колбэк открытия попапа добавления карточки
function handlePopupAddCard() {
  popupAddCard.open()
};

function managePopup() {
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

    const formValidation = new FormValidator (config, formElement);
    //слушатель на кнопку открытия попапа для очистки ошибок в полях форм при открытии.
    //Биндим, чтобы не потерять контекст
    openButton.addEventListener('click', formValidation.hideInputErrors.bind(formValidation));
    //слушатель на кнопку открытия попапа для изменения состояния кнопки
    // сабмита формы в зависимости от валидации инпутов
    //Биндим, чтобы не потерять контекст
    openButton.addEventListener('click', formValidation.toggleButtonState.bind(formValidation));
    formValidation.enableValidation();
  });
};

managePopup();
