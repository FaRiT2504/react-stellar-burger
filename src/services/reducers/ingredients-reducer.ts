import {
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from "../constants/constants";
import { TIngredientsActions } from '../actions/ingredients-action';
import { TIngredient } from '../types/data';

type TInitialState = {
  isLoading: boolean,
  ingredients: ReadonlyArray<TIngredient> | null,
  error: null | string,
};

const initialState: TInitialState = {
  isLoading: false,
  ingredients: [],
  error: null,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TInitialState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        ingredients: action.payload,
        error: null,
      };
    }

    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: "Ошибка при загрузке ингредиентов",
      };
    }

    default: {
      return state;
    }
  }
};