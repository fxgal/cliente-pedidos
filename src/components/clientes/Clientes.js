import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Cliente from './Cliente';

import clienteAxios from '../../config/axios';

function Clientes() {
  const [clientes, setClientes] = useState([]);

  const consultarApi = async () => {
    const clientesQuery = await clienteAxios.get('/clientes');
    setClientes(clientesQuery.data.clientes);
  };
  //useEffect es similar a componentDidMount
  useEffect(() => {
    consultarApi();
  }, [clientes]);
  return (
    <Fragment>
      <h2>Clientes</h2>
      <Link to={'/clientes/nuevo'} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>
      {clientes.map(cliente => (
        <Cliente key={cliente._id} cliente={cliente} />
      ))}
      <ul className="listado-clientes"></ul>
    </Fragment>
  );
}

export default Clientes;
