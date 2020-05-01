import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "./header";

const VistaAdmin = (props) => {
  const { history } = props;
  const estado = useSelector((state) => state);
  useEffect(() => {
    if (estado.Usuario === "No hay usuario") {
      history.push("/");
    }
  }, []);
  return (
    <div className="container-fluid">
      <Header />
      <h2 className="text-center">Vista admin</h2>
    </div>
  );
};

export default withRouter(VistaAdmin);
