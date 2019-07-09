import React, { useEffect, useState } from 'react';
import Pedido from './Pedido';
import conectionAxios from '../../config/axios';

export const Pedidos = props => {
  const [pedidos, setPedidos] = useState([]);

  const consultarPedidos = async () => {
    const pedidosQuery = await conectionAxios.get('/pedidos');
    setPedidos(pedidosQuery.data.pedidos);
  };

  useEffect(() => {
    const pedidosQuery = async () => {
      const res = await conectionAxios.get('/pedidos');
      setPedidos(res.data.pedidos);
    };
    pedidosQuery();
    // consultarPedidos();
  }, [pedidos.length]);

  useEffect(() => {
    return () => {
      console.log('cleaned up pedidos');
    };
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
