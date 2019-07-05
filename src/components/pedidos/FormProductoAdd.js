import React from 'react';

function FormProductoAdd(props) {
  const { producto, incrementar, decrementar, index } = props;
  return (
    <li>
      <div className="texto-producto">
        <p className="nombre">{producto.nombre}</p>
        <p className="precio">${producto.precio}</p>
      </div>
      <div className="acciones">
        <div className="contenedor-cantidad">
          <i className="fas fa-minus" onClick={() => decrementar(index)}></i>
          {/* <p>{producto.cantidad}</p> */}
          <input
            type="number"
            name="cantidad"
            value={producto.cantidad}
            onChange={() => {
              console.log('cambio');
            }}
            min={0}
          />
          <i className="fas fa-plus" onClick={() => incrementar(index)}></i>
        </div>
        <button type="button" className="btn btn-rojo">
          <i className="fas fa-minus-circle"></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  );
}

export default FormProductoAdd;
