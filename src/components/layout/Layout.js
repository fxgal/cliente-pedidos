import React from 'react';
import Header from './Header';
import Aside from './Aside';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Clientes from '../clientes/Clientes';
import ClienteAdd from '../clientes/ClienteAdd';
import ClienteEdit from '../clientes/ClienteEdit';
import Productos from '../productos/Productos';
import Pedidos from '../pedidos/Pedidos';

const Layout = () => {
  return (
    <Router>
      <Header />
      <div className="grid contenedor contenido-principal">
        <Aside />
        <main className="caja-contenido col-9">
          <Switch>
            <Route exact path="/" component={Clientes} />
            <Route exact path="/clientes/nuevo" component={ClienteAdd} />
            <Route exact path="/clientes/editar/:id" component={ClienteEdit} />
            <Route exact path="/productos" component={Productos} />
            <Route exact path="/pedidos" component={Pedidos} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Layout;
