import {
  SET_CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT
} from '../constants/constants';
import { TOrder } from '../types/data';

// export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT'
// export const CLEAR_CURRENT_INGREDIENT = "CLEAR_CURRENT_INGREDIENT";

export interface ISetCurrentItemAction {
  readonly type: typeof SET_CURRENT_INGREDIENT;
  readonly payload: TOrder
}

export interface IClearCurrentItemAction {
  readonly type: typeof CLEAR_CURRENT_INGREDIENT;
}

export type TCurrentOrderActions =
  | ISetCurrentItemAction
  | IClearCurrentItemAction


export function setCurrentItemAction(item: TOrder): ISetCurrentItemAction {
  return {
    type: SET_CURRENT_INGREDIENT,
    payload: item
  };
}

export function clearCurrentItemAction(): IClearCurrentItemAction {
  return {
    type: CLEAR_CURRENT_INGREDIENT,
  };
}


