import React from "react";
import Header from "../../componentes/header";
import Creacion from "../../componentes/creacionHorarios";
import { withRouter } from "react-router-dom";
import Sidebar from "../../componentes/sidebar";
import Horario from "../../componentes/horario";

const VistaAdmin = () => (
  <div>
    <Header />
    <Creacion />
    <Horario />
    <Sidebar />
  </div>
);

export default withRouter(VistaAdmin);
