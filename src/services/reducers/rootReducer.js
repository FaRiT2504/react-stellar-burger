import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients-reducer";
import { numberOrderReducer } from "./number-order-reducer";
import { currentIngredientReducer } from "./current-ingredient-reducer";
import { burgerConstructorReducer } from "./burger-constructor-reducer";

export const rootReducer = combineReducers({
  ingredientsReducer,
  numberOrderReducer,
  currentIngredientReducer,
  burgerConstructorReducer
})