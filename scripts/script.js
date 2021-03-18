import { initialCards } from './initial-сards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

//функции
function openPopup(popupType, config) {
  popupType.classList.add(config.openedPopupClass);
  document.addEventListener('keyup', handlePopup); // добавляем слушатель для закрытия формы по esc
  popupType.addEventListener('click', handlePopup); // добавляем слушатель на клик для формы и ее дочерних элементов (для закрытия по клику по вне формы и по крестику. Тут работает всплытие)
};

function closePopup(popupType, config) {
  popupType.classList.remove(config.openedPopupClass);
  document.removeEventListener('keyup', handlePopup); // удаляем слушатель для закрытия формы по esc
  popupType.removeEventListener('click', handlePopup); // удаляем слушатель на клик для формы и ее дочерних элементов (для закрытия по клику по вне формы и по крестику. Тут работает всплытие)
};

function handlePopup(evt) { // обработчик типа закрытия формы
  const target = evt.target;
  const currentTarget = evt.currentTarget;
  const targetKey = evt.key;
  const openedPopup = currentTarget.querySelector(config.openedPopupSelector);
  const closeButton = currentTarget.querySelector(config.closeButtonSelector)
  if (isOutFormClicked(target, currentTarget) || isButtonCloseClicked(target, closeButton)) {
    closePopup(currentTarget, config);
  } else if (isKeyEscClicked(targetKey)) {
    closePopup(openedPopup, config);
  }
};

function isOutFormClicked(target, currentTarget) { // по пустому полю вне формы
  return target === currentTarget
};
function isButtonCloseClicked(target, closeButton) { // по крестику
  return target === closeButton
};
function isKeyEscClicked(targetKey) { // по Esc
  return targetKey === 'Escape'
};

//колбэк попапа изменения профиля
function handlePopupChangeProfile(popupChangeProfile, profileTitle, profileSubtitle, popupChangeProfileInputName, popupChangeProfileInputSigning, config) {
  //вызываем функцию, чтобы при переоткрытии снова подставились значения
  fillInputValue(profileTitle, profileSubtitle, popupChangeProfileInputName, popupChangeProfileInputSigning);
  openPopup(popupChangeProfile, config);
};


// подстановка значений в инпуты формы редактир профиля при открытии
function fillInputValue(profileTitle, profileSubtitle, popupChangeProfileInputName, popupChangeProfileInputSigning) {
  popupChangeProfileInputName.value = profileTitle.textContent;
  popupChangeProfileInputSigning.value = profileSubtitle.textContent;
};

//колбэк попапа добавления карточки
function handlePopupAddCard(popupAddCard, config) {
  resetPopupAddCardForm(popupAddCard, config); //сбрасываем значение полей при переоткрытии формы
  openPopup(popupAddCard, config);
};

function resetPopupAddCardForm(popupAddCard, config) {
  const popupAddCardForm =  popupAddCard.querySelector(config.formSelector);
  popupAddCardForm.reset();
};

//функция отображения собранной карточки в html
function renderInitialCards(sectionElement, config) {
  const cards = initialCards.map((item) => {
    const newCard = new Card (config, item);
    sectionElement.append(newCard.generateCard());
  });
};

//функция сбора попапа картинки
function openImage(item, config) {
  const popupOpenImage = document.querySelector(config.popupOpenImageSelector);
  const popupOpenImageImage = popupOpenImage.querySelector(config.popupOpenImageImageSelector);
  const popupOpenImageFigcaption = popupOpenImage.querySelector(config.popupOpenImageFigcaptionSelector);

  fillpopupOpenImage(popupOpenImageImage, popupOpenImageFigcaption, item);
  openPopup(popupOpenImage, config);
};

// наполнение содержанием попапа открытия картинки
function fillpopupOpenImage(popupOpenImageImage, popupOpenImageFigcaption, item) {
  popupOpenImageImage.src = item.link;
  popupOpenImageImage.alt = item.name;
  popupOpenImageFigcaption.textContent = item.name;
};

// Обработчики форм
//форма редактирования профиля
function formSubmitChangeProfile(evt, popupChangeProfile, profileTitle, profileSubtitle, popupChangeProfileInputName, popupChangeProfileInputSigning, config) {
  evt.preventDefault();

  profileTitle.textContent = popupChangeProfileInputName.value;
  profileSubtitle.textContent = popupChangeProfileInputSigning.value;

  closePopup(popupChangeProfile, config);
};

//форма добавления карточки
function formSubmitAddCard(evt, popupAddCard, sectionElement, config) {
  evt.preventDefault();

  const inputLocationName = popupAddCard.querySelector(config.popupAddCardinputLocationNameSelector).value;
  const inputImageLink = popupAddCard.querySelector(config.popupAddCardinputImageLinkSelector).value;

  const values = ({name:inputLocationName, link:inputImageLink}); //значения из полей формы
  const newCard = new Card (config, values);
  sectionElement.prepend(newCard.generateCard());

  closePopup(popupAddCard, config);
};

function popupControl(config) {
  const page = document.querySelector(config.pageSelector);
  const popupChangeProfile = page.querySelector(config.popupChangeProfileSelector);
  const popupAddCard = page.querySelector(config.popupAddCardSelector);
  const changeProfileButton = page.querySelector(config.profileChangeButtonSelector);
  const addCardButton = page.querySelector(config.cardAddButtonSelector);

  const profileTitle = page.querySelector(config.profileTitleSelector);
  const profileSubtitle = page.querySelector(config.profileSubtitleSelector);
  const popupChangeProfileInputName = popupChangeProfile.querySelector(config.popupChangeProfileInputNameSelector);
  const popupChangeProfileInputSigning = popupChangeProfile.querySelector(config.popupChangeProfileInputSigningSelector);
  const sectionElement = document.querySelector(config.sectionElementSelector);
  const cardSection = page.querySelector(config.cardSectionSelector);

  //Слушатели - точки входа
  popupChangeProfile.addEventListener('submit', (evt) => formSubmitChangeProfile(evt, popupChangeProfile, profileTitle, profileSubtitle, popupChangeProfileInputName, popupChangeProfileInputSigning, config));
  popupAddCard.addEventListener('submit', (evt) => formSubmitAddCard(evt, popupAddCard, sectionElement, config));
  changeProfileButton.addEventListener('click', () => handlePopupChangeProfile(popupChangeProfile, profileTitle, profileSubtitle, popupChangeProfileInputName, popupChangeProfileInputSigning, config));
  addCardButton.addEventListener('click', () => handlePopupAddCard(popupAddCard, config));
  //для открытия popupImage
  cardSection.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(config.templateImageClass)) {
      const cardTitle = evt.target.closest(config.templateCardBodySelector).querySelector(config.templateCardTitleSelector).textContent;
      const cardImageLink = evt.target.src;
      const popupImageData = ({name:cardTitle, link:cardImageLink});

      openImage(popupImageData, config);
    }
  })

  renderInitialCards(sectionElement, config) //отображение карточек в html

  //подключение валидации формы
  const formList = Array.from(document.querySelectorAll(config.formSelector));//получаем массив из всех форм на странице
  //!!думаю, что логичнее было бы брать 1 конкретную форму, которую открывает пользователь, и проверять только ее, чем всегда проверять все
  formList.forEach((formElement) => {
    const popup = formElement.closest(config.popupSelector);
    if (popup.classList.contains(config.popupChangeProfileClass)) {
      const formValidation = new FormValidator (config, formElement, config.profileChangeButtonSelector);
      formValidation.enableValidation();
    } else if (popup.classList.contains(config.popupAddCardClass)) {
      const formValidation = new FormValidator (config, formElement, config.cardAddButtonSelector);
      formValidation.enableValidation();
    }
  });
};

// конфиг с настройками
const config = {
  //страница
  pageSelector:'.page',
  openedPopupClass: 'popup_opened',
  openedPopupSelector: '.popup_opened',
  profileSectionSelector: '.profile',
  pageButtonSelector: '.page__button',
  pageButtonClass: 'page__button',
  profileTitleSelector: '.profile__title',
  profileSubtitleSelector: '.profile__subtitle',
  cardSectionSelector: '.elements',
  //универсальные для форм
  popupSelector: '.popup',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  closeButtonSelector: '.popup__button-close',
  popupInputErrorClass:'popup__input_error',
  inputErrorClass: 'popup__input-error_type_',
  errorClass: 'popup__input-error_active',
  //попап редактирования профиля
  popupChangeProfileClass: 'popup_change-profile',
  popupChangeProfileSelector: '.popup_change-profile',
  popupChangeProfileInputNameSelector: '.popup__input_profile-name',
  popupChangeProfileInputSigningSelector: '.popup__input_profile-signing',
  submitButtonChangeProfileSelector: '.popup__button-save_change-profile',
  //попап добавления карточки
  popupAddCardClass: 'popup_add-card',
  popupAddCardSelector: '.popup_add-card',
  popupAddCardinputLocationNameSelector: '.popup__input_location-name',
  popupAddCardinputImageLinkSelector: '.popup__input_image-link',
  profileChangeButtonSelector: '.profile__change-button',
  cardAddButtonSelector: '.profile__add-button',
  submitButtonAddNewCardSelector: '.popup__button-save_add-card',
  //попап открытия карточки
  popupOpenImageSelector: '.popup_open-image',
  popupOpenImageImageSelector: '.popup__image',
  popupOpenImageFigcaptionSelector: '.popup__figcaption',
  //карточка
  sectionElementSelector: '.elements',
  templateElementSelector: '.template-element',
  templateCardBodySelector: '.element',
  templateImageClass: 'element__image',
  templateImageSelector: '.element__image',
  templateCardTitleSelector:'.element__card-title',
  templateDeleteButtonSelector:'.element__button-delete',
  templateLikeButtonSelector: '.element__button-like',
  LikeIsActiveClass: 'button-like_active',
};

popupControl(config);

