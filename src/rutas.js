import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSession } from "./shared/hooks/useSession";

export const RutaAdministrador = ({ component: Component, ...rest }) => {
  const [session, setSession] = useSession();
  const TipoUser = session().TipoUser;
  return (
    <Route
      {...rest}
      render={(props) =>
        TipoUser === "1" ? (
          <Component {...props} />
        ) : TipoUser === "2" ? (
          <Redirect to="/Maestro" />
        ) : TipoUser === "3" ? (
          <Redirect to="/Alumno" />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export const RutaMaestro = ({ component: Component, ...rest }) => {
  const [session, setSession] = useSession();
  const TipoUser = session().TipoUser;
  return (
    <Route
      {...rest}
      render={(props) =>
        TipoUser === "2" ? (
          <Component {...props} />
        ) : TipoUser === "1" ? (
          <Redirect to="/Administrador" />
        ) : TipoUser === "3" ? (
          <Redirect to="/Alumno" />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export const RutaAlumno = ({ component: Component, ...rest }) => {
  const [session, setSession] = useSession();
  const TipoUser = session().TipoUser;
  return (
    <Route
      {...rest}
      render={(props) =>
        TipoUser === "3" ? (
          <Component {...props} />
        ) : TipoUser === "2" ? (
          <Redirect to="/Maestro" />
        ) : TipoUser === "1" ? (
          <Redirect to="/Administrador" />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
