// types/index.ts
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TBurgerConstructorActions } from '../actions/burger-constructor-action';
import { TCurrentOrderActions } from '../actions/current-ingredient-action';
import { TIngredientsActions } from '../actions/ingredients-action';
import { TModalAction } from '../actions/modal-action';
import { TOrderAction } from '../actions/order-action';
import { TNumberOrderAction } from '../actions/order-number-action';
import { TUserAction } from '../actions/user-action';
import { TWsAction } from '../actions/ws-action';

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions =
  | TBurgerConstructorActions
  | TCurrentOrderActions
  | TIngredientsActions
  | TModalAction
  | TOrderAction
  | TNumberOrderAction
  | TUserAction
  | TWsAction


// Типизация thunk в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch; 