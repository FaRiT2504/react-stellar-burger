export const CLOSE_MODAL = "CLOSE_MODAL"
export const OPEN_MODAL = "OPEN_MODAL"
export const openModalAction = (item) => {
  return {
    type: OPEN_MODAL,
    payload: {
      modal: item,
    }
  };
}

export const closeModalAction = () => {
  return {
    type: CLOSE_MODAL,
    payload: {
      modal: null,
      isVisibleModal: false

    }
  };
}


// export const makeOrder = (ingredients) => {
//   return function (dispatch) {
//     dispatch({
//       type: SET_NUMBER_ORDER_REQUEST,
//     });

//     getResponse("/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ ingredients: ingredients }),
//     })
//       .then((data) => {
//         dispatch({
//           type: SET_NUMBER_ORDER_SUCCESS,
//           payload: {
//             name: data.name,
//             number: data.order.number,
//           },
//         });
//       })
//       .catch((error) => {
//         dispatch({
//           type: SET_NUMBER_ORDER_ERROR,
//           payload: error,
//         });
//       });
//   };
// };