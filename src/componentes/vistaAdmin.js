import React from "react";
import Header from "./header";
import Creacion from "./CreacionHorarios";
import { withRouter } from "react-router-dom";

const VistaAdmin = (props) => {
  const { history } = props;
  const estado = useSelector((state) => state);
  useEffect(() => {
    if (estado.Usuario === "No hay usuario") {
      history.push("/");
    }
  }, []);
  return (
    <div>
      <Header />
      <Creacion />
    </div>
  );
};

export default withRouter(VistaAdmin);
