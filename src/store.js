import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducer";
import rootSaga from "./saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const configStore = () => {
  const middleware = [routerMiddleware(history), sagaMiddleware];
  const enhancer = [applyMiddleware(...middleware)];
  const store = createStore(rootReducer(history), composeEnhancers(...enhancer));
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configStore;
