import React from "react";
import { withRouter } from "react-router-dom";
import { useSession } from "../../shared/hooks/useSession";
import calendar from "../../assets/calendar.png";
import { Nav, Button, Img } from "./styles";

const Header = (props) => {
  const { history } = props;
  const [session, setSession] = useSession();
  
  const usuario = session().Usuario

  const salir = () => {
    setSession("No hay usuario");
    history.push("/");
  };
  
  return (
    <Nav className="navbar">
      <a>
        <Img src={calendar}></Img>SISTEMA DE HORARIOS
      </a>
      <div className="navbar">
        <a>{usuario}</a>
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
