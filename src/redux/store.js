import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import reducer from "./reducers/sessionReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistRed = persistReducer(persistConfig, reducer);
export const store = createStore(
  persistRed,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export const persistor = persistStore(store);
