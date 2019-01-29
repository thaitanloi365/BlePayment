import * as types from "./UserStorageActionTypes";
import { AsyncStorage } from "react-native";
import { persistReducer } from "redux-persist";

const initialState: object = {
  userToken: null,
  userProfile: null,
  userDatabase: null
};

const userStorageReducer = (
  state: object = initialState,
  action: { type: types.ACTION_TYPE; payload: object }
) => {
  switch (action.type) {
    case types.SAVE_USER_TOKEN:
      return { ...state, userToken: action.payload };
    case types.DELETE_USER_TOKEN:
      return { ...state, userToken: null, userProfile: null };
    case types.SAVE_USER_PROFILE:
      return { ...state, userProfile: action.payload };
    case types.DELETE_USER_PROFILE:
      return { ...state, userProfile: null };
    case types.SAVE_USER_DATABASE:
      return { ...state, userDatabase: action.payload };
    case types.DELETE_USER_DATABASE:
      return { ...state, userDatabase: null };
    case types.DELETE_ALL:
      return {
        ...state,
        userDatabase: null,
        userProfile: null,
        userToken: null
      };
    case types.SAVE_ALL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const persistConfig = {
  key: "userStorage",
  storage: AsyncStorage,
  blacklist: ["userDatabase"],
  whitelist: ["userToken", "userProfile"]
};

const reducer = persistReducer(persistConfig, userStorageReducer);

export default { initialState, reducer };
