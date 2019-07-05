import React, { useState, useEffect, Fragment } from 'react';
import conectionAxios from '../../config/axios';
import FormSearchProducto from './FormSearchProducto';

function PedidoAdd(props) {
  //Id del cliente
  const { id } = props.match.params;

  const [cliente, setCliente] = useState([]);
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState('');

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

  const searchProducto = async e => {
    e.preventDefault();
    if (search) {
      const searchQuery = await conectionAxios.get(
        `/productos/search/${search}`
      );
      setProductos(searchQuery.data.productos);
      console.log(productos);
    }
  };

  const readProductos = e => {
    setSearch(e.target.value);
  };

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
      <FormSearchProducto
        searchProducto={searchProducto}
        readProductos={readProductos}
      />
    </Fragment>
  );
}

export default PedidoAdd;
