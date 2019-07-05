import React, { useEffect, useState } from 'react';
import Pedido from './Pedido';
import conectionAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';

export const Pedidos = props => {
  const [pedidos, setPedidos] = useState([]);

  const consultarPedidos = async () => {
    const pedidosQuery = await conectionAxios.get('/pedidos');
    setPedidos(pedidosQuery.data.pedidos);
  };

  useEffect(() => {
    consultarPedidos();
  }, []);

  return (
    <main className="caja-contenido col-9">
      <h2>Pedidos</h2>
      <ul className="listado-pedidos">
        {pedidos.map((pedido, index) => (
          <Pedido key={pedido._id} pedido={pedido} />
        ))}
      </ul>
    </main>
  );
};

export default Pedidos;
