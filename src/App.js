import React from 'react';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import login from './componentes/login';
import vistaAlumno from './componentes/VistaAlumno';
import vistaAdmin from './componentes/vistaAdmin';
import vistaprofes from './componentes/vistaProfes';
import Header from './componentes/header'

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={login} />
        <Route exact path="/Maestro" component={vistaprofes} />
        <Route exact path="/Alumno" component={vistaAlumno} />
        <Route exact path="/Administrador" component={vistaAdmin} />
      </Switch>
    </Router>
  );
}

export default App;
 