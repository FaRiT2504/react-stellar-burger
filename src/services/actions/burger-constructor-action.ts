import { V4Options, v4 as uuid } from "uuid";

import {
  PUT_INGREDIENTS,
  PUT_BUN,
  CLEAR_CONSTRUCTOR,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT
} from '../constants/constants';
import { IBurgerConstructorIngredient } from "../../services/reducers/burger-constructor-reducer"
import { TIngredient } from '../types/data';
// export const PUT_INGREDIENTS: "PUT_INGREDIENTS" = "PUT_INGREDIENTS";
// export const PUT_BUN: "PUT_BUN" = "PUT_BUN";
// export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";
// export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
// export const MOVE_INGREDIENT: "MOVE_INGREDIENT" = "MOVE_INGREDIENT";

export interface IAddBunAction {
  readonly type: typeof PUT_BUN;
  readonly payload: TIngredient
}

export interface IAddIngredientsAction {
  readonly type: typeof PUT_INGREDIENTS;
  readonly payload: {
    ingredient: TIngredient;
    key: string;
  }

}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: string;
}

export interface IMoveIngredientAction {
  readonly type: typeof MOVE_INGREDIENT;
  readonly payload: IBurgerConstructorIngredient[];
}

export interface IClearConstructorAction {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TBurgerConstructorActions =
  | IAddBunAction
  | IAddIngredientsAction
  | IDeleteIngredientAction
  | IMoveIngredientAction
  | IClearConstructorAction

export function addBunAction(item: TIngredient): IAddBunAction {
  return {
    type: PUT_BUN,
    payload: item,
  };
}

export function addIngredientsAction(item: TIngredient): IAddIngredientsAction {
  return {
    type: PUT_INGREDIENTS,
    payload: {
      ingredient: item,
      key: uuid(),
    },
  };
}

export function deleteIngredientAction(id: string): IDeleteIngredientAction {
  return {
    type: DELETE_INGREDIENT,
    payload: id,
  };
}

export const moveIngredientAction = (dragIndex: number, hoverIndex: number, ingredients: IBurgerConstructorIngredient[]): IMoveIngredientAction => {
  const dragIngredients = ingredients[dragIndex];
  const sortIngredients = [...ingredients];
  const [hoverItem] = sortIngredients.splice(hoverIndex, 1, dragIngredients);
  sortIngredients.splice(dragIndex, 1, hoverItem);
  return {
    type: MOVE_INGREDIENT,
    payload: sortIngredients,
  };
};

export function clearConstructorAction(): IClearConstructorAction {
  return {
    type: CLEAR_CONSTRUCTOR,
  };
}
