import React, { useState, useEffect, Fragment } from 'react';
import conectionAxios from '../../config/axios';
import FormSearchProducto from './FormSearchProducto';
import FormProductoAdd from './FormProductoAdd';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

function PedidoEdit(props) {
  //Id del cliente
  const { id } = props.match.params;

  const [cliente, setCliente] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);

  const consultarApi = async () => {
    const pedidosQuery = await conectionAxios.get(`/pedidos/${id}`);
    setPedido(pedidosQuery.data.pedido);
    setCliente(pedidosQuery.data.pedido.cliente);
    setProductos(pedidosQuery.data.pedido.pedido);
    return;
  };

  useEffect(() => {
    consultarApi();
    calcularTotal();
  }, []);

  useEffect(() => {
    return () => {
      console.log('cleaned up pedido edit');
    };
  }, []);

  const searchProducto = async e => {
    e.preventDefault();
    if (search) {
      const searchQuery = await conectionAxios.get(
        `/productos/search/${search}`
      );

      if (searchQuery.data.productos[0]) {
        let resultado = searchQuery.data.productos[0];
        resultado.cantidad = 0;
        setProductos([...productos, resultado]);
      }
    }
  };

  const readProductos = e => {
    setSearch(e.target.value);
  };

  const incrementar = index => {
    let productosLista = [...productos];
    if (!productosLista[index]) return;
    productosLista[index].cantidad++;
    setProductos(productosLista);
    calcularTotal();
  };

  const decrementar = index => {
    let productosLista = [...productos];
    if (!productosLista[index]) return;
    productosLista[index].cantidad--;
    setProductos(productosLista);
    calcularTotal();
  };

  const eliminar = id => {
    let productosLista = productos.filter(producto => producto._id !== id);
    setProductos(productosLista);
    calcularTotal();
  };

  const calcularTotal = () => {
    if (productos.length === 0) {
      setTotal(0);
      return;
    }
    let nuevoTotal = 0;
    productos.map(
      producto => (nuevoTotal += producto.precio * producto.cantidad)
    );
    setTotal(nuevoTotal);
    return;
  };

  const actualizarPedido = async () => {
    if (total === 0) return;
    const dataPedido = {
      cliente: cliente._id,
      pedido: productos,
      total
    };
    conectionAxios.put(`/pedidos/${pedido._id}`, dataPedido).then(res => {
      Swal.fire({
        title: res.data.error ? 'Error' : '¡Bien!',
        text: res.data.mensaje,
        type: res.data.error ? 'error' : 'success'
      }).then(() => {
        if (!res.data.error) return props.history.push(`/pedidos`);
      });
    });
  };

  return (
    <Fragment>
      <h2>Editar Pedido</h2>
      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>
          Nombre: {cliente.nombre} {cliente.apellido}
        </p>
        <p>Teléfono: {cliente.telefono}</p>
      </div>
      <FormSearchProducto
        searchProducto={searchProducto}
        readProductos={readProductos}
      />
      <ul className="resumen">
        {productos.map((producto, index) => (
          <FormProductoAdd
            key={producto._id}
            producto={producto}
            incrementar={incrementar}
            decrementar={decrementar}
            eliminar={eliminar}
            index={index}
          />
        ))}
      </ul>
      <p className="total">
        Total a pagar: <span>$ {total} </span>
      </p>
      {total > 0 ? (
        <div className="enviar">
          <input
            onClick={() => actualizarPedido()}
            type="button"
            className="btn btn-azul"
            value="Actualizar Pedido"
          />
        </div>
      ) : null}
    </Fragment>
  );
}

export default withRouter(PedidoEdit);
