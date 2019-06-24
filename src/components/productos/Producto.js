import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../config/CONSTANTS';
import conectionAxios from '../../config/axios';

export const Producto = ({ producto }) => {
  const { _id, nombre } = producto;
  const productoDelete = () => {
    Swal.fire({
      title: `¿Eliminar el producto: ${nombre}?`,
      text: 'No podrá deshacer esta acción',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        conectionAxios.delete(`/productos/${_id}`).then(res => {
          Swal.fire({
            title: res.data.error ? 'Error' : '¡Bien!',
            text: res.data.mensaje,
            type: res.data.error ? 'error' : 'success'
          }).then(() => {
            // if (!res.data.error) return history.push('/');
          });
        });
      }
    });
  };
  return (
    <Fragment>
      <div className="info-producto">
        <p className="nombre">{producto.nombre}</p>
        <p className="precio">$ {producto.precio} </p>
        <img src={`${BASE_URL}/${producto.imagen}`} alt={producto.nombre} />
      </div>
      <div className="acciones">
        <Link to={`/productos/edit/${producto._id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Producto
        </Link>
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={productoDelete}
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </Fragment>
  );
};

export default Producto;
