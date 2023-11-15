import { URL } from "./constants.js"


export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.statusText}`);
}

export const getResponse = (text, property) => {
  return fetch(URL + text, property)
    .then(checkResponse)
}

// export const getResponse = (text, property) => {
//   return fetch(URL + text, property)
//     .then((res) => res.ok
//       ? res.json()
//       : Promise.reject(`error: ${res.status} ${res.statusText}`))
// }



