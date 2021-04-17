import { config } from '../utils/constants.js';

export class Card {
  constructor ({name, link, likes, owner, _id}, userId, handleCardClick, handleDeleteCard, handleAddLike, handledeleteLike) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    //console.log('this._likes', this._likes);
    this._likesLength = likes.length;
    this._owner = owner;
    //console.log('owner', this._owner)
    this.ownerId = owner._id; //айди владельца карточки
    this.userId = userId; // наш пользователь - "b939b1d8959802541ab0c34b"
    this.cardId = _id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleAddLike = handleAddLike;
    this._handledeleteLike = handledeleteLike;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    //console.log('this._cardElement', this._cardElement)
    this._setEventListeners(this._cardElement); //устанавливаем все лисенеры в карточке
    this._cardElement.querySelector(config.templateImageSelector).src = this._link; //добавляем линк
    this._cardElement.querySelector(config.templateImageSelector).alt = `Картинка ${this._name}`; //добавляем alt
    this._cardElement.querySelector(config.templateCardTitleSelector).textContent = this._name; //добавляем заголовок
    this._cardElement.querySelector(config.cardLikeCounterSelector).textContent = this._likesLength; //добавляем кол-во лайков карточке
    //если владелец карточки не я, то удаляем кнопку "удалить"
    if(this.ownerId !== this.userId) {
      this._cardElement.querySelector(config.templateDeleteButtonSelector).style.display = "none";
    }
    //покрас кнопки лайка в зависимости от того, лайкнул ли я ее на сервере или нет
    //чтобы при перезагрузке страницы состояние лайка сохранялось
    if(this._isCardLikedinServer(this._likes)) {
      this._likeButton(this._cardElement);
    } else {
      this._dislikeButton(this._cardElement)
    }

    this._cardElement.style.animationDelay = ".2s";

    return  this._cardElement;
  }
  //получаем темплейт карточки
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
    if(this.ownerId === this.userId) {
      const _cardDeleteButton = card.querySelector(config.templateDeleteButtonSelector); //кнопка удаления карточки
      //Открываем попап удаления карточки по клику на кнопку удаления
      const cardElementForDeletion = card.querySelector('.element__figcaption');
      _cardDeleteButton.addEventListener('click', (evt) => this._handleDeleteCard(cardElementForDeletion));
    }
    //слушатель на лайк
    const _cardLikeButton = card.querySelector(config.templateLikeButtonSelector);
    //_cardLikeButton.addEventListener('click', (evt) => this._likeCard(card));
    _cardLikeButton.addEventListener('click', (evt) => this._likeCard(card));
    //слушатель на картинку
    const _cardImage = card.querySelector(config.templateImageSelector);
    _cardImage.addEventListener('click', ()=> {
      this._handleCardClick(this._name, this._link);
    })
  }
  //метод изменения цвета лайка - черный
  _likeButton(card){
    card.querySelector(config.templateLikeButtonSelector).classList.add(config.LikedButtonClass);
  }
  //метод изменения цвета лайка - белый
  _dislikeButton(card){
    card.querySelector(config.templateLikeButtonSelector).classList.remove(config.LikedButtonClass);
  }
  //проверяет, есть ли лайк у карточки на сервере
  //метод нужен для сохранения лайка при перезагрузке страницы
  _isCardLikedinServer(likes){
    const array = [];
    likes.forEach(likeObj => {
      array.push(likeObj._id)
      return array
    })
    //возвращает true, если я лайкал. false, если я не лайкал
    return array.includes(this.userId)
  }
  //проверяет, cтоит ли лайк на карточке в разметке
  _isCardLikedInDom(card){
    if(card.querySelector(config.templateLikeButtonSelector).classList.contains(config.LikedButtonClass)) {
      return true
    } else {
      return false
    }
  }
  //счетчик лайков
  _likeCounter(card, likesLength){
    card.querySelector(config.cardLikeCounterSelector).textContent = likesLength;
  }
  //старый и ненадежный счетчик лайков
  //_likeCounter(card, isClicked){
  //  if(isClicked) {
  //    return card.querySelector(config.cardLikeCounterSelector).textContent = this._likesLength + 1;
  //  } else {
  //    return card.querySelector(config.cardLikeCounterSelector).textContent = this._likesLength - 0;
  //  }
  //}
  //лайк карточке на сервере добавляю
  _addLikeToCardByApi(card){
    this._handleAddLike({
      cardId: this.cardId,
      likes: {name: this._owner.name, about: this._owner.about, avatar: this._owner.avatar, _id: this._owner._id, cohort: this._owner.cohort}
    })
    .then(result => {
      //this._likeCounter(card, true);
      console.log('карточку не лайкал. Лайк поставлен', result)
      //this._likeButton(card);
      //лайкаю карточку перебором массива лайков из ответа сервера
      console.log('лайк поставлен - result.likes.length',result.likes.length)
      this._likeCounter(card, result.likes.length)
      console.log('лайк поставлен - кол-во в счетчике',  card.querySelector(config.cardLikeCounterSelector).textContent)
    })
    .catch(err => {
      console.log('карточку не лайкал. ошибка:',err)
    })
  }
  //лайк карточке на сервере удаляю
  _removeLikeToCardByApi(card){
    this._handledeleteLike({
      cardId: this.cardId,
      likes: {name: this._owner.name, about: this._owner.about, avatar: this._owner.avatar, _id: this._owner._id, cohort: this._owner.cohort}
    })
    .then(result => {
      //this._likeCounter(card, false);
      console.log('карточку лайкал уже. Лайк убран', result)
      //this._dislikeButton(card);
      //лайкаю карточку перебором массива лайков из ответа сервера
      console.log('лайк убран - result.likes.length',result.likes.length)
      this._likeCounter(card, result.likes.length)
      console.log('лайк убран - кол-во в счетчике', card.querySelector(config.cardLikeCounterSelector).textContent)
    })
    .catch(err => {
      console.log('карточку лайкал уже. ошибка:',err)
    })
  }
  //колбек лайка
  _likeCard(card) {
    if(!this._isCardLikedInDom(card)) {
      //увеличиваю счетчик +1
      //this._likeCounter(card, true);
      //крашу в черный кнопку лайка
      this._likeButton(card);
      //отправляю лайк на сервер
      this._addLikeToCardByApi(card)
    } else {
      //уменьшаю счетчик -1
      //this._likeCounter(card, false);
      //крашу в белый кнопку лайка
      this._dislikeButton(card);
      //удаляю лайк с сервера
      this._removeLikeToCardByApi(card)
    }
  }

  //старый колбек лайка
  //_likeCard(card) {
  //  if(!this._isCardLiked(this._likes)) {
  //    this._handleAddLike({
  //      cardId: this.cardId,
  //      likes: {name: this._owner.name, about: this._owner.about, avatar: this._owner.avatar, _id: this._owner._id, cohort: this._owner.cohort}
  //    })
  //    .then(result => {
  //      //обновляю кол-во лайков
  //      this._likeCounter(card, true);
  //      //console.log('карточку не лайкал. Лайк поставлен', result)
  //      //лайк становится черным
  //      this._likeButton(card);
  //    })
  //    .catch(err => {
  //      console.log('карточку не лайкал. ошибка:',err)
  //    })
  //  } else {
  //    this._handledeleteLike({
  //      cardId: this.cardId,
  //      likes: {name: this._owner.name, about: this._owner.about, avatar: this._owner.avatar, _id: this._owner._id, cohort: this._owner.cohort}
  //    })
  //    .then(result => {
  //      //обновляю кол-во лайков
  //      this._likeCounter(card, false);
  //      //console.log('карточку лайкал уже. Лайк убран', result)
  //      //лайк становится белым
  //      this._dislikeButton(card);
  //    })
  //    .catch(err => {
  //      console.log('карточку лайкал уже. ошибка:',err)
  //    })
  //  }
  //}
  //_deleteCard(evt) {
  //  evt.target.closest(config.templateCardBodySelector).remove();
  //}
}
