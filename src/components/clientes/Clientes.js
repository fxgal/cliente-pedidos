import React, { useEffect } from 'react';
import clienteAxios from '../../config/axios';

export const Clientes = props => {
  const consultarApi = async () => {
    const clientes = await clienteAxios.get('/clientes');
    console.log(clientes);
  };
  //useEffect es similar a componentDidMount
  useEffect(() => {
    consultarApi();
  });
  return <h2>Clientes</h2>;
};

export default Clientes;
