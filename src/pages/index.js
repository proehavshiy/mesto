import { initialCards } from '../utils/initial-сards.js';
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
//import './index.css';

//запрос к api
const apiConnection = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1',
  cohort: 'cohort-22',
  token: 'a039ff03-9c34-4fce-91e0-77cd409474e3'
})



//функционал отрисовки карточек из API
apiConnection.getCards()
.then(serverCardsData => {
  console.log('api-получаем изначальные карточки для отображения-результат-все карточки сервера',serverCardsData)
  const cardDisplay = new Section({
    //сюда нужно передать из апи name и link, likes // initialCards
    items: serverCardsData,
    renderer: (item) => {
      const newCard = createCard(item); //создание изначальных карточек
      cardDisplay.appendItem(newCard); //вставка изначальных карточек
      }
    }, sectionElement);
  cardDisplay.renderItems();
})
.catch(err => {
  console.log('error')
})

const popupDeletionConfirm = new PopupWithForm({
  popupSelector: config.popupDeletionConfirmSelector,
  handleForm: () => {}
})

var cardToRemove = null;


//функция сборки готовой карточки
function createCard(cardData) {
  //лайк карточки
  const handledeleteLike = apiConnection.deleteLikeCard.bind(apiConnection);
  const handleAddLike = apiConnection.addLikeCard.bind(apiConnection);
  //удаление карточки с сервера
  const handleDeleteCard = apiConnection.deleteCard.bind(apiConnection);
  //как handleCardClick передаем метод open popupWithImage. чтобы получить картинку и подпись карточки и подставить их в попап
  const handleCardClick = popupWithImage.open.bind(popupWithImage); //потеря контекста. эта функция навешивается как колбэк слушателю картинки карточки. И this будет определяться как картинка, куда мы кликнем
  const newCard = new Card (cardData, handleCardClick, handleDeleteCard, handleAddLike, handledeleteLike);
  return newCard.generateCard();
  };
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
    apiConnection.sendNewCard({
      name: formInputValues['location-name'],
      link: formInputValues['image-link']
    })
    .then(cardInfo => {
      console.log('api-попап добавления карточки-результат-новая карточка',cardInfo)
      const newCard = createCard(cardInfo);//через колбэк создаем новую карточку с данными из инпутов формы
      //{name:cardInfo.name, link:cardInfo.link, likes:cardInfo.likes, owner:cardInfo.owner}
      const newCardDisplay = new Section({
        items: cardInfo,
        renderer: () => {}
      },
        sectionElement);
      newCardDisplay.prependItem(newCard); //вставка новой карточки
    })
    .catch(error => {
      console.log(error)
    })
    popupAddCard.close();
  }
});

//попап редактирования аватара
const popupChangeAvatar = new PopupWithForm({
  popupSelector: config.popupChangeAvatarSelector,
  handleForm: (formInputValues) => {
    apiConnection.sendUserAvatar({
      newAvatarLink: formInputValues['image-link']
    })
    .then(newAvatar => {
      console.log('api-редактирование аватара-результат:', newAvatar)
      changingProfileInfo.setUserInfo({
        name: newAvatar.name,
        signing: newAvatar.about,
        avatar: newAvatar.avatar
      })
      popupChangeAvatar.close();
    })
    .catch(error => {
      console.log(error)
    })
  }
})

//попап редактирования профиля
const popupChangeProfile = new PopupWithForm({
  popupSelector: config.popupChangeProfileSelector,
  handleForm: (formInputValues) => {
    //обновление данных профиля страницы из инпутов формы при сабмите + отправка их на сервер по api
    apiConnection.sendUserInfo({
      newName: formInputValues['profile-name'],
      newAbout: formInputValues['profile-signing']
    })
    .then(userInfo => {
      console.log('api-редактирование профиля-результат', userInfo)
      changingProfileInfo.setUserInfo({name:userInfo.name, signing:userInfo.about, avatar: userInfo.avatar});
    })
    .catch(error => {
      console.log(error)
    })
    popupChangeProfile.close();
  }
});

// данные для попапа редактирования профиля
const changingProfileInfo = new UserInfo({
  profileTitleSelector: config.profileTitleSelector,
  profileSubtitleSelector: config.profileSubtitleSelector,
  avatar: config.profileAvatar
});

//получаем данные профиля по api и отображаем их на странице
apiConnection.getUserInfo()
.then(userInfo => {
  changingProfileInfo.setUserInfo({
    name: userInfo.name,
    signing: userInfo.about,
    avatar: userInfo.avatar
  })
})
.catch(error => {
  console.log("ошибка! получить данные имя и профиль не вышло");
})


//колбэк попапа изменения профиля
function handlePopupChangeProfile() {
  //вызываем функцию, чтобы при переоткрытии снова подставились значения
  fillInputValue();
  popupChangeProfile.open();
};

// заполнение полей формы редактир профиля при открытии
function fillInputValue() {
  const formValues = changingProfileInfo.getUserInfo(); //объект с данными из профиля для заполнения полей
  popupChangeProfileInputName.value = formValues.inputName;
  popupChangeProfileInputSigning.value = formValues.inputSigning;
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
  popupChangeAvatar.setEventListeners();

  //отображение карточек в html
  //cardDisplay.renderItems();

  //подключение валидации формам
  const formList = Array.from(document.querySelectorAll(config.formSelector));//получаем массив из всех форм на странице
  formList.forEach((formElement) => {
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



//Токен: a039ff03-9c34-4fce-91e0-77cd409474e3
//Идентификатор группы: cohort-22
//fetch('https://mesto.nomoreparties.co/v1/cohort-22/users/me', {
//  headers: {
//    authorization: 'a039ff03-9c34-4fce-91e0-77cd409474e3'
//  }
//})
//  .then(res => res.json())
//  .then((result) => {
//    console.log(result);
//  });
