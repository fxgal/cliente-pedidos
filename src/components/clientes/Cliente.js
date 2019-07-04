import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import conectionAxios from '../../config/axios';
import { Link } from 'react-router-dom';

function Cliente({ cliente }) {
  const ClienteSwal = withReactContent(Swal);
  const { _id, nombre, apellido, empresa, email, telefono } = cliente;

  const clienteDelete = () => {
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
        conectionAxios.delete(`/clientes/${_id}`).then(res => {
          ClienteSwal.fire({
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
    <li className="cliente">
      <div className="info-cliente">
        <p className="nombre">
          {nombre} {apellido}
        </p>
        <p className="empresa">{empresa}</p>
        <p>{email}</p>
        <p>Tel: {telefono}</p>
      </div>
      <div className="acciones">
        <Link to={`/pedidos/add/${_id}`} className="btn btn-verde">
          <i className="fas fa-plus-circle"></i>
          Nuevo Pedido
        </Link>
        <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Cliente
        </Link>
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={clienteDelete}
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
}

export default Cliente;
