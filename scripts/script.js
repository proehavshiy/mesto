import { initialCards } from './initial-сards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import {
  config,
  page,
  popupChangeProfile,
  popupAddCard,
  changeProfileButton,
  addCardButton,
  popupAddCardForm,
  inputLocationName,
  inputImageLink,
  popupOpenImage,
  popupOpenImageImage,
  popupOpenImageFigcaption,
  profileTitle,
  profileSubtitle,
  popupChangeProfileInputName,
  popupChangeProfileInputSigning,
  sectionElement,
  cardSection
} from './constants.js';


//функции
function openPopup(popupType) {
  popupType.classList.add(config.openedPopupClass);
  document.addEventListener('keyup', closeByEscape); // добавляем слушатель для закрытия формы по esc
  popupType.addEventListener('click', handlepopup); // добавляем слушатель на клик для формы и ее дочерних элементов (для закрытия по клику по вне формы и по крестику. Тут работает всплытие)
};

function closePopup(popupType) {
  popupType.classList.remove(config.openedPopupClass);
  document.removeEventListener('keyup', closeByEscape); // удаляем слушатель для закрытия формы по esc
  popupType.removeEventListener('click', handlepopup);
};

function closeByEscape(evt) {
  if(evt.key === 'Escape') {
    const openedPopup = evt.currentTarget.querySelector(config.openedPopupSelector);
    closePopup(openedPopup)
  }
}

function handlepopup(evt) { // обработчик типа закрытия формы
  const currentPopup = evt.currentTarget;
  if (evt.target.classList.contains(config.openedPopupClass)) {
    closePopup(currentPopup)
  }
  if (evt.target.classList.contains(config.closeButtonClass)) {
    closePopup(currentPopup)
  }
}

//колбэк попапа изменения профиля
function handlePopupChangeProfile() {
  //вызываем функцию, чтобы при переоткрытии снова подставились значения
  fillInputValue();
  openPopup(popupChangeProfile);
};


// подстановка значений в инпуты формы редактир профиля при открытии
function fillInputValue() {
  popupChangeProfileInputName.value = profileTitle.textContent;
  popupChangeProfileInputSigning.value = profileSubtitle.textContent;
};

//колбэк попапа добавления карточки
function handlePopupAddCard() {
  resetPopupAddCardForm(); //сбрасываем значение полей при переоткрытии формы
  openPopup(popupAddCard);
};

function resetPopupAddCardForm() {
  popupAddCardForm.reset();
};

//колбэк для открытия попапа картинки из экземпляра класса
function handleCardClick(name, link) {
  popupOpenImageImage.src = link;
  popupOpenImageImage.alt = name;
  popupOpenImageFigcaption.textContent = name;
  openPopup(popupOpenImage);
}

////функция отображения собранной карточки в html
//function renderInitialCards() {
//  const cards = initialCards.map((cardData) => {
//    const finishedCard = createCard(cardData);
//    sectionElement.append(finishedCard);
//  });
//};



//функция получения готовой карточки
function createCard(cardData) {
    const newCard = new Card (cardData, handleCardClick);
    return newCard.generateCard();
  };

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = createCard(item); //создание карточки
    defaultCardList.appendItem(newCard); //вставка карточки
    }
  }, sectionElement);

// Обработчики форм
//форма редактирования профиля
function formSubmitChangeProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = popupChangeProfileInputName.value;
  profileSubtitle.textContent = popupChangeProfileInputSigning.value;

  closePopup(popupChangeProfile);
};

//форма добавления карточки
function formSubmitAddCard(evt) {
  evt.preventDefault();

  const cardData = ({name:inputLocationName.value, link:inputImageLink.value}); //значения из полей формы
  const newCard = createCard(cardData);

  sectionElement.prepend(newCard);

  closePopup(popupAddCard);
};

function popupControl() {

  //Слушатели - точки входа
  popupChangeProfile.addEventListener('submit', (evt) => formSubmitChangeProfile(evt));
  popupAddCard.addEventListener('submit', (evt) => formSubmitAddCard(evt));
  changeProfileButton.addEventListener('click', () => handlePopupChangeProfile());
  addCardButton.addEventListener('click', () => handlePopupAddCard());

  //renderInitialCards() //отображение карточек в html
  defaultCardList.renderItems();

  //подключение валидации формы
  const formList = Array.from(document.querySelectorAll(config.formSelector));//получаем массив из всех форм на странице
  formList.forEach((formElement) => {
    const openButton = page.querySelector(`.${formElement.name}-open-button`);
    const formValidation = new FormValidator (config, formElement, openButton);
      formValidation.enableValidation();
  });
};

popupControl();

