import { TypedUseSelectorHook, useSelector as selectorHook } from "react-redux";
import { RootState } from "../../services/types/index";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;