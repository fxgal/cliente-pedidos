import React, { Fragment, useState, useEffect } from 'react';
import Producto from './Producto';
import { Link } from 'react-router-dom';
import conectionAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

export const Productos = props => {
  const [productos, setProductos] = useState([]);

  const consultarApi = async () => {
    const productosQuery = await conectionAxios.get('/productos');
    setProductos(productosQuery.data.productos);
  };

  useEffect(() => {
    consultarApi();
  }, [productos.length]);

  // if (!productos.length) return <Spinner />;
  return (
    <Fragment>
      <h2>Productos</h2>
      <Link to={'/productos/add'} className="btn btn-verde nvo-cliente">
        {' '}
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>
      <ul className="listado-productos">
        {productos.map(producto => (
          <li className="producto" key={producto._id}>
            <Producto producto={producto} api={consultarApi} />
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Productos;
