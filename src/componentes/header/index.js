import React from "react";
import "./header.css";
import { useDispatch } from "react-redux";
import { useUser } from "../../shared/hooks/useUser";
import calendar from "../../assets/calendar.png";
import { Nav, Button, Img } from "./styles";
import { logout } from "../../redux/actions/sessionAction";
import { useHistory } from "react-router";

const Header = () => {
  const { currentUser, isLoading } = useUser();
  const dispatch = useDispatch();
  const history = useHistory();

  const salir = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <Nav className="navbar">
      <Img>SISTEMA DE HORARIOS</Img>
      <div className="navbar">
        <a>{`${currentUser.nombres} ${currentUser.apellidos}`}</a>
        <div className="form-inline">
          <Button className="btn btn-light" onClick={salir}>
            Cerrar sesion
          </Button>
        </div>
      </div>
    </Nav>
  );
};

export default Header;
