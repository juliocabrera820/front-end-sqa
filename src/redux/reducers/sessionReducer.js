import { SET_USUARIO } from "../actions/accionSetUsuario";

const valorInicial = { Usuario: "No hay usuario" };

const sessionReducer = (state = valorInicial, action) => {
  switch (action.type) {
    case SET_USUARIO:
      return (state = { ...state, Usuario: action.payload });
    default:
      return state;
  }
};

export default sessionReducer;
