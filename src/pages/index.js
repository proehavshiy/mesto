import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import {
  config,
  page,
  profileAvatarButton,
  changeProfileButton,
  addCardButton,
  popupChangeProfileInputName,
  popupChangeProfileInputSigning,
  sectionElement
} from '../utils/constants.js';
////////////////////ВКЛЮЧИТЬ ПОТОМ ПЕРЕД СБОРКОЙ ВЕБПАКОМ!!!!
import './index.css';

//запрос к api
const apiConnection = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1',
  cohort: 'cohort-22',
  token: 'a039ff03-9c34-4fce-91e0-77cd409474e3'
})

//через Promise.all одновременно получаем данные профиля и карточки
apiConnection.getPromiseAll(apiConnection.getUserInfo(), apiConnection.getCards())
.then(serverData => {
  console.log("Promise.all - массив результат", serverData)
  //получаем данные профиля по api и отображаем их на странице
  console.log('получаем данные профиля по api и отображаем их на странице:ok',serverData[0])
  //отображаем в разметке юзернейм и подпись с сервера
  changingProfileInfo.setUserInfo({
    name: serverData[0].name,
    signing: serverData[0].about
  });
  //отображаем в разметке аватар с сервера
  changingProfileInfo.setUserAvatar(serverData[0].avatar);

  //функционал отрисовки карточек из API
  console.log('api-получаем изначальные карточки для отображения-результат-все карточки сервера:ok',serverData[1])
  console.log('api-получаем айди нашего пользователя для сбора карточки-результат-b939b1d8959802541ab0c34b:ok',serverData[0]._id)
  //создаем и рендерим изначальные карточки на страницу
  const cardRenderer = cardDisplay({
    items: serverData[1],
    renderer: (item) => {
      const newCard = createCard(item, serverData[0]._id); //создание изначальных карточек
      cardRenderer.appendItem(newCard); //вставка изначальных карточек
    }
  }, sectionElement)
  cardRenderer.renderItems();
  //const cardDisplay = new Section({
  //  //сюда нужно передать из апи name и link, likes // initialCards
  //  items: serverData[1],
  //  renderer: (item) => {
  //    const newCard = createCard(item, serverData[0]._id); //создание изначальных карточек
  //    cardDisplay.appendItem(newCard); //вставка изначальных карточек
  //    }
  //  }, sectionElement);
  //отображаем карточки на странице
  //cardDisplay.renderItems();
})
.catch(err => {
  console.log("Promise.all - ошибка", err)
  console.log('получаем данные профиля по api и отображаем их на странице и api-получаем изначальные карточки для отображения-результат-все карточки сервера:error', err)
})


//функционал отрисовки карточек из API
//apiConnection.getCards()
//.then(serverCardsData => {
//  //console.log('api-получаем изначальные карточки для отображения-результат-все карточки сервера:ok',serverCardsData)
//  const cardDisplay = new Section({
//    //сюда нужно передать из апи name и link, likes // initialCards
//    items: serverCardsData,
//    renderer: (item) => {
//      const newCard = createCard(item); //создание изначальных карточек
//      cardDisplay.appendItem(newCard); //вставка изначальных карточек
//      }
//    }, sectionElement);
//  cardDisplay.renderItems();
//})
//.catch(err => {
//  console.log('api-получаем изначальные карточки для отображения-результат-все карточки сервера:error', err)
//})

//получаем данные профиля по api и отображаем их на странице
//apiConnection.getUserInfo()
//.then(userInfo => {
//  changingProfileInfo.setUserInfo({
//    name: userInfo.name,
//    signing: userInfo.about,
//    avatar: userInfo.avatar
//  })
//})
//.catch(error => {
//  console.log(error);
//})

//временные переменные для удаления карточки с сервера и со страницы
var cardDataToRemove = null;
var cardToRemove = null;

const PopupDeleteCard = new PopupWithForm ({
  popupSelector: config.popupDeletionConfirmSelector,
  handleForm: () => {
    //кнопка в момент ожидания сервера
    renderIsLoading(PopupDeleteCard.submitButton, PopupDeleteCard.submitButtonInitialText, true);
    //удаление карточки с сервера
    apiConnection.deleteCard(cardDataToRemove._id)
    .then(result => {
      //удаление карточки со страницы поиском по closest. Целая карточка не удаляется почему-то
      cardToRemove.closest(config.templateCardBodySelector).remove();
      PopupDeleteCard.close();
    })
    .catch(err => {
      console.log("PopupDeleteCard - удаление: error", err)
    })
    .finally(() => {
      //возвращаем изначальную кнопку
      renderIsLoading(PopupDeleteCard.submitButton, PopupDeleteCard.submitButtonInitialText, false);
    })
  }
})

//функция сборки готовой карточки
function createCard(cardData, userId) {
  //лайк карточки
  const handledeleteLike = apiConnection.deleteLikeCard.bind(apiConnection);
  const handleAddLike = apiConnection.addLikeCard.bind(apiConnection);
  //удаление карточки с сервера и со страницы
  const handleDeleteCard = (createdCard) => {
    PopupDeleteCard.open();
    cardDataToRemove = cardData;
    cardToRemove = createdCard;
  }
  //как handleCardClick передаем метод open popupWithImage. чтобы получить картинку и подпись карточки и подставить их в попап
  const handleCardClick = popupWithImage.open.bind(popupWithImage); //потеря контекста. эта функция навешивается как колбэк слушателю картинки карточки. И this будет определяться как картинка, куда мы кликнем
  const newCard = new Card (cardData, userId, handleCardClick, handleDeleteCard, handleAddLike, handledeleteLike);
  return newCard.generateCard();
  };

//функция для отображения карточки на странице
function cardDisplay(data, sectionElement) {
  const cardDisplay = new Section({
    items: data.items,
    renderer: data.renderer,
  }, sectionElement);
  return cardDisplay
}

//функционал отрисовки карточек
//const cardDisplay = new Section({
//  //сюда нужно передать из апи name и link // initialCards
//  items: initialCards,
//  renderer: (item) => {
//    const newCard = createCard(item); //создание изначальных карточек
//    cardDisplay.appendItem(newCard); //вставка изначальных карточек
//    }
//  }, sectionElement);

//попап с картинкой
const popupWithImage = new PopupWithImage(config.popupOpenImageSelector);

//попап добавления карточки
const popupAddCard = new PopupWithForm({
  popupSelector: config.popupAddCardSelector,
  handleForm: (formInputValues) => {
    //кнопка в момент ожидания сервера
    renderIsLoading(popupAddCard.submitButton, popupAddCard.submitButtonInitialText, true);
    apiConnection.sendNewCard({
      name: formInputValues['location-name'],
      link: formInputValues['image-link']
    })
    .then(cardInfo => {
      console.log('api-попап добавления карточки-результат-новая карточка: ok',cardInfo)
      console.log('api-попап добавления карточки-результат-cardInfo.owner._id = b939b1d8959802541ab0c34b',cardInfo.owner._id)
      const newCard = createCard(cardInfo, cardInfo.owner._id);//через колбэк создаем новую карточку с данными из инпутов формы
      //собираем новую карточку и рендерим ее на страницу
      const cardRenderer = cardDisplay({
        items: cardInfo,
        renderer: () => {}
      }, sectionElement)
      cardRenderer.prependItem(newCard); //вставка новой карточки
      popupAddCard.close();
      //const newCardDisplay = new Section({
      //  items: cardInfo,
      //  renderer: () => {}
      //},
      //  sectionElement);
      //newCardDisplay.prependItem(newCard); //вставка новой карточки
    })
    .catch(error => {
      console.log('api-попап добавления карточки-результат-новая карточка: error', error)
    })
    .finally(() => {
      //возвращаем изначальную кнопку
      renderIsLoading(popupAddCard.submitButton, popupAddCard.submitButtonInitialText, false);
    })
  }
});

//попап редактирования аватара
const popupChangeAvatar = new PopupWithForm({
  popupSelector: config.popupChangeAvatarSelector,
  handleForm: (formInputValues) => {
    //кнопка в момент ожидания сервера
    renderIsLoading(popupChangeAvatar.submitButton, popupChangeAvatar.submitButtonInitialText, true);
    apiConnection.sendUserAvatar({
      newAvatarLink: formInputValues['image-link']
    })
    .then(newAvatar => {
      console.log('api-редактирование аватара: ok', newAvatar)
      //меняем аватар в разметке на новый
      changingProfileInfo.setUserAvatar(newAvatar.avatar);
      popupChangeAvatar.close();
    })
    .catch(error => {
      console.log('api-редактирование аватара: ok', error)
    })
    .finally(() => {
      //возвращаем изначальную кнопку
      renderIsLoading(popupChangeAvatar.submitButton, popupChangeAvatar.submitButtonInitialText, false);
    })
  }
})

//попап редактирования профиля
const popupChangeProfile = new PopupWithForm({
  popupSelector: config.popupChangeProfileSelector,
  handleForm: (formInputValues) => {
    //кнопка в момент ожидания сервера
    renderIsLoading(popupChangeProfile.submitButton, popupChangeProfile.submitButtonInitialText, true);
    //обновление данных профиля страницы из инпутов формы при сабмите + отправка их на сервер по api
    apiConnection.sendUserInfo({
      newName: formInputValues['profile-name'],
      newAbout: formInputValues['profile-signing']
    })
    .then(userInfo => {
      console.log('api-редактирование профиля: ok', userInfo)
      //меняем юзернейм и подпись в разметке на новые
      changingProfileInfo.setUserInfo({
        name: userInfo.name,
        signing: userInfo.about
      });
      popupChangeProfile.close();
    })
    .catch(error => {
      console.log('api-редактирование профиля: error', error)
    })
    .finally(() => {
      //возвращаем изначальную кнопку
      renderIsLoading(popupChangeProfile.submitButton, popupChangeProfile.submitButtonInitialText, false);
    })
  }
});

// данные для попапа редактирования профиля
const changingProfileInfo = new UserInfo({
  profileTitleSelector: config.profileTitleSelector,
  profileSubtitleSelector: config.profileSubtitleSelector,
  avatar: config.profileAvatar
});

////получаем данные профиля по api и отображаем их на странице
//apiConnection.getUserInfo()
//.then(userInfo => {
//  changingProfileInfo.setUserInfo({
//    name: userInfo.name,
//    signing: userInfo.about,
//    avatar: userInfo.avatar
//  })
//})
//.catch(error => {
//  console.log(error);
//})

// функция отображения состояния сабмита кнопки во время ожидания данных с сервера
function renderIsLoading(button, initialButtonText, isLoading) {
  if(isLoading) {
    button.textContent = `Сохранение...`;
  } else {
    button.textContent = initialButtonText;
  }
}

// заполнение полей формы редактир профиля при открытии
function fillInputValue() {
  const formValues = changingProfileInfo.getUserInfo(); //объект с данными из профиля для заполнения полей
  popupChangeProfileInputName.value = formValues.inputName;
  popupChangeProfileInputSigning.value = formValues.inputSigning;
};

//колбэк попапа изменения профиля
function handlePopupChangeProfile() {
  //вызываем функцию, чтобы при переоткрытии снова подставились значения
  fillInputValue();
  popupChangeProfile.open();
};

//колбэк открытия попапа добавления карточки
function handlePopupAddCard() {
  popupAddCard.open()
};

//колбэк открытия попапа редактирования аватара
function handlePopupAvatar() {
  popupChangeAvatar.open()
};

function managePopup() {
  //Слушатели - кнопки
  changeProfileButton.addEventListener('click', () => handlePopupChangeProfile());
  addCardButton.addEventListener('click', () => handlePopupAddCard());
  profileAvatarButton.addEventListener('click', () => handlePopupAvatar());
  //Слушатели - попапы
  popupWithImage.setEventListeners();
  popupAddCard.setEventListeners();
  popupChangeProfile.setEventListeners();
  PopupDeleteCard.setEventListeners();
  popupChangeAvatar.setEventListeners();

  //подключение валидации формам
  const formList = Array.from(document.querySelectorAll(config.formSelector));//получаем массив из всех форм на странице
  formList.forEach((formElement) => {
    //если у попапа есть кнопка открытия, тогда включаем валидацию формы
    if (page.querySelector(`.${formElement.name}-open-button`)) {
      const openButton = page.querySelector(`.${formElement.name}-open-button`);

      const formValidation = new FormValidator (config, formElement);
      //слушатель на кнопку открытия попапа для очистки ошибок в полях форм при открытии.
      //Биндим, чтобы не потерять контекст
      openButton.addEventListener('click', formValidation.hideInputErrors.bind(formValidation));
      //слушатель на кнопку открытия попапа для изменения состояния кнопки
      // сабмита формы в зависимости от валидации инпутов
      //Биндим, чтобы не потерять контекст
      openButton.addEventListener('click', formValidation.toggleButtonState.bind(formValidation));
      formValidation.enableValidation();
    }
  });
};

managePopup();

