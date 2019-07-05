import React, { useState, useEffect, Fragment } from 'react';
import conectionAxios from '../../config/axios';
import FormSearchProducto from './FormSearchProducto';
import FormProductoAdd from './FormProductoAdd';

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

      if (searchQuery.data.productos[0]) {
        let resultado = searchQuery.data.productos[0];
        resultado.cantidad = 0;
        setProductos([...productos, resultado]);
      }
    }
  };

  const readProductos = e => {
    setSearch(e.target.value);
  };

  const incrementar = index => {
    let productosLista = [...productos];
    if (!productosLista[index]) return;
    productosLista[index].cantidad++;
    setProductos(productosLista);
  };

  const decrementar = index => {
    let productosLista = [...productos];
    if (!productosLista[index]) return;
    productosLista[index].cantidad--;
    setProductos(productosLista);
  };

  const eliminar = id => {
    let productosLista = productos.filter(producto => producto._id !== id);
    setProductos(productosLista);
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
      <ul className="resumen">
        {productos.map((producto, index) => (
          <FormProductoAdd
            key={producto._id}
            producto={producto}
            incrementar={incrementar}
            decrementar={decrementar}
            eliminar={eliminar}
            index={index}
          />
        ))}
      </ul>
    </Fragment>
  );
}

export default PedidoAdd;
