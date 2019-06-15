import React, { Fragment, useState } from 'react';

function ClienteAdd() {
  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: ''
  });

  //Leer datos de form
  const updateState = e => {
    console.log(e.target.value);
    //Almacenar en el state
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });

    console.log(cliente);
  };
  return (
    <Fragment>
      <h2>Nuevo Cliente</h2>
      <form>
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
            type="email"
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
          />
        </div>
      </form>
    </Fragment>
  );
}

export default ClienteAdd;
