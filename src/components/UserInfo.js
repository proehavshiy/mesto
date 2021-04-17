export class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector, avatar }) {
    // Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    //profile__title
    //profile__subtitle
    this._profileTitle = document.querySelector(profileTitleSelector); //имя
    this._profileSubtitle = document.querySelector(profileSubtitleSelector); // подпись
    this._profileAvatar = document.querySelector(avatar); //аватар
  }
  getUserInfo() { // достаем имя и подпись пользователя и упаковываем в объект
    //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    const _profileData = {};
    _profileData.inputName = this._profileTitle.textContent;
    _profileData.inputSigning = this._profileSubtitle.textContent;
    return _profileData
  }
  setUserInfo({ name, signing, avatar }) {
    // добавляет новые данные из формы редактирования профиля на страницу после сабмита формы
    this._profileTitle.textContent = name;
    this._profileSubtitle.textContent = signing;
    this._profileAvatar.src = avatar;

    //this._profileAvatar.closest('profile').style.animationDelay = ".2s";
    //cardToRemove.closest(config.templateCardBodySelector)
    //this._cardElement.style.animationDelay = ".2s";

  }
}

//отвечает за управление отображением информации о пользователе на странице
