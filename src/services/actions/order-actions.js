import { getResponse } from "../../utils/api"
export const SET_NUMBER_ORDER_REQUEST = "SET_NUMBER_ORDER_REQUEST";
export const SET_NUMBER_ORDER_SUCCESS = "SET_NUMBER_ORDER_SUCCESS";
export const SET_NUMBER_ORDER_ERROR = "SET_NUMBER_ORDER_ERROR";

export const makeOrder = (ingredients) => {
  return function (dispatch) {
    dispatch({
      type: SET_NUMBER_ORDER_REQUEST,
    });

    getResponse("/orders", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    })
      .then((data) => {
        dispatch({
          type: SET_NUMBER_ORDER_SUCCESS,
          payload: {
            name: data.name,
            number: data.order.number,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: SET_NUMBER_ORDER_ERROR,
          payload: error,
        });
      });
  };
};


// export const makeOrder = (ingredients) => {
//   return fetch(`${URL}/orders`, {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({
//       ingredients: ingredients,
//     }),
//   }).then(checkResponse);
// };

// export function orderSuccess(data) {
//   return {
//     type: SET_NUMBER_ORDER_SUCCESS,
//     payload: {
//       number: data.order.number,
//       name: data.name
//     }
//   };
// }


