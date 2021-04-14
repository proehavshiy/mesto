import { config } from '../utils/constants.js';

export class Card {
  constructor ({name, link, likes, owner, _id}, handleCardClick, handleDeleteCard, handleAddLike, handledeleteLike) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    //console.log('this._likes', this._likes);
    this._likesLength = likes.length;
    this._owner = owner;
    //console.log('owner', this._owner)
    this.ownerId = owner._id; //"b939b1d8959802541ab0c34b"
    this.cardId = _id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleAddLike = handleAddLike;
    this._handledeleteLike = handledeleteLike;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners(this._cardElement); //устанавливаем все лисенеры в карточке
    this._cardElement.querySelector(config.templateImageSelector).src = this._link; //добавляем линк
    this._cardElement.querySelector(config.templateImageSelector).alt = `Картинка ${this._name}`; //добавляем alt
    this._cardElement.querySelector(config.templateCardTitleSelector).textContent = this._name; //добавляем заголовок
    this._cardElement.querySelector(config.cardLikeCounterSelector).textContent = this._likesLength; //добавляем кол-во лайков карточке
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
      //Открываем попап удаления карточки по клику на кнопку удаления
      const cardElementForDeletion = card.querySelector('.element__figcaption');
      _cardDeleteButton.addEventListener('click', (evt) => this._handleDeleteCard(cardElementForDeletion));
    }

    //лисенер на лайк

    //console.log('likeButton',likeButton)
    //лисенер на лайкнутую кнопку
    //const buttonIsLiked = card.querySelector(config.LikedButtonSelector);
    //console.log('лайкнутая кнопка',buttonIsLiked)

    const _cardLikeButton = card.querySelector(config.templateLikeButtonSelector); //кнопки лайка
    //_cardLikeButton.addEventListener('click', (evt) => this._isCardLiked());
    //_cardLikeButton.addEventListener('click', (evt) => this._likeCard(evt, card));
    _cardLikeButton.addEventListener('click', (evt) => this._likeCard(card));
    //_likeCard2()
    //чтобы лайки ставились и отправлялись на сервер
    //_cardLikeButton.addEventListener('click', (evt) => this._handleAddLike({
    //  cardId: this.cardId,
    //  likes: {name: this._owner.name, about: this._owner.about, avatar: this._owner.avatar, _id: this._owner._id, cohort: this._owner.cohort}
    //})
    //.then(result => {
    //  //console.log('result.likes[0]._id', result.likes[0]._id)
    //  const f = (el) => {
    //    return el._id === "b939b1d8959802541ab0c34b"
    //    //if(LikeObject._id === "b939b1d8959802541ab0c34b") {
    //      //    return true;
    //      //  }
    //      //  return false;
    //  }
    //  console.log('я ее лайкал когда-то уже?', result.likes.some(f))
    //  console.log("сколько лайков до?",card.querySelector(config.cardLikeCounterSelector).textContent)
    //  //увеличиваем кол-во лайков в счетчике
    //  card.querySelector(config.cardLikeCounterSelector).textContent = this._likesLength + 1;
    //  console.log("сколько лайков после?",card.querySelector(config.cardLikeCounterSelector).textContent)
    //  console.log('результат после нажатия на лайк:',result)
//
    //  //console.log('result.likes[0]._id', typeOf(result.likes[0]))
    //})
    //.catch(err => {
    //  console.log("ошибка после нажатия на лайк:",err)
    //}))
    //уменьшаем кол-во лайков в счетчике при отлайкивании
    //const f = (el) => {
    //  return el._id === "b939b1d8959802541ab0c34b"
    //}
    //console.log('this._likes', this._likes)
    //console.log('1111', this._likes.some(el => {return el._id === "b939b1d8959802541ab0c34b"}))
    if(this._likes.some(el => {return el._id === "b939b1d8959802541ab0c34b"})) {

      //_cardLikeButton.addEventListener('click', (evt) => this._handledeleteLike({
      //  cardId: this.cardId,
      //  likes: {name: this._owner.name, about: this._owner.about, avatar: this._owner.avatar, _id: this._owner._id, cohort: this._owner.cohort}
      //})
      //.then(result => {
      //  const f = (el) => {
      //    return el._id === "b939b1d8959802541ab0c34b"
      //  }
      //  console.log('я ее лайкал когда-то уже?', result.likes.some(f))
      //  if(result.likes.some(f)) {console.log('да, я уже лайкал эту карточку')};
      //  if(!result.likes.some(f)) {console.log(' нет , я еще не лайкал эту карточку')};
      //  console.log("отлайкнули. сколько лайков до?",card.querySelector(config.cardLikeCounterSelector).textContent)
      //  //уменьшаем кол-во лайков в счетчике
      //  card.querySelector(config.cardLikeCounterSelector).textContent = this._likesLength - 1;
      //  console.log("отлайкнули. сколько лайков после?",card.querySelector(config.cardLikeCounterSelector).textContent)
      //  console.log('результат после нажатия на лайк:',result)
      //})
      //.catch(err => {
      //  console.log("ошибка после снятия лайка:",err)
      //}));
    }


    const _cardImage = card.querySelector(config.templateImageSelector);
    _cardImage.addEventListener('click', ()=> {
      this._handleCardClick(this._name, this._link);
    })
  }
  //проверяет, лайкал ли я карточку или нет
  _isCardLiked(likes){
    const array = [];
    likes.forEach(likeObj => {
      array.push(likeObj._id)
      return array
    })
    return array.includes("b939b1d8959802541ab0c34b")
  }
  _likeCounter(card, isClicked){
    if(isClicked) {
      return card.querySelector(config.cardLikeCounterSelector).textContent = this._likesLength + 1;
    } else {
      return card.querySelector(config.cardLikeCounterSelector).textContent = this._likesLength - 1;
    }
  }
  //колбек лайка
  _likeCard(card) {
    if(!this._isCardLiked(this._likes)) {
      this._handleAddLike({
        cardId: this.cardId,
        likes: {name: this._owner.name, about: this._owner.about, avatar: this._owner.avatar, _id: this._owner._id, cohort: this._owner.cohort}
      })
      .then(result => {
        //card.querySelector(config.cardLikeCounterSelector).textContent = this._likesLength + 1;
        this._likeCounter(card, true);
        console.log('карточку не лайкал. Лайк поставлен', result)
      })
      .catch(err => {
        console.log('карточку не лайкал. ошибка:',err)
      })
    } else {
      this._handledeleteLike({
        cardId: this.cardId,
        likes: {name: this._owner.name, about: this._owner.about, avatar: this._owner.avatar, _id: this._owner._id, cohort: this._owner.cohort}
      })
      .then(result => {
          //card.querySelector(config.cardLikeCounterSelector).textContent = this._likesLength - 1;
          this._likeCounter(card, false);
          console.log('карточку лайкал уже. Лайк убран', result)
      })
      .catch(err => {
        console.log('карточку лайкал уже. ошибка:',err)
      })
    }
  }
  //_deleteCard(evt) {
  //  evt.target.closest(config.templateCardBodySelector).remove();
  //}
}
