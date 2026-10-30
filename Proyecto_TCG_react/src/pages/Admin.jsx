import { useState } from 'react';
import { Alert, Button, Table } from 'react-bootstrap';
import { formatearPrecio } from '../data/productos.js';
import './Admin.css';

const formularioVacio = {
  nombre: '',
  descripcion: '',
  precio: '',
  descuento: '',
  stock: '',
  categoria: '',
  imagen: '',
};

const AdminPanel = ({
  productos,
  onAgregarProducto,
  onActualizarProducto,
  onEliminarProducto,
  onReordenarProductos,
}) => {
  const [formulario, setFormulario] = useState(formularioVacio);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [mensajeOrden, setMensajeOrden] = useState('');
  const [productoArrastrado, setProductoArrastrado] = useState(null);

  function cambiarCampo(event) {
    const { name, value } = event.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
  }

  function guardarProducto(event) {
    event.preventDefault();
    const producto = {
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim(),
      precio: Number(formulario.precio),
      descuento: Number(formulario.descuento) || 0,
      stock: Number(formulario.stock),
      categoria: formulario.categoria.trim(),
      imagen: formulario.imagen.trim(),
    };

    if (productoEditando === null) {
      onAgregarProducto(producto);
      setMensaje('Producto agregado correctamente.');
    } else {
      onActualizarProducto({ ...producto, id: productoEditando });
      setMensaje('Producto actualizado correctamente.');
    }

    cancelarEdicion();
  }

  function editarProducto(producto) {
    setProductoEditando(producto.id);
    setFormulario({
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      precio: String(producto.precio),
      descuento: String(producto.descuento || ''),
      stock: String(producto.stock),
      categoria: producto.categoria || '',
      imagen: producto.imagen,
    });
    setMensaje('');
    document.getElementById('formProducto')?.scrollIntoView?.({
      behavior: 'smooth',
      block: 'start',
    });
  }

  function cancelarEdicion() {
    setProductoEditando(null);
    setFormulario(formularioVacio);
  }

  function eliminar(producto) {
    onEliminarProducto(producto.id);
    if (productoEditando === producto.id) cancelarEdicion();
    setMensaje(`Se eliminó "${producto.nombre}".`);
  }

  function soltarProducto(event, productoDestino) {
    event.preventDefault();
    if (productoArrastrado === null || productoArrastrado === productoDestino.id) {
      return;
    }

    const indiceOrigen = productos.findIndex(
      (producto) => producto.id === productoArrastrado
    );
    const indiceDestino = productos.findIndex(
      (producto) => producto.id === productoDestino.id
    );
    if (indiceOrigen === -1 || indiceDestino === -1) return;

    const productosReordenados = [...productos];
    const [productoMovido] = productosReordenados.splice(indiceOrigen, 1);
    productosReordenados.splice(indiceDestino, 0, productoMovido);
    onReordenarProductos(productosReordenados);
    setMensajeOrden(`"${productoMovido.nombre}" ahora está en la posición ${indiceDestino + 1}.`);
    setProductoArrastrado(null);
  }

  return (
    <div className="admin-panel">
      <section id="Manejar_inventario">
        <form id="formProducto" className="mb-4" onSubmit={guardarProducto}>
          <h2>{productoEditando === null ? 'Agregar producto' : 'Editar producto'}</h2>
          {mensaje && <Alert variant="success" role="status">{mensaje}</Alert>}
          <label className="form-label" htmlFor="nombreProducto">Nombre</label>
          <input
            className="form-control mb-2"
            id="nombreProducto"
            name="nombre"
            value={formulario.nombre}
            onChange={cambiarCampo}
            required
          />
          <label className="form-label" htmlFor="descripcionProducto">Descripción</label>
          <textarea
            className="form-control mb-2"
            id="descripcionProducto"
            name="descripcion"
            value={formulario.descripcion}
            onChange={cambiarCampo}
            required
          />
          <label className="form-label" htmlFor="precioProducto">Precio (CLP)</label>
          <input
            className="form-control mb-2"
            id="precioProducto"
            name="precio"
            type="number"
            min="1"
            step="1"
            value={formulario.precio}
            onChange={cambiarCampo}
            required
          />
          <label className="form-label" htmlFor="descuentoProducto">Descuento (%)</label>
          <input
            className="form-control mb-2"
            id="descuentoProducto"
            name="descuento"
            type="number"
            min="0"
            max="100"
            value={formulario.descuento}
            onChange={cambiarCampo}
          />
          <label className="form-label" htmlFor="stockProducto">Stock</label>
          <input
            className="form-control mb-2"
            id="stockProducto"
            name="stock"
            type="number"
            min="0"
            step="1"
            value={formulario.stock}
            onChange={cambiarCampo}
            required
          />
          <label className="form-label" htmlFor="categoriaProducto">Categoría</label>
          <input
            className="form-control mb-2"
            id="categoriaProducto"
            name="categoria"
            value={formulario.categoria}
            onChange={cambiarCampo}
            required
          />
          <label className="form-label" htmlFor="imagenProducto">URL de imagen</label>
          <input
            className="form-control mb-3"
            id="imagenProducto"
            name="imagen"
            type="text"
            value={formulario.imagen}
            onChange={cambiarCampo}
            required
          />
          <Button type="submit" variant="danger">
            {productoEditando === null ? 'Agregar producto' : 'Guardar cambios'}
          </Button>
          {productoEditando !== null && (
            <Button className="ms-2" type="button" variant="secondary" onClick={cancelarEdicion}>
              Cancelar
            </Button>
          )}
        </form>
      </section>

      <section className="admin-inventario">
        <h2>Inventario ({productos.length})</h2>
        <p>Arrastra una fila para cambiar el orden de los productos en la tienda.</p>
        {mensajeOrden && <p className="text-success" role="status">{mensajeOrden}</p>}
        {productos.length === 0 ? (
          <Alert variant="info">No hay productos en el inventario.</Alert>
        ) : (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr
                  key={producto.id}
                  draggable
                  onDragStart={() => setProductoArrastrado(producto.id)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => soltarProducto(event, producto)}
                  onDragEnd={() => setProductoArrastrado(null)}
                  className={productoArrastrado === producto.id ? 'producto-arrastrado' : ''}
                  aria-label={`Producto reordenable: ${producto.nombre}`}
                >
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>{formatearPrecio(producto.precio)}</td>
                  <td>{producto.stock}</td>
                  <td className="admin-acciones">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => editarProducto(producto)}
                      aria-label={`Editar ${producto.nombre}`}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => eliminar(producto)}
                      aria-label={`Eliminar ${producto.nombre}`}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;