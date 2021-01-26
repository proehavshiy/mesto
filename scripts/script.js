let page = document.querySelector('.page'); // берем под контроль весь page. все нужные элементы лежат внутри
let profileChangeButton = page.querySelector('.profile__change-button'); //берем кнопку редактирования автора
let popup = page.querySelector('.popup'); //берем весь попап c подложкой
let form = popup.querySelector('.popup__container'); //форма
let formCloseButton = popup.querySelector('.popup__button-close'); //кнопка-крестик
let formSaveButton = form.querySelector('.popup__button-save'); //кнопка-сохранить

//функция переключения (открытия/закрытия) попапа
function togglePopup() {
  popup.classList.toggle('popup_opened');
};

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  let formProfileName = form.querySelector('.popup__profile-name'); // поле формы Имя
  let formProfileSigning = form.querySelector('.popup__profile-signing'); // поле формы Подпись
  // Выберите элементы, куда должны быть вставлены значения полей
  let profileTitle = page.querySelector('.profile__title');
  let profileSubtitle = page.querySelector('.profile__subtitle');
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = formProfileName.value;
  profileSubtitle.textContent = formProfileSigning.value;
  togglePopup();
};
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
form.addEventListener('submit', formSubmitHandler);
//при клике на кнопку редактирования профиля вызывается функция открытия попапа
profileChangeButton.addEventListener('click', togglePopup);
//при клике на Крестик в форме форма закрывается
formCloseButton.addEventListener('click', togglePopup);
