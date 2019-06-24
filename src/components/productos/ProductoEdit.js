import React, { Fragment, useState, useEffect } from 'react';
// import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
import conectionAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

export const ProductosEdit = ({ history, match }) => {
  const { id } = match.params;

  const [producto, setProducto] = useState({
    _id: '',
    nombre: '',
    precio: '',
    imagen: ''
  });

  const [productoImagen, setProductoImagen] = useState('');

  const setDataProducto = e => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
    console.log(producto);
  };

  const setImagenProducto = e => {
    setProductoImagen(e.target.files[0]);
  };

  const saveProducto = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('imagen', productoImagen);
    try {
      conectionAxios
        .put(`/productos/${id}`, formData, {
          headers: {
            contentType: 'multipart/form-data'
          }
        })
        .then(res => {
          Swal.fire({
            title: res.data.error ? 'Error' : '¡Bien!',
            text: res.data.mensaje,
            type: res.data.error ? 'error' : 'success'
          }).then(() => {
            if (!res.data.error) return history.push('/productos');
          });
        });
    } catch (error) {
      Swal.fire({
        title: 'Algo ha salido mal',
        text: 'Verifique los datos ingresados',
        type: 'error'
      });
    }
  };

  const consultarApi = async () => {
    const productoQuery = await conectionAxios.get(`/productos/${id}`);
    setProducto(productoQuery.data.producto);
    setProductoImagen(productoQuery.data.producto.imagen);
  };

  useEffect(() => {
    consultarApi();
  }, []);

  if (!producto) return <Spinner />;
  return (
    <Fragment>
      <h2>Editar Producto</h2>
      <form onSubmit={saveProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            value={producto.nombre}
            onChange={setDataProducto}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            value={producto.precio}
            onChange={setDataProducto}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <input type="file" name="imagen" onChange={setImagenProducto} />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Producto"
          />
        </div>
      </form>
    </Fragment>
  );
};

export default ProductosEdit;
