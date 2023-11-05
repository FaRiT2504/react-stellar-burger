import { URL } from "./constants.js"

export const getResponse = (text, property) => {
  return fetch(URL + text, property)
    .then((res) => res.ok
      ? res.json()
      : Promise.reject(`error: ${res.status} ${res.statusText}`))
  // .then((data) => data.data);
}

