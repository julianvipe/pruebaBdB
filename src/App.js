import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from './views/Inicio/Inicio.js';
import PerfilUsuario from './views/PerfilUsuario/PerfilUsuario.js';
import EditarInfo from './views/EditarInfo/EditarInfo.js';
import Registrar from './views/Registro/Registrarse.js';

export class App extends Component {
  render() {
  return (
    <Router>
      <Switch>
        <Route path='/PerfilUsuario' component={PerfilUsuario}/>
        <Route path='/EditInfo' component ={EditarInfo}/>
        <Route path='/Registrar'>
          <Registrar/>
        </Route>
        <Route path='/' extact>
          <Inicio/>
        </Route>
      </Switch>
    </Router>
  );
}
}
export default App;
