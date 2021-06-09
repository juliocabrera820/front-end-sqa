import React from "react";
import login from "./paginas/login";
import vistaAlumno from "./paginas/vistaAlumno";
import vistaAdmin from "./paginas/vistaAdmin";
import vistaprofes from "./paginas/vistaProfes";
import NotFound from "./paginas/NotFound";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./shared/routes";
import Role from "./shared/roles";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={login} />
      <PrivateRoute
        exact
        path="/maestro"
        roles={[Role["Maestro"]]}
        component={vistaprofes}
      />
      <PrivateRoute
        exact
        path="/alumno"
        roles={[Role["Administrador"]]}
        component={vistaAlumno}
      />
      <PrivateRoute
        exact
        path="/administrador"
        roles={[Role["Alumno"]]}
        component={vistaAdmin}
      />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
