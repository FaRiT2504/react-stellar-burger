import { useDispatch as dispatchHook } from "react-redux";
import { AppDispatch, AppThunk } from "../../services/types/index";

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();