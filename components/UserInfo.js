export class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector }) {
    // Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    //profile__title
    //profile__subtitle
    this._profileTitle = document.querySelector(profileTitleSelector); //имя
    this._profileSubtitle = document.querySelector(profileSubtitleSelector); // подпись
  }
  getUserInfo() { // достаем имя и подпись пользователя и упаковываем в объект
    //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    const _profileData = {};
    _profileData.inputName = this._profileTitle.textContent;
    _profileData.inputSigning = this._profileSubtitle.textContent;
    return _profileData
  }
  setUserInfo({ name, signing }) {
    // добавляет новые данные из формы редактирования профиля на страницу после сабмита формы
    this._profileTitle.textContent = name;
    this._profileSubtitle.textContent = signing;
  }
}

//отвечает за управление отображением информации о пользователе на странице
