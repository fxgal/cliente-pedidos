import React from 'react';

const Main = () => {
  return (
    <main className="caja-contenido col-9">
      <h2>Clientes</h2>

      <a href="nuevo-cliente.html" className="btn btn-verde nvo-cliente">
        {' '}
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </a>
    </main>
  );
};

export default Main;
