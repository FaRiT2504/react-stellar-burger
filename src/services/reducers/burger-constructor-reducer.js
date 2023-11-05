import {
  SET_BUN,
  SET_INGREDIENTS,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from "../actions/burger-constructor-action";

const initialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUN:
      return {
        ...state,
        bun: action.payload,
      };

    case SET_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };

    case DELETE_INGREDIENT:
      const index = state.ingredients.findIndex(
        (item) => item.ingredient._id === action.payload
      );
      if (index !== -1) {
        const newIngredients = [...state.ingredients];
        newIngredients.splice(index, 1);
        return {
          ...state,
          ingredients: state.ingredients.filter(
            (item, index) => index !== action.payload
          ),
        };
      }
      return state;

    case MOVE_INGREDIENT:
      return {
        ...state,
        ingredients: action.payload,
      };

    default:
      return state;
  }
};