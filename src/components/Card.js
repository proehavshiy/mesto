import { config } from '../utils/constants.js';

export class Card {
  constructor ({name, link, likes, owner, _id}, handleCardClick, handleDeleteCard) {
    this._name = name;
    this._link = link;
    this._likes = likes.length;
    this.ownerId = owner._id; //"b939b1d8959802541ab0c34b"
    this.cardId = _id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
  }
  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners(this._cardElement); //устанавливаем все лисенеры в карточке
    this._cardElement.querySelector(config.templateImageSelector).src = this._link; //добавляем линк
    this._cardElement.querySelector(config.templateImageSelector).alt = `Картинка ${this._name}`; //добавляем alt
    this._cardElement.querySelector(config.templateCardTitleSelector).textContent = this._name; //добавляем заголовок
    this._cardElement.querySelector(config.cardLikeCounterSelector).textContent = this._likes; //добавляем кол-во лайков карточке
    //если владелец карточки не я, то удаляем кнопку "удалить"
    if(this.ownerId !== "b939b1d8959802541ab0c34b") {
      this._cardElement.querySelector(config.templateDeleteButtonSelector).style.display = "none";
    }

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
    //лисенер на кнопку удаления карточки
    if(this.ownerId === "b939b1d8959802541ab0c34b") {
      const _cardDeleteButton = card.querySelector(config.templateDeleteButtonSelector); //кнопка удаления карточки
      //_cardDeleteButton.addEventListener('click', (evt) => this._deleteCard(evt));
      //Удаляем карточку с сервера по клику на кнопку
      _cardDeleteButton.addEventListener('click', (evt) => this._handleDeleteCard({
        name: this._name,
        link: this._link
      }, this.cardId)
      .then(result => {
        console.log(result);
        //удаляем карточку со страницы
        this._deleteCard(evt);
      })
      .catch(err => {
        console.log(err)
      }));
    }

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
