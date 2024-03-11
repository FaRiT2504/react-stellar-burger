import { SET_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT } from "../constants/constants";
import { TCurrentOrderActions } from '../actions/current-ingredient-action';
import { TOrder } from '../types/data';

type TInitialState = {
  currentIngredient: TOrder | null
};

const initialState: TInitialState = {
  currentIngredient: null,
};
export const currentIngredientReducer = (state = initialState, action: TCurrentOrderActions): TInitialState => {
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


