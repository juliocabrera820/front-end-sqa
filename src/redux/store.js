import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import SessionReducer from "./reducers/sessionReducer";
import ScheduleReducer from "./reducers/scheduleReducer";
import GroupReducer from "./reducers/groupsReducer";
import SubjectReducer from "./reducers/subjectsReducer";

const persistConfig = {
  key: "root",
  blacklist: ["schedule", "group", "subject"],
  storage,
};

const rootReducer = combineReducers({
  auth: SessionReducer,
  schedule: ScheduleReducer,
  group: GroupReducer,
  subject: SubjectReducer,
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
