import {
  PUT_BUN,
  PUT_INGREDIENTS,
  DELETE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  MOVE_INGREDIENT,
} from "../constants/constants";
import { TBurgerConstructorActions } from '../actions/burger-constructor-action';
import { TIngredient } from '../types/data';

export interface IBurgerConstructorIngredient {
  ingredient: TIngredient
  key: string
}


export type TInitialState = {
  bun: TIngredient | null;
  ingredients: IBurgerConstructorIngredient[];
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
        // ingredients: { action.payload },
        ingredients: action.payload,
      };
    }

    case DELETE_INGREDIENT:

      const ingredientId = state.ingredients.findIndex(
        (item) => item.ingredient._id === action.payload
      );
      if (ingredientId!! >= 0) {
        const newIngredients = state.ingredients;
        newIngredients?.splice(ingredientId, 1);
        return {
          ...state,
          ingredients: newIngredients,
        };
      }
      return state;

    // characters: (characters ?? []).map(parseCharacterItems)

    // return {
    //   ...state,
    //   ingredients: [...state.ingredients??[]].filter(
    //     (ingredient) => {
    //       return ingredient._id !== action.payload;
    //     }
    //   )
    // };

    case CLEAR_CONSTRUCTOR:
      return initialState;

    default:
      return state;
  }
};