export class Card {
  constructor (item, config) {
    this._item = item;
    this._config = config;
  }
  generateCard() {
    this._cardElement = this._getTemplate(this._config);
    this._setEventListeners(this._cardElement); //устанавливаем все лисенеры в карточке
    this._cardElement.querySelector(this._config.templateImageSelector).src = this._item.link; //добавляем линк
    this._cardElement.querySelector(this._config.templateImageSelector).alt = `Картинка ${this._item.name}`; //добавляем alt
    this._cardElement.querySelector(this._config.templateCardTitleSelector).textContent = this._item.name; //добавляем заголовок
    return  this._cardElement;
  }
  _getTemplate() {
    const _templateElement = document
    .querySelector(this._config.templateElementSelector)
    .content
    .cloneNode(true);
    return _templateElement;
  }
  _setEventListeners(card) {
    const _cardDeleteButton = card.querySelector(this._config.templateDeleteButtonSelector); //кнопка удаления карточки
    _cardDeleteButton.addEventListener('click', (evt) => this._deleteCard(evt));
    const _cardLikeButton = card.querySelector(this._config.templateLikeButtonSelector); //кнопки лайка
    _cardLikeButton.addEventListener('click', (evt) => this._likeCard(evt));
  }
  _deleteCard(evt) {
    evt.target.closest(this._config.templateCardBodySelector).remove();
  }
  _likeCard(evt) {
    evt.target.classList.toggle(this._config.LikeIsActiveClass);
  }
}
