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



