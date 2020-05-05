import React from "react";
import login from "./componentes/login";
import vistaAlumno from "./componentes/VistaAlumno";
import vistaAdmin from "./componentes/vistaAdmin";
import vistaprofes from "./componentes/vistaProfes";
import NoFound from "./componentes/NoFound";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={login} />
      <Route exact path="/Maestro" component={vistaprofes} />
      <Route exact path="/Alumno" component={vistaAlumno} />
      <Route exact path="/Administrador" component={vistaAdmin} />
      <Route component={NoFound} />
    </Switch>
  </Router>
);

export default App;
