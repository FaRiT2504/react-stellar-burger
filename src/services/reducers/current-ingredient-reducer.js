import { SET_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT } from "../actions/current-ingredient-action";
const initialState = {
  currentIngredient: null,
};
export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.payload,
      };
    }
    case CLEAR_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};


