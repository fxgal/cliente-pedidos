import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import conectionAxios from '../../config/axios';

function ClienteEdit({ history, match }) {
  const { id } = match.params;

  const [cliente, setCliente] = useState({
    _id: '',
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: ''
  });

  const consultarApi = async () => {
    const clientesQuery = await conectionAxios.get(`/clientes/${id}`);
    setCliente(clientesQuery.data.cliente);
    return;
  };

  useEffect(() => {
    consultarApi();
    return;
  }, []);

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
    conectionAxios.put(`/clientes/${cliente._id}`, cliente).then(res => {
      Swal.fire({
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
      <h2>Editar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            value={cliente.nombre}
            onChange={updateState}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            value={cliente.apellido}
            onChange={updateState}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            value={cliente.empresa}
            onChange={updateState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            value={cliente.email}
            onChange={updateState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="text"
            placeholder="Teléfono Cliente"
            name="telefono"
            value={cliente.telefono}
            onChange={updateState}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Actualizar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
}

export default withRouter(ClienteEdit);
