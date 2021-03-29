export class Section {
  constructor({items, renderer}, appendSection) {
    this._initialArray = items; // initialCards
    this._renderer = renderer; // колбэк, отвечающий за то, как отрисовывать
    this._sectionForAddition = appendSection; //куда вставлять готовый элемент
  }
  //метод, который отвечает за отрисовку всех элементов
  renderItems() {
    const cards = this._initialArray.forEach((item) => {
      this._renderer(item);
    })
  }

  //вставка в html
  appendItem(element) {
    this._sectionForAddition.append(element);
  }
  prependItem(element) {
    this._sectionForAddition.prepend(element);
  }
}
