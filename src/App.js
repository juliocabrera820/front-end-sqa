import React from "react";
import login from "./paginas/login";
import vistaAlumno from "./paginas/vistaAlumno";
import vistaAdmin from "./paginas/vistaAdmin";
import vistaprofes from "./paginas/vistaProfes";
import NotFound from "./paginas/NotFound";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { RutaAdministrador, RutaAlumno, RutaMaestro } from "./rutas";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={login} />
      <RutaMaestro exact path="/Maestro" component={vistaprofes} />
      <RutaAlumno exact path="/Alumno" component={vistaAlumno} />
      <RutaAdministrador exact path="/Administrador" component={vistaAdmin} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
