export const ingredientsIsLoadingSelector = (state) =>
  state.ingredientsReducer.isLoading;

export const ingredientsDataSelector = (state) =>
  state.ingredientsReducer.ingredients;

export const ingredientsErrorSelector = (state) =>
  state.ingredientsReducer.error;


export const bunSelector = (state) => state.burgerConstructorReducer.bun;

export const burgerIngredientsSelector = (state) =>
  state.burgerConstructorReducer.ingredients;
