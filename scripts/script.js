//функции
function openPopup(popupType, config) {
  popupType.classList.add(config.Class_OpenedPopup);
  document.addEventListener('keyup', handlePopup); // добавляем слушатель для закрытия формы по esc
  popupType.addEventListener('click', handlePopup); // добавляем слушатель на клик для формы и ее дочерних элементов (для закрытия по клику по вне формы и по крестику. Тут работает всплытие)
};

function closePopup(popupType, config) {
  popupType.classList.remove(config.Class_OpenedPopup);
  document.removeEventListener('keyup', handlePopup); // удаляем слушатель для закрытия формы по esc
  popupType.removeEventListener('click', handlePopup); // удаляем слушатель на клик для формы и ее дочерних элементов (для закрытия по клику по вне формы и по крестику. Тут работает всплытие)
};

    function handlePopup(evt) { // обработчик типа закрытия формы
      const target = evt.target;
      const currentTarget = evt.currentTarget;
      const targetKey = evt.key;
      const OpenedPopup = currentTarget.querySelector(config.Selector_OpenedPopup);
      const CloseButton = currentTarget.querySelector(config.Selector_CloseButton);

      if (isOutFormClicked(target, currentTarget) || isButtonCloseClicked(target, CloseButton)) {
        closePopup(currentTarget, config);
      } else if (isKeyEscClicked(targetKey)) {
        closePopup(OpenedPopup, config);
      }
    };
        function isOutFormClicked(target, currentTarget) // по пустому полю вне формы
        {return target === currentTarget};
        function isButtonCloseClicked(target, CloseButton) // по крестику
        {return target === CloseButton};
        function isKeyEscClicked(targetKey) // по Esc
        {return targetKey === 'Escape'};


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
      const popupAddCardForm =  popupAddCard.querySelector(config.Selector_form);
      popupAddCardForm.reset();
    };

//функция отображения собранной карточки в html
function renderInitialCards(sectionElement, config) {
  const cards = initialCards.map((item) => getItem(item, config));

  sectionElement.append(...cards);
};

    //функция сбора карточки из темплейта
    function getItem(item, config) {
      const templateElement = document.querySelector(config.Selector_templateElement).content;
      const newItem = templateElement.cloneNode(true); // заготовка карточки
      const newItemLink = newItem.querySelector(config.Selector_templateImage);

      newItemLink.src = item.link; //добавляем линк
      const newItemAlt = newItem.querySelector(config.Selector_templateImage);
      newItemAlt.alt = `Картинка ${item.name}`; //добавляем alt
      const newItemTitle = newItem.querySelector(config.Selector_templateCardTitle);
      newItemTitle.textContent = item.name; //добавляем заголовок

      const cardDeleteButton = newItem.querySelector(config.Selector_templateDeleteButton); //кнопки удаления карточки
      cardDeleteButton.addEventListener('click', (evt) => deleteCard(evt, config));

      const cardLikeButton = newItem.querySelector(config.Selector_templateLikeButton); //кнопки лайка
      cardLikeButton.addEventListener('click', (evt) => likeCard(evt, config));

      newItemLink.addEventListener('click', () => openImage(item, config)); //кнопка раскрытия картинки

      return newItem;
    };
        //функция сбора попапа картинки
        function openImage(item, config) {
          const popupOpenImage = document.querySelector(config.Selector_popupOpenImage);
          const popupOpenImageImage = popupOpenImage.querySelector(config.Selector_popupOpenImageImage);
          const popupOpenImageFigcaption = popupOpenImage.querySelector(config.Selector_popupOpenImageFigcaption);

          fillpopupOpenImage(popupOpenImageImage, popupOpenImageFigcaption, item);
          openPopup(popupOpenImage, config);
        };
            // наполнение содержанием попапа открытия картинки
            function fillpopupOpenImage(popupOpenImageImage, popupOpenImageFigcaption, item) {
              popupOpenImageImage.src = item.link;
              popupOpenImageImage.alt = item.name;
              popupOpenImageFigcaption.textContent = item.name;
            };
        //функция удаления карточки
        function deleteCard(evt, config) {
          evt.target.closest(config.Selector_templateCardBody).remove();
          //const eventTarget = evt.target;
          //const deleteCard = eventTarget.closest('.element');
          //deleteCard.remove();
        };
        //функция лайка
        function likeCard(evt, config) {
          evt.target.classList.toggle(config.Class_LikeIsActive);
          //const eventTarget = evt.target;
          //const likeCard = eventTarget.closest('.element');
          //const like = likeCard.querySelector('.element__button-like');
          //like.classList.toggle('button-like_active');
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

  const InputLocationName = popupAddCard.querySelector(config.Selector_popupAddCardInputLocationName).value;
  const InputImageLink = popupAddCard.querySelector(config.Selector_popupAddCardInputImageLink).value;

  const values = ({name:InputLocationName, link:InputImageLink}); //значения из полей формы
  sectionElement.prepend(getItem(values, config));

  closePopup(popupAddCard, config);
};


function popupControl(config) {
  const page = document.querySelector(config.Selector_page);
  const popupChangeProfile = page.querySelector(config.Selector_popupChangeProfile);
  const popupAddCard = page.querySelector(config.Selector_popupAddCard);
  const changeProfileButton = page.querySelector(config.Selector_changeProfileButton);
  const AddCardButton = page.querySelector(config.Selector_AddCardButton);

  const profileTitle = page.querySelector(config.Selector_profileTitle);
  const profileSubtitle = page.querySelector(config.Selector_profileSubtitle);
  const popupChangeProfileInputName = popupChangeProfile.querySelector(config.Selector_popupChangeProfileInputName);
  const popupChangeProfileInputSigning = popupChangeProfile.querySelector(config.Selector_popupChangeProfileInputSigning);
  const sectionElement = document.querySelector(config.Selector_sectionElement);

  //Слушатели - точки входа
  popupChangeProfile.addEventListener('submit', (evt) => formSubmitChangeProfile(evt, popupChangeProfile, profileTitle, profileSubtitle, popupChangeProfileInputName, popupChangeProfileInputSigning, config));
  popupAddCard.addEventListener('submit', (evt) => formSubmitAddCard(evt, popupAddCard, sectionElement, config));
  changeProfileButton.addEventListener('click', () => handlePopupChangeProfile(popupChangeProfile, profileTitle, profileSubtitle, popupChangeProfileInputName, popupChangeProfileInputSigning, config));
  AddCardButton.addEventListener('click', () => handlePopupAddCard(popupAddCard, config));

  renderInitialCards(sectionElement, config) //отображение карточек в html
};

// конфиг с настройками
const config = {
  //страница
  Selector_page:'.page',
  Class_OpenedPopup: 'popup_opened',
  Selector_OpenedPopup: '.popup_opened',
  Selector_profileTitle: '.profile__title',
  Selector_profileSubtitle: '.profile__subtitle',
  //универсальные
  Selector_form: '.popup__form',
  Selector_CloseButton: '.popup__button-close',
  //попап редактирования профиля
  Selector_popupChangeProfile: '.popup_change-profile',
  Selector_popupChangeProfileInputName: '.popup__input_profile-name',
  Selector_popupChangeProfileInputSigning: '.popup__input_profile-signing',
  //попап добавления карточки
  Selector_popupAddCard: '.popup_add-card',
  Selector_popupAddCardInputLocationName: '.popup__input_location-name',
  Selector_popupAddCardInputImageLink: '.popup__input_image-link',
  Selector_changeProfileButton: '.profile__change-button',
  Selector_AddCardButton: '.profile__add-button',
  //попап открытия карточки
  Selector_popupOpenImage: '.popup_open-image',
  Selector_popupOpenImageImage: '.popup__image',
  Selector_popupOpenImageFigcaption: '.popup__figcaption',
  //карточка
  Selector_sectionElement: '.elements',
  Selector_templateElement: '.template-element',
  Selector_templateCardBody: '.element',
  Selector_templateImage: '.element__image',
  Selector_templateCardTitle:'.element__card-title',
  Selector_templateDeleteButton:'.element__button-delete',
  Selector_templateLikeButton: '.element__button-like',
  Class_LikeIsActive: 'button-like_active',
};
popupControl(config);
