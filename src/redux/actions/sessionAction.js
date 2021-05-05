import usuariosService from "../../services/usuariosService";
import { Auth } from "../types";

export const login = (user, password) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const { data } = await usuariosService().auth(user, password);
    const userData = {};
    userData.currentUser = data.data[0];
    userData.token = "123";
    userData.redirectTo = routes[data.data[0].TipoUser].call();
    console.log(userData);
    loginSuccessful(dispatch, userData);
  } catch (error) {
    loginError(dispatch, error);
  }
};

const loginSuccessful = (distpatch, userData) =>
  distpatch({
    type: Auth.LOGIN_SUCCESSFUL,
    payload: userData,
  });

const loginError = (dispatch, error) =>
  dispatch({
    type: Auth.LOGIN_ERROR,
    payload: error,
  });

const setLoading = (dispatch) =>
  dispatch({
    type: Auth.LOGIN,
  });

export const logout = () => (dispatch) =>
  dispatch({
    type: Auth.LOGOUT,
  });

const routes = {
  1: () => "/Administrador",
  2: () => "/Maestro",
  3: () => "/Alumno",
};
