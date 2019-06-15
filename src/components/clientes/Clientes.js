import React, { useEffect, useState, Fragment } from 'react';

import Cliente from './Cliente';

import clienteAxios from '../../config/axios';

export const Clientes = props => {
  const [clientes, setClientes] = useState([]);

  const consultarApi = async () => {
    const clientesQuery = await clienteAxios.get('/clientes');
    setClientes(clientesQuery.data.clientes);
  };
  //useEffect es similar a componentDidMount
  useEffect(() => {
    consultarApi();
  }, []);
  return (
    <Fragment>
      <h2>Clientes</h2>
      <a href="nuevo-cliente.html" className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </a>
      {clientes.map(cliente => (
        <Cliente key={cliente._id} cliente={cliente} />
      ))}
      <ul className="listado-clientes"></ul>
    </Fragment>
  );
};

export default Clientes;
