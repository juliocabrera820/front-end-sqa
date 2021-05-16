import usuariosService from "../../services/usuariosService";
import { Auth } from "../types";
import notificacion from "../../componentes/notificacion";

export const login = (user, password) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const { data } = await usuariosService().auth(user, password);
    const userData = {};
    userData.currentUser = data.data[0];
    userData.token = "123";
    userData.redirectTo = routes[data.data[0].TipoUser].call();
    loginSuccessful(dispatch, userData);
    notificacion("Has iniciado sesión", "success", 1);
  } catch (error) {
    loginError(dispatch, error);
    notificacion("Error al iniciar sesión", "error", 1);
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
