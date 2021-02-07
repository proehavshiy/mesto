let page = document.querySelector('.page'); // берем под контроль весь page. все нужные элементы лежат внутри
let profileChangeButton = page.querySelector('.profile__change-button'); //кнопка редактирования автора
let popup = page.querySelector('.popup'); //весь попап c подложкой

let form = popup.querySelector('.popup__container'); //форма
let formCloseButton = form.querySelector('.popup__button-close'); //форма кнопка-крестик
let formProfileName = form.querySelector('.popup__input_profile-name'); // форма поле Имя
let formProfileSigning = form.querySelector('.popup__input_profile-signing'); // форма поле Подпись

let profileTitle = page.querySelector('.profile__title'); //поле - имя профиля
let profileSubtitle = page.querySelector('.profile__subtitle'); // поле - подпись профиля

//функция открытия попапа
function openPopup() {
  popup.classList.add('popup_opened');
  //в поля формы передаются значения из html-полей при открытии попапа
  formProfileName.value = profileTitle.textContent;
  formProfileSigning.value = profileSubtitle.textContent;
};
//функция закрытия попапа
function closePopup() {
  popup.classList.remove('popup_opened');
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
  // создаем из темплейта заготовку под карточку со всем содержимым внутри(дочерними элементами), которую нужно будет заполнить
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  elementCard.querySelector('.element__image').src = initialCards[itemIndex].link; //добавляем линк
  elementCard.querySelector('.element__image').alt = `Картинка ${initialCards[itemIndex].name}`; //добавляем alt
  elementCard.querySelector('.element__card-title').textContent = initialCards[itemIndex].name; //добавляем заголовок
  return sectionElements.append(elementCard); // добавляем карточку в sectionElements в DOM
});

//elementCard.querySelector('.element__image').src = initialCards[1].link; //добавляем линк
//elementCard.querySelector('.element__image').alt = initialCards[1].name; //добавляем alt
//elementCard.querySelector('.element__card-title').textContent = initialCards[1].name; //добавляем заголовок
// 5. добавляем карточку в sectionElements в DOM
//sectionElements.append(elementCard);
//console.log(elementCard);
