import React, { Fragment } from 'react';

const Header = () => (
  //Fragment se usa para envolver elementos ya que el componente debe tener un padre obligatoriamente
  <Fragment>
    <header className="barra">
      <div className="contenedor">
        <h1>CRM - Administrador de Clientes</h1>
      </div>
    </header>
  </Fragment>
);

export default Header;
