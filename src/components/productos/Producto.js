import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const Producto = ({ producto }) => {
  return (
    <Fragment>
      <div className="info-producto">
        <p className="nombre">{producto.nombre}</p>
        <p className="precio"> {producto.precio} </p>
        {/* <img src="img/1.jpg"> */}
      </div>
      <div className="acciones">
        <Link to={`/productos/edit/${producto._id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Producto
        </Link>
        <button type="button" className="btn btn-rojo btn-eliminar">
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </Fragment>
  );
};

export default Producto;
