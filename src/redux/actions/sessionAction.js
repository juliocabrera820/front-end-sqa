import usuariosService from "../../services/usuariosService";
import { Auth } from "../types";
import notificacion from "../../componentes/notificacion";

export const login = (user, password) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const userData = {};
    const { data } = await usuariosService().auth(user, password);
    userData.token = data.token;
    const response = await usuariosService().self(data.token);
    userData.currentUser = response.data;
    console.log(response.data);
    userData.redirectTo = routes[response.data.tipoUsuario].call();
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
  Administrador: () => "/administrador",
  Maestro: () => "/maestro",
  Alumno: () => "/alumno",
};
