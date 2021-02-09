let page = document.querySelector('.page'); // берем под контроль весь page. все нужные элементы лежат внутри
let profileChangeButton = page.querySelector('.profile__change-button'); //кнопка редактирования автора
let popup = page.querySelector('.popup_change-profile'); //попап изменения профиля

let form = popup.querySelector('.popup__container_change-profile'); //форма изменения профиля
let formCloseButton = form.querySelector('.popup__button-close_change-profile'); //форма изменения профиля кнопка-крестик
let formProfileName = form.querySelector('.popup__input_profile-name'); // форма изменения профиля поле Имя
let formProfileSigning = form.querySelector('.popup__input_profile-signing'); // форма изменения профиля поле Подпись

let profileTitle = page.querySelector('.profile__title'); //поле - имя профиля
let profileSubtitle = page.querySelector('.profile__subtitle'); // поле - подпись профиля

//функция открытия попапов
function openPopup(evt) {
  const eventTarget = evt.target;
  if (eventTarget === profileChangeButton) {
     popup.classList.add('popup_opened');
     formProfileName.value = profileTitle.textContent;//в поля формы передаются значения из html-полей при открытии попапа
     formProfileSigning.value = profileSubtitle.textContent;//в поля формы передаются значения из html-полей при открытии попапа
  }  else if (eventTarget === popupAddCardButtonOpen) {
    popupAddCard.classList.add('popup_opened');
  }
};
//функция закрытия попапов
function closePopup() {
  popup.classList.remove('popup_opened');
  popupAddCard.classList.remove('popup_opened');
};

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = formProfileName.value; // вставка текста в поле - имя профиля из формы - поле Имя
  profileSubtitle.textContent = formProfileSigning.value; // вставка текста в поле - подпись профиля  из формы - поле Подпись
  closePopup();
};
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
form.addEventListener('submit', formSubmitHandler);
//при клике на кнопку редактирования профиля вызывается функция открытия попапа
profileChangeButton.addEventListener('click', openPopup);
//при клике на Крестик в форме форма закрывается
formCloseButton.addEventListener('click', closePopup);

// 0. массив с данными для заполнения карточек
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

const sectionEl = document.querySelector('.elements'); //секция elements, куда будем добавлять заполненную карточку
const templateEl = document.querySelector('.template-element').content; //содержимое темплейта

const popupAddCard = page.querySelector('.popup_add-card'); //форма добавления карточки
const popupAddCardButtonOpen = page.querySelector('.profile__add-button'); //кнопка добавления карточки
const popupAddCardButtonClose = popupAddCard.querySelector('.popup__button-close_add-card'); //форма добавления карточки - кнопка-крестик
const popupAddCardInputLocationName = popupAddCard.querySelector('.popup__input_location-name'); // форма добавления карточки - поле Название места
const popupAddCardInputImageLink = popupAddCard.querySelector('.popup__input_image-link'); // форма добавления карточки - Ссылка на картинку




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

  const cardLikeButton = newItem.querySelector('.element__button-like');
  cardLikeButton.addEventListener('click', likeCard);

  return newItem;
}

function deleteCard(evt) { //функция удаления карточки
  const eventTarget = evt.target;
  const deleteCard = eventTarget.closest('.element');
  deleteCard.remove();
};

function likeCard(evt) { //функция лайка
  const eventTarget = evt.target;
  const likeCard = eventTarget.closest('.element');
  const like = likeCard.querySelector('.element__button-like');
  like.classList.toggle('button-like_active');
};

// Обработчик «отправки» формы
function formSubmitAddCard (evt) {
  evt.preventDefault();
  const values = ({name:popupAddCardInputLocationName.value, link:popupAddCardInputImageLink.value}); //значения из полей формы
  sectionEl.prepend(getItem(values));
  popupAddCardInputLocationName.value = ''; //очищаем поле Название после добавления карточки
  popupAddCardInputImageLink.value = ''; //очищаем поле Картинка после добавления карточки
  closePopup();
};


popupAddCard.addEventListener('submit', formSubmitAddCard);
popupAddCardButtonOpen.addEventListener('click', openPopup);
popupAddCardButtonClose.addEventListener('click', closePopup);
render() //отображение карточек в html
