import React from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import calendar from "../../assets/calendar.png";
import { Nav, Button, Img } from "./styles";

const Header = (props) => {
  const {Usuario} = useSelector((state) => state.Usuario);
  const { history } = props;
  const dispatch = useDispatch();
  const salir = () => {
    dispatch({ type: "SET_USUARIO", payload: "No hay usuario" });
    history.push("/");
  };

  return (
    <Nav className="navbar">
      <a>
        <Img src={calendar}></Img>SISTEMA DE HORARIOS
      </a>
      <div className="navbar">
        <a>{Usuario}</a>
        <form className="form-inline">
          <Button className="btn btn-light" onClick={salir}>
            Cerrar sesion
          </Button>
        </form>
      </div>
    </Nav>
  );
};

export default withRouter(Header);
