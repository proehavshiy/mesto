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
  }  else if (eventTarget === popupAddCardButtonAdd) {
     popupAddCard.classList.add('popup_opened');
  }
};
//функция закрытия попапа
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
// #1. Шесть карточек «из коробки»
// 1. получаем содержимое темплейта
const elementTemplate = document.querySelector('.template-element').content;
// 2. получаем под контроль секцию elements, куда будем добавлять заполненную карточку
const sectionElements = document.querySelector('.elements');

// 3. наполняем elementCard содержимым из initialCards: картинка, альт картинки, заголовок через метод forEach для каждого эллемента массива
initialCards.forEach( function (item, itemIndex) {
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);// создаем из темплейта заготовку под карточку со всем содержимым внутри(дочерними элементами), которую нужно будет заполнить
  elementCard.querySelector('.element__image').src = initialCards[itemIndex].link; //добавляем линк
  elementCard.querySelector('.element__image').alt = `Картинка ${initialCards[itemIndex].name}`; //добавляем alt
  elementCard.querySelector('.element__card-title').textContent = initialCards[itemIndex].name; //добавляем заголовок
  return sectionElements.append(elementCard); // добавляем карточки в sectionElements в DOM
});

// #2. Форма добавления карточки
const popupAddCard = page.querySelector('.popup_add-card'); //форма добавления карточки
const popupAddCardButtonAdd = page.querySelector('.profile__add-button'); //кнопка добавления карточки
const popupAddCardButtonClose = popupAddCard.querySelector('.popup__button-close_add-card'); //форма добавления карточки - кнопка-крестик
const popupAddCardInputLocationName = popupAddCard.querySelector('.popup__input_location-name'); // форма добавления карточки - поле Название места
const popupAddCardInputImageLink = popupAddCard.querySelector('.popup__input_image-link'); // форма добавления карточки - Ссылка на картинку

popupAddCardButtonAdd.addEventListener('click', openPopup);
popupAddCardButtonClose.addEventListener('click', closePopup);

// Обработчик «отправки» формы
function formSubmitHandlerAddCard (evt) {
  evt.preventDefault();
  //initialCards.unshift({name: popupAddCardInputLocationName.value, link: popupAddCardInputImageLink.value});
  addCards();
  popupAddCardInputLocationName.value = ''; //очищаем поле Название после добавления карточки
  popupAddCardInputImageLink.value = ''; //очищаем поле Картинка после добавления карточки
  closePopup();
};
popupAddCard.addEventListener('submit', formSubmitHandlerAddCard);

function addCards() { //функция добавления карточки по данным из формы
  const inputLocatinName = popupAddCardInputLocationName.value;
  const inputImageLink = popupAddCardInputImageLink.value;
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);// создаем из темплейта заготовку под карточку со всем содержимым внутри(дочерними элементами), которую нужно будет заполнить
  elementCard.querySelector('.element__image').src = inputImageLink; //добавляем линк
  elementCard.querySelector('.element__image').alt = `Картинка ${inputLocatinName}`; //добавляем alt
  elementCard.querySelector('.element__card-title').textContent = inputLocatinName; //добавляем заголовок
  sectionElements.prepend(elementCard); // добавляем карточку в sectionElements в DOM в начало
}

console.log(initialCards);
//console.log(initialCards[0].name);
