import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients-reducer";
import { orderReducer } from "./order-reducer";
import { currentIngredientReducer } from "./current-ingredient-reducer";
import { burgerConstructorReducer } from "./burger-constructor-reducer";
import { modalReducer } from "./modal-reducer";
import { userReducer } from "./user-reducer";
import { wsReducer } from "./ws-reducer";
import { orderNumberReducer } from "./order-number";


export const rootReducer = combineReducers({
  ingredientsReducer,
  orderReducer,
  currentIngredientReducer,
  burgerConstructorReducer,
  modalReducer,
  userReducer,
  wsReducer,
  orderNumberReducer
})