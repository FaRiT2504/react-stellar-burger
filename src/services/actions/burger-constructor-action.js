import { v4 as uuid } from "uuid";
export const PUT_INGREDIENTS = "SET_INGREDIENTS";
export const PUT_BUN = "SET_BUN";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";



export function addBun(item) {
  return {
    type: PUT_BUN,
    payload: item,
  };
}

export function addIngredients(item) {
  return {
    type: PUT_INGREDIENTS,
    payload: {
      ingredient: item,
      key: uuid(),
    },
  };
}
export function deleteIngredient(id) {
  return {
    type: DELETE_INGREDIENT,
    payload: id,
  };
}
