const page = document.querySelector('.page');
//попап редактирования профиля
const profileChangeButton = page.querySelector('.profile__change-button');
const profileTitle = page.querySelector('.profile__title');
const profileSubtitle = page.querySelector('.profile__subtitle');
const popupChangeProfile = page.querySelector('.popup_change-profile');
const popupChangeProfileForm = popupChangeProfile.querySelector('.popup__container_change-profile');
const popupChangeProfileCloseButton = popupChangeProfileForm.querySelector('.popup__button-close_change-profile');
const popupChangeProfileName = popupChangeProfileForm.querySelector('.popup__input_profile-name');
const popupChangeProfileSigning = popupChangeProfileForm.querySelector('.popup__input_profile-signing');
//попап добавления карточки
const popupAddCard = page.querySelector('.popup_add-card');
const popupAddCardButtonOpen = page.querySelector('.profile__add-button');
const popupAddCardButtonClose = popupAddCard.querySelector('.popup__button-close_add-card');
const popupAddCardInputLocationName = popupAddCard.querySelector('.popup__input_location-name');
const popupAddCardInputImageLink = popupAddCard.querySelector('.popup__input_image-link');
//попап открытия картинки
const popupOpenImage = page.querySelector('.popup_open-image');
const popupOpenImageButtonClose = popupOpenImage.querySelector('.popup__button-close_open-image');
const popupOpenImageImage = popupOpenImage.querySelector('.popup__image');
const popupOpenImageFigcaption = popupOpenImage.querySelector('.popup__figcaption');
//темплейт карточки
const sectionEl = document.querySelector('.elements');
const templateEl = document.querySelector('.template-element').content;

//массив с данными для заполнения карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

//функции
function openPopup(popupType) {
  popupType.classList.add('popup_opened');
};

function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
};

function handlePopup(evt) { //функция закрытия попапа по клику вне формы
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget)
  }
}

function fillInputValue() {
  popupChangeProfileName.value = profileTitle.textContent;
  popupChangeProfileSigning.value = profileSubtitle.textContent;
};
fillInputValue(); //вызываем функцию, чтобы значения инпутов сразу записались и сработала валидация кнопки при открытии попапа. чтобы кнопка Сохранить была активна сразу

function handlePopupChangeProfile() { //колбэк попапа изменения профиля
  fillInputValue();
  openPopup(popupChangeProfile);
};

function handlePopupAddCard() { //колбэк попапа добавления карточки
  openPopup(popupAddCard);
};

function render() { //функция отображения собранной карточки в html
  const html = initialCards.map(getItem);

  sectionEl.append(...html);
}

function getItem(item) { //функция сбора карточки из темплейта
  const newItem = templateEl.cloneNode(true); // заготовка карточки
  const newItemLink = newItem.querySelector('.element__image');
  newItemLink.src = item.link; //добавляем линк
  const newItemAlt = newItem.querySelector('.element__image');
  newItemAlt.alt = `Картинка ${item.name}`; //добавляем alt
  const newItemTitle = newItem.querySelector('.element__card-title');
  newItemTitle.textContent = item.name; //добавляем заголовок

  const cardDeleteButton = newItem.querySelector('.element__button-delete'); //кнопки удаления карточки
  cardDeleteButton.addEventListener('click', deleteCard);

  const cardLikeButton = newItem.querySelector('.element__button-like'); //кнопки лайка
  cardLikeButton.addEventListener('click', likeCard);

  newItemLink.addEventListener('click', function() { //кнопка раскрытия картинки
    openImage(item)
  });

  return newItem;
}

function openImage(item) { //функция сбора попапа картинки
  popupOpenImageImage.src = item.link;
  popupOpenImageImage.alt = item.name;
  popupOpenImageFigcaption.textContent = item.name;
  openPopup(popupOpenImage);
}

function deleteCard(evt) { //функция удаления карточки
  evt.target.closest('.element').remove();
  //const eventTarget = evt.target;
  //const deleteCard = eventTarget.closest('.element');
  //deleteCard.remove();
};

function likeCard(evt) { //функция лайка
  const eventTarget = evt.target;
  //const likeCard = eventTarget.closest('.element');
  //const like = likeCard.querySelector('.element__button-like');
  //like.classList.toggle('button-like_active');
  evt.target.classList.toggle('button-like_active');
};

// Обработчики форм
function formSubmitChangeProfile(evt) { //форма редактирования профиля
  evt.preventDefault();
  profileTitle.textContent = popupChangeProfileName.value;
  profileSubtitle.textContent = popupChangeProfileSigning.value;
  closePopup(popupChangeProfile);
};

function formSubmitAddCard(evt) { //форма добавления карточки
  evt.preventDefault();
  const values = ({name:popupAddCardInputLocationName.value, link:popupAddCardInputImageLink.value}); //значения из полей формы
  sectionEl.prepend(getItem(values));
  popupAddCardInputLocationName.value = ''; //очищаем поле Название после добавления карточки
  popupAddCardInputImageLink.value = ''; //очищаем поле Картинка после добавления карточки
  closePopup(popupAddCard);
};

//Слушатели
popupChangeProfile.addEventListener('click', handlePopup);
popupAddCard.addEventListener('click', handlePopup);
popupOpenImage.addEventListener('click', handlePopup);
popupChangeProfileForm.addEventListener('submit', formSubmitChangeProfile);
popupAddCard.addEventListener('submit', formSubmitAddCard);
profileChangeButton.addEventListener('click', handlePopupChangeProfile);
popupAddCardButtonOpen.addEventListener('click', handlePopupAddCard);
popupChangeProfileCloseButton.addEventListener('click', () => closePopup(popupChangeProfile));
popupAddCardButtonClose.addEventListener('click', () => closePopup(popupAddCard));
popupOpenImageButtonClose.addEventListener('click', () => closePopup(popupOpenImage));
render() //отображение карточек в html
