import { SET_SESSION } from "../actions/setSession";

const valorInicial = { session: { isLoggedIn: false } };

const sessionReducer = (state = valorInicial, { type, payload }) => {
  switch (type) {
    case SET_SESSION:
      return state = {...state, session: payload}
    default:
      return state;
  }
};

export default sessionReducer;
