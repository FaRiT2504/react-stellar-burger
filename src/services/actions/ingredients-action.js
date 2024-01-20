import { getResponse } from "../../utils/api"
import { api } from "../../utils/api"
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";

export const getIngredients = () => {
  return (dispatch) => {
    dispatch({ type: GET_INGREDIENTS_REQUEST, });
    getResponse("/ingredients")
      .then((res) => {

        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res.data,
        })

      })
      .catch((error) => {
        dispatch({
          type: GET_INGREDIENTS_ERROR,
        })
        console.error("error:", error.message);
      })

  }
}