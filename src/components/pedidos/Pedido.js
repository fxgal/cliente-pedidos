import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import conectionAxios from '../../config/axios';

const Pedido = ({ pedido }) => {
  const pedidoDelete = () => {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'No podrá deshacer esta acción',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        conectionAxios
          .delete(`/pedidos/${pedido._id}`)
          .then(res => {
            Swal.fire({
              title: res.data.error ? 'Error' : '¡Bien!',
              text: res.data.mensaje,
              type: res.data.error ? 'error' : 'success'
            }).then(() => {
              // if (!res.data.error) return history.push('/');
            });
          })
          .catch(error => {
            Swal.fire({
              title: 'Algo salió mal',
              text: 'No se ha eliminado el pedido. Intente de nuevo.',
              type: 'error'
            });
          });
      }
    });
  };
  return (
    <Fragment>
      <li className="pedido">
        <div className="info-pedido">
          <p className="id">ID: {pedido.cliente._id}</p>
          <p className="nombre">
            Cliente: {pedido.cliente.nombre} {pedido.cliente.apellido}
          </p>

          <div className="articulos-pedido">
            <p className="productos">Artículos Pedido: </p>
            <ul>
              {pedido.pedido.map(ped => (
                <li key={ped._id}>
                  <p>{ped.nombre}</p>
                  <p>Precio: ${ped.precio}</p>
                  <p>Cantidad: {ped.cantidad}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="total">Total: ${pedido.total} </p>
        </div>
        <div className="acciones">
          <Link to={`/pedidos/edit/${pedido._id}`} className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Pedido
          </Link>
          <button
            type="button"
            className="btn btn-rojo btn-eliminar"
            onClick={pedidoDelete}
          >
            <i className="fas fa-times"></i>
            Eliminar Pedido
          </button>
        </div>
      </li>
    </Fragment>
  );
};

export default Pedido;
