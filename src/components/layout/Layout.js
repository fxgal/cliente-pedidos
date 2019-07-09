import React from 'react';
import Header from './Header';
import Aside from './Aside';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Clientes
import Clientes from '../clientes/Clientes';
import ClienteAdd from '../clientes/ClienteAdd';
import ClienteEdit from '../clientes/ClienteEdit';
import Productos from '../productos/Productos';
//Productos
import Pedidos from '../pedidos/Pedidos';
import ProductosAdd from '../productos/ProductoAdd';
import ProductosEdit from '../productos/ProductoEdit';
import Producto from '../productos/Producto';
//Pedidos
import pedidoAdd from '../pedidos/PedidoAdd';
import PedidoEdit from '../pedidos/PedidoEdit';

const Layout = () => {
  return (
    <Router>
      <Header />
      <div className="grid contenedor contenido-principal">
        <Aside />
        <main className="caja-contenido col-9">
          <Switch>
            {/* Clientes */}
            <Route exact path="/" component={Clientes} />
            <Route exact path="/clientes/nuevo" component={ClienteAdd} />
            <Route exact path="/clientes/editar/:id" component={ClienteEdit} />
            {/* Productos */}
            <Route exact path="/productos" component={Productos} />
            <Route exact path="/productos/add" component={ProductosAdd} />
            <Route exact path="/productos/edit/:id" component={ProductosEdit} />
            <Route exact path="/productos/:id" component={Producto} />
            {/* Pedidos */}
            <Route exact path="/pedidos" component={Pedidos} />
            <Route exact path="/pedidos/add/:id" component={pedidoAdd} />
            <Route exact path="/pedidos/edit/:id" component={PedidoEdit} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Layout;
