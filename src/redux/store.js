import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducers/sessionReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistRed = persistReducer(persistConfig, reducer);
export const store = createStore(persistRed);
export const persistor = persistStore(store);
