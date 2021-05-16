import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import SessionReducer from "./reducers/sessionReducer";
import ScheduleReducer from "./reducers/scheduleReducer";

const persistConfig = {
  key: "root",
  blacklist: ["schedule"],
  storage,
};

const rootReducer = combineReducers({
  auth: SessionReducer,
  schedule: ScheduleReducer,
});

const persistRed = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistRed,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export const persistor = persistStore(store);
