import { RootState } from '../../services/types/index';
// export type RootState = ReturnType<typeof rootReducer>;



export const ingredientsIsLoadingSelector = (state: RootState) =>
  state.ingredientsReducer.isLoading;

export const ingredientsDataSelector = (state: RootState) =>
  state.ingredientsReducer.ingredients;

export const ingredientsErrorSelector = (state: RootState) =>
  state.ingredientsReducer.error;


export const bunSelector = (state: RootState) => state.burgerConstructorReducer.bun;

export const burgerIngredientsSelector = (state: RootState) =>
  state.burgerConstructorReducer.ingredients;

export const orderSelector = (store: RootState) => store.wsReducer.ordersInfo;
