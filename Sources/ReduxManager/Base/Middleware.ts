import thunk from "redux-thunk";

let m = [thunk];
if (__DEV__) {
  const logger = require("redux-logger").default;
  m.push(logger);
}
export const middlewares = m;
