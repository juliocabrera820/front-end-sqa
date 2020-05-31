import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const NotFound = () => (
  <div className="contenedor ">
    <div className="cara shadow-lg">
      <div className="banda">
        <div className="rojo"></div>
        <div className="blanco"></div>
        <div className="azul"></div>
      </div>
      <div className="ojos"></div>
      <div className="mejillas"></div>
      <div className="boca"></div>
    </div>
    <br />
    <h1 className="mensaje">Oops! Algo Salió Mal!</h1>
    <div className="container justify-content-center  my-4">
      <div className="col-12 justify-content-center d-flex">
        <Link
          to="/"
          className=" inicio btn btn-success btn-lg text-uppercase font-weight-bold hvr-box-shadow-outset"
        >
          Regresar al login
        </Link>
      </div>
    </div>
    <hr />
  </div>
);

export default NotFound;
