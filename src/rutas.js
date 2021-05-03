import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSession } from './shared/hooks/useSession'

export const RutaAdministrador = ({ component: Component, ...rest }) => {
  const [session, setSession] = useSession()
  const currentSession = session()

  return (
    <Route
      {...rest}
      render={(props) =>
        !currentSession.isLoggedIn ? <Redirect to="/"/> 
        : currentSession.TipoUser === "1" ? (
          <Component {...props} />
        ) : currentSession.TipoUser === "2" ? (
          <Redirect to="/Maestro" />
        ) : currentSession.TipoUser === "3" && (
          <Redirect to="/Alumno" />
        )
      }
    />
  );
};

export const RutaMaestro = ({ component: Component, ...rest }) => {
  const [session, setSession] = useSession()
  const currentSession = session()

  return (
    <Route
      {...rest}
      render={(props) =>
        !currentSession.isLoggedIn ? <Redirect to="/"/> 
        : currentSession.TipoUser === "2" ? (
          <Component {...props} />
        ) : currentSession.TipoUser === "1" ? (
          <Redirect to="/Administrador" />
        ) : currentSession.TipoUser === "3" && (
          <Redirect to="/Alumno" />
        )
      }
    />
  );
};

export const RutaAlumno = ({ component: Component, ...rest }) => {
  const [session, setSession] = useSession()
  const currentSession = session()

  return (
    <Route
      {...rest}
      render={(props) =>
        !currentSession.isLoggedIn ? <Redirect to="/"/> 
        : currentSession.TipoUser === "3" ? (
          <Component {...props} />
        ) : currentSession.TipoUser === "2" ? (
          <Redirect to="/Maestro" />
        ) : currentSession.TipoUser === "1" && (
          <Redirect to="/Administrador" />
        )
      }
    />
  );
};
