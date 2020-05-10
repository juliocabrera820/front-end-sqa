import React from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {useSelector} from 'react-redux';
import styled from "styled-components";
import calendar from "../imagenes/calendar.png";

const Nav = styled.nav`
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-size: 2em;
  background-color: #fcfee9;
  margin-bottom:20px;
  opacity: 0.9;
`;

const Button = styled.button`
  font-size: 1em;
  background: none;
  border: none;
  color: black;
  margin-left: 30px;
`;

const Img = styled.img`
    width: 50px;
    margin-right: 20px;
`;

const Header = (props) => {
  const usuario = useSelector(state => state);
  const { history } = props;
  const dispatch = useDispatch();
  const salir = () => {
    dispatch({ type: "SET_USUARIO", payload: "No hay usuario" });
    history.push("/");
  };

  return (
    <Nav className="navbar" >
      <div><Img src={calendar} ></Img>SISTEMA DE HORARIOS</div>
      <div className="navbar">
        <div>{usuario.Usuario.Usuario}</div>
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
