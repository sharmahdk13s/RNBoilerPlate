/* eslint-disable */
import { Action, combineReducers } from "redux";
import types from "../types";
import auth, { AuthState } from "./auth";
import common, { CommonState } from "./common";
import product, { ProductState } from "./product";
import settings, { SettingsState } from "./settings";

export interface RootState {
  auth: AuthState;
  settings: SettingsState; // Update with the type of settings state
  common: CommonState;
  product: ProductState;
}
const appReducer = combineReducers({
  auth,
  settings,
  common,
  product
});
const rootReducer = (state: RootState | undefined, action: Action<any>) => {
  if (action.type === types.CLEAR_REDUX_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
