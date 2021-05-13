import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";
import env from "../env";

let middlewares, store;

if (env == "local") {
    middlewares = [logger];
    store = createStore(rootReducer, applyMiddleware(...middlewares));
} else store = createStore(rootReducer);

export default store;