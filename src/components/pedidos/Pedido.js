import React, { Fragment } from 'react';

const Pedido = ({ pedido }) => {
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
              {pedido.pedido.map((ped, index) => (
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
          <a href="#" className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Pedido
          </a>

          <button type="button" className="btn btn-rojo btn-eliminar">
            <i className="fas fa-times"></i>
            Eliminar Pedido
          </button>
        </div>
      </li>
    </Fragment>
  );
};

export default Pedido;
