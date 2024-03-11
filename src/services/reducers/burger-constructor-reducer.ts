import {
  PUT_BUN,
  PUT_INGREDIENTS,
  DELETE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  MOVE_INGREDIENT,
} from "../constants/constants";
import { TBurgerConstructorActions } from '../actions/burger-constructor-action';
import { TIngredient } from '../types/data';

export type TInitialState = {
  bun: TIngredient;
  ingredients: TIngredient[];
};

const initialState: TInitialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions): TInitialState => {
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
        // ingredients: action.payload,
      };

    case MOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: action.payload,
      };
    }

    case DELETE_INGREDIENT:

      const ingredientId = [...state.ingredients].findIndex(
        (item: TIngredient) => item._id === action.payload
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