import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import conectionAxios from '../../config/axios';

function ClienteAdd({ history }) {
  const ClienteSwal = withReactContent(Swal);

  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: ''
  });

  //Leer datos de form
  const updateState = e => {
    //Almacenar en el state
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  //Validar formulario
  const validarCliente = () => {
    const { nombre, apellido, email, empresa, telefono } = cliente;
    //Verificar si los campos tienen algo
    let valido =
      !nombre.length ||
      !apellido.length ||
      !empresa.length ||
      !email.length ||
      !telefono.length;
    return valido;
  };

  //Guardar en la BD
  const handleSubmit = e => {
    e.preventDefault();
    conectionAxios.post('/clientes', cliente).then(res => {
      ClienteSwal.fire({
        title: res.data.error ? 'Error' : '¡Bien!',
        text: res.data.mensaje,
        type: res.data.error ? 'error' : 'success'
      }).then(() => {
        if (!res.data.error) return history.push('/');
      });
    });
  };

  return (
    <Fragment>
      <h2>Nuevo Cliente</h2>
      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={updateState}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={updateState}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={updateState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={updateState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="text"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={updateState}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
}

export default withRouter(ClienteAdd);
