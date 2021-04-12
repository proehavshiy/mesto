import { config } from '../utils/constants.js';

export class Card {
  constructor ({name, link, likes}, handleCardClick) {
    this._name = name;
    this._link = link;
    this._likes = likes.length;
    this._handleCardClick = handleCardClick;
  }
  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners(this._cardElement); //устанавливаем все лисенеры в карточке
    this._cardElement.querySelector(config.templateImageSelector).src = this._link; //добавляем линк
    this._cardElement.querySelector(config.templateImageSelector).alt = `Картинка ${this._name}`; //добавляем alt
    this._cardElement.querySelector(config.templateCardTitleSelector).textContent = this._name; //добавляем заголовок
    this._cardElement.querySelector(config.cardLikeCounterSelector).textContent = this._likes; //добавляем кол-во лайков карточке

    this._cardElement.style.animationDelay = ".2s";

    return  this._cardElement;
  }
  _getTemplate() {
    const _templateElement = document
    .querySelector(config.templateElementSelector)
    .content
    .querySelector(config.templateCardBodySelector)
    .cloneNode(true);

    return _templateElement;
  }
  _setEventListeners(card) {
    const _cardDeleteButton = card.querySelector(config.templateDeleteButtonSelector); //кнопка удаления карточки
    _cardDeleteButton.addEventListener('click', (evt) => this._deleteCard(evt));
    const _cardLikeButton = card.querySelector(config.templateLikeButtonSelector); //кнопки лайка
    _cardLikeButton.addEventListener('click', (evt) => this._likeCard(evt));
    const _cardImage = card.querySelector(config.templateImageSelector);
    _cardImage.addEventListener('click', ()=> {
      this._handleCardClick(this._name, this._link);
    })
  }
  _deleteCard(evt) {
    evt.target.closest(config.templateCardBodySelector).remove();
  }
  _likeCard(evt) {
    evt.target.classList.toggle(config.LikeIsActiveClass);
  }
}
