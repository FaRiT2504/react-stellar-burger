import { URL } from "./constants.js"


export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.statusText}`);
}

export const getResponse = (endpoint, property) => {
  return fetch(URL + endpoint, property)
    .then(checkResponse)
}





