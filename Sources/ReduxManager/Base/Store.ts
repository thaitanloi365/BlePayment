import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import { middlewares } from "./Middleware";
import { initialState, reducer } from "./Reducer";

export const configStore = () => {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middlewares)
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
