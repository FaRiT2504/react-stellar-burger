import {
  PUT_BUN,
  PUT_INGREDIENTS,
  DELETE_INGREDIENT,
  CLEAR_CONSTRUCTOR
} from "../actions/burger-constructor-action";

const initialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_BUN:
      return {
        ...state,
        bun: action.payload,
      };

    case PUT_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };

    case DELETE_INGREDIENT:
      const ingredientId = state.ingredients.findIndex(
        (item) => item.ingredient._id === action.payload
      );
      if (ingredientId >= 0) {
        const newIngredients = [...state.ingredients];
        newIngredients.splice(ingredientId, 1);
        return {
          ...state,
          ingredients: newIngredients,
        };
      }
      return state;

    case CLEAR_CONSTRUCTOR:
      return initialState;

    default:
      return state;
  }
};