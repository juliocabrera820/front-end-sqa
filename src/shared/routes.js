import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUser } from "./hooks/useUser";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { currentUser, redirectTo } = useUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }

        if (roles && roles.indexOf(currentUser.TipoUser) === -1) {
          return <Redirect to={{ pathname: redirectTo }} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
