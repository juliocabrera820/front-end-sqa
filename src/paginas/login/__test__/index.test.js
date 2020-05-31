import { createStore } from "redux";
import reducer from "./../../../redux/reducer";

test("El usuario y contraseña del usuario no son válidos", () => {
  const store = createStore(reducer);
  const estado = store.getState().Usuario;
  const resultado = "No hay usuario";
  expect(estado).toEqual(resultado);
});