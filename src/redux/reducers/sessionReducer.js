import { Auth } from "../types";

const initialState = {
  currentUser: null,
  token: null,
  errorMessage: null,
  isError: false,
  isLoading: false,
  redirectTo: null,
};

const sessionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Auth.LOGIN_SUCCESSFUL:
      return (state = {
        ...state,
        currentUser: payload.currentUser,
        token: payload.token,
        isLoading: false,
        redirectTo: payload.redirectTo,
      });
    case Auth.LOGIN_ERROR:
      return (state = {
        ...state,
        isError: true,
        errorMessage: payload.error,
        isLoading: false,
        redirectTo: payload.redirectTo,
      });
    case Auth.LOGIN:
      return (state = { ...state, isLoading: true });
    case Auth.LOGOUT:
      return (state = {
        ...state,
        currentUser: null,
        token: null,
        redirectTo: null,
      });
    default:
      return state;
  }
};

export default sessionReducer;
