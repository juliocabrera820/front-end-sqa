import React from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

const Header = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const salir = () => {
    dispatch({ type: "SET_USUARIO", payload: "No hay usuario" });
    history.push("/");
  };

  return (
    <nav className="navbar navbar-light bg-dark">
      <a className="navbar-brand text-white">SGH</a>
      <form className="form-inline">
        <button className="btn btn-outline-danger my-2 my-sm-0" onClick={salir}>
          Cerrar sesion
        </button>
      </form>
    </nav>
  );
};

export default withRouter(Header);
