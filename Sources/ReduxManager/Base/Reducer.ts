import { combineReducers } from "redux";

import UserStorageReducer from "../UserStorage/UserStorageReducer";

export const initialState = {
  userStorage: UserStorageReducer.initialState
};

export const reducer = combineReducers({
  userStorage: UserStorageReducer.reducer
});
