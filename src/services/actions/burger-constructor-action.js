import { v4 as uuid } from "uuid";
export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const SET_BUN = "SET_BUN";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";

export function deleteIngredient(itemId) {
  return {
    type: DELETE_INGREDIENT,
    payload: itemId,
  };
}
export function addBun(item) {
  return {
    type: SET_BUN,
    payload: item,
  };
}

export function addIngredients(item) {
  return {
    type: SET_INGREDIENTS,
    payload: {
      ingredient: item,
      key: uuid(),
    },
  };
}

export function moveProduct(item) {
  return {
    type: MOVE_INGREDIENT,
    payload: item,
  };
}