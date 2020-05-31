import React from "react";
import Header from "../../componentes/header";
import Creacion from "../../componentes/creacionHorarios";
import { withRouter } from "react-router-dom";

const VistaAdmin = () => (
  <div>
    <Header />
    <Creacion />
  </div>
);

export default withRouter(VistaAdmin);
