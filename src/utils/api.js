import { URL } from "./constants.js"

export const getResponse = (text, property) => {
  return fetch(URL + text, property)
    .then((res) => res.ok
      ? res.json()
      : Promise.reject(`error: ${res.status} ${res.statusText}`))
}

export const makeOrder = (ingredients) => {
  return fetch(`${URL}/orders`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
};

