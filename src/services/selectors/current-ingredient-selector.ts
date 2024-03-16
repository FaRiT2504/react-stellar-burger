import { RootState } from '../../services/types/index';
export const currentIngredientSelector = (state: RootState) =>
  state.currentIngredientReducer.currentIngredient;