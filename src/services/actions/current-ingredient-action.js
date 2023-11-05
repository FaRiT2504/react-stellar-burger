export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT'
export const CLEAR_CURRENT_INGREDIENT = "CLEAR_CURRENT_INGREDIENT";
export function setCurrentItem(item) {
  return {
    type: SET_CURRENT_INGREDIENT,
    payload: item
  };
}

