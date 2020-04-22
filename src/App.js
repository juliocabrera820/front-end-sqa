import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import login from './componentes/login';
import vistaAlumno from './componentes/VistaAlumno';
import vistaAdmin from './componentes/vistaAdmin';
import vistaprofes from './componentes/vistaProfes';

const App = () => {
  return (
    <Router>
      <Switch>
            <Route exact path="/" component={login}/>
            <Route exact path="/Maestro" component={vistaprofes}/>
            <Route exact path="/Alumno" component={vistaAlumno}/>
            <Route exact path="/Administrador" component={vistaAdmin}/>
        </Switch>
    </Router>
  );
}

export default App;
