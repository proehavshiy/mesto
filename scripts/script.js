let page = document.querySelector('.page'); // берем под контроль весь page. все нужные элементы лежат внутри

let profileChangeButton = page.querySelector('.profile__change-button'); //берем кнопку редактирования автора

let popup = page.querySelector('.popup'); //берем весь попап c подложкой

let form = page.querySelector('.popup__container'); //форма
let formCloseButton = form.querySelector('.popup__button-close'); //кнопка-крестик
let formSaveButton = form.querySelector('.popup__button-save'); //кнопка-сохранить



//функция переключения(открытия/закрытия) попапа
function togglePopup() {
  popup.classList.toggle('popup_opened');
};
//при клике на кнопку редактирования профиля вызывается функция открытия попапа
profileChangeButton.addEventListener('click', togglePopup);
//при клике на кнопку-крестик в форме форма закрывается
formCloseButton.addEventListener('click', togglePopup);
//при клике на Сохранить в форме форма закрывается
formSaveButton.addEventListener('click', togglePopup);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault();
      // Получите значение полей jobInput и nameInput из свойства value
  let formProfileName = form.querySelector('.popup__profile-name').value; // поле формы Имя
  let formProfileSigning = form.querySelector('.popup__profile-signing').value; // поле формы Подпись
    // Выберите элементы, куда должны быть вставлены значения полей
  let profileTitle = document.querySelector('.profile__title');
  let profileSubtitle = document.querySelector('.profile__subtitle');
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = formProfileName;
    profileSubtitle.textContent = formProfileSigning;

};
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
form.addEventListener('submit', formSubmitHandler);
