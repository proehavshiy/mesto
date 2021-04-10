export class Api {
  constructor({ serverUrl, cohort, token, }) {
    this._serverUrl = serverUrl; // https://mesto.nomoreparties.co/v1
    //this._requestPath = requestPath; // меняется постоянно напр: users/me
    this._cohort = cohort; // cohort-22
    this._token = token; // a039ff03-9c34-4fce-91e0-77cd409474e3
  }
  //запрос информации профиля с сервера
  getUserInfo() {
    return fetch(`${this._serverUrl}/${this._cohort}/users/me`, {
      headers: {
        authorization: this._token
      }
    }).then(response => {
      if(response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка ${response.status}`)
    });
  }
  //запрос карточек с сервера
  getCards() {
    return fetch(`${this._serverUrl}/${this._cohort}/cards`, {
      headers: {
        authorization: this._token
      }
    }).then(response => {
      if(response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка ${response.status}`)
    });
  }
}
