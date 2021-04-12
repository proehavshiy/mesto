  // глобальный конфиг с настройками
export const config = {
  //страница
  pageSelector:'.page',
  openedPopupClass: 'popup_opened',
  openedPopupSelector: '.popup_opened',
  profileSectionSelector: '.profile',
  pageButtonSelector: '.page__button',
  pageButtonClass: 'page__button',
  profileAvatar: '.profile__avatar',
  profileTitleSelector: '.profile__title',
  profileSubtitleSelector: '.profile__subtitle',
  cardSectionSelector: '.elements',
  //универсальные для форм
  popupSelector: '.popup',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  closeButtonClass: 'popup__button-close',
  closeButtonSelector: '.popup__button-close',
  popupInputErrorClass:'popup__input_error',
  inputErrorClass: 'popup__input-error_type_',
  errorClass: 'popup__input-error_active',
  //попап редактирования профиля
  popupChangeProfileClass: 'popup_change-profile',
  popupChangeProfileSelector: '.popup_change-profile',
  popupChangeProfileInputNameSelector: '.popup__input_profile-name',
  popupChangeProfileInputSigningSelector: '.popup__input_profile-signing',
  submitButtonChangeProfileSelector: '.popup__button-save_change-profile',
  //попап добавления карточки
  popupAddCardClass: 'popup_add-card',
  popupAddCardSelector: '.popup_add-card',
  popupAddCardinputLocationNameSelector: '.popup__input_location-name',
  popupAddCardinputImageLinkSelector: '.popup__input_image-link',
  profileChangeButtonSelector: '.profile__change-button',
  cardAddButtonSelector: '.profile__add-button',
  submitButtonAddNewCardSelector: '.popup__button-save_add-card',
  //попап открытия карточки
  popupOpenImageSelector: '.popup_open-image',
  popupOpenImageImageSelector: '.popup__image',
  popupOpenImageFigcaptionSelector: '.popup__figcaption',
  //карточка
  sectionElementSelector: '.elements',
  templateElementSelector: '.template-element',
  templateCardBodySelector: '.element',
  templateImageClass: 'element__image',
  templateImageSelector: '.element__image',
  templateCardTitleSelector:'.element__card-title',
  templateDeleteButtonSelector:'.element__button-delete',
  templateLikeButtonSelector: '.element__button-like',
  cardLikeCounterSelector: '.element__like-counter',
  LikeIsActiveClass: 'button-like_active',
};
//глобальные константы
export const page = document.querySelector(config.pageSelector);
const popupChangeProfile = page.querySelector(config.popupChangeProfileSelector);
export const changeProfileButton = page.querySelector(config.profileChangeButtonSelector);
export const addCardButton = page.querySelector(config.cardAddButtonSelector);
export const popupChangeProfileInputName = popupChangeProfile.querySelector(config.popupChangeProfileInputNameSelector);
export const popupChangeProfileInputSigning = popupChangeProfile.querySelector(config.popupChangeProfileInputSigningSelector);
export const sectionElement = page.querySelector(config.sectionElementSelector);






