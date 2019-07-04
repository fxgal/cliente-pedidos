import React, { useState, useEffect, Fragment } from 'react';
import conectionAxios from '../../config/axios';

function PedidoAdd(props) {
  //Id del cliente
  const { id } = props.match.params;

  const [cliente, setCliente] = useState([]);

  const consultarApi = async () => {
    const clientesQuery = await conectionAxios.get(`/clientes/${id}`);
    setCliente(clientesQuery.data.cliente);
  };

  useEffect(() => {
    consultarApi();
  }, []);

  useEffect(() => {
    return () => {
      console.log('cleaned up pedido add');
    };
  }, []);

  return (
    <Fragment>
      <h2>Nuevo Pedido</h2>
      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>
          Nombre: {cliente.nombre} {cliente.apellido}
        </p>
        <p>Teléfono: {cliente.telefono}</p>
      </div>
    </Fragment>
  );
}

export default PedidoAdd;
