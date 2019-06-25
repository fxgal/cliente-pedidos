import React from 'react';
import Pedido from './Pedido';

export const Pedidos = props => {
  return (
    <main className="caja-contenido col-9">
      <h2>Pedidos</h2>
      <ul className="listado-pedidos">
        <Pedido />
      </ul>
    </main>
  );
};

export default Pedidos;
