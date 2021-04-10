export class Section {
  constructor({items, renderer}, appendSection) {
    this._initialСardsData = items; // initialCards
    this._renderer = renderer; // колбэк, отвечающий за то, каким способом отрисовывать
    this._sectionForAddition = appendSection; //куда вставлять готовый элемент
  }
  //метод, который отвечает за отрисовку всех элементов
  renderItems() {
    //console.log('this._initialСardsData',this._initialСardsData);
    const _cards = this._initialСardsData.forEach((item) => {
      this._renderer(item); //колбэк - то, как именно отрисовывать карточки
    })
  }

  //методы вставки в html
  appendItem(element) {
    this._sectionForAddition.append(element);
  }
  prependItem(element) {
    this._sectionForAddition.prepend(element);
  }
}
