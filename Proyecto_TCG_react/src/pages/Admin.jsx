import React from 'react';
// Asegúrate de importar tu archivo CSS si estás en React:
// import './css/admin.css';

const AdminPanel = () => {
  return (
    <>
      <header>
        <h1>Bienvenido Admin!</h1>
      </header>

      <main>
        <nav className="menu">
          <a href="/pokemon_tcg"> INICIO </a>
          <a href="/productos_tcg"> PRODUCTOS </a>
          <a href="/contacto_tcg"> CONTACTO </a>
        </nav>

        <section id="Manejar_inventario">
          <form id="formProducto" className="mb-4">
            <h3>Agregar nuevo producto</h3>
            <input 
              type="text" 
              id="nombreProducto" 
              placeholder="Nombre" 
              className="form-control mb-2" 
              required 
            />
            <input 
              type="number" 
              id="precioProducto" 
              placeholder="Precio" 
              className="form-control mb-2" 
              required 
            />
            <input 
              type="text" 
              id="imagenProducto" 
              placeholder="URL de imagen" 
              className="form-control mb-2" 
              required 
            />
            <button type="submit" className="btn btn-danger">Agregar producto</button>
          </form>
        </section>

        <section id="Eliminar_productos">
          <h3>Eliminar producto</h3>
          <input 
            type="text" 
            id="nombreEliminar" 
            placeholder="Nombre del producto a eliminar" 
            className="form-control mb-2" 
            required 
          />
          <button type="button" className="btn btn-warning">Eliminar producto</button>
        </section>

        <section id="actualizar_producto">
          <h3>Actualizar producto</h3>
          <input 
            type="text" 
            id="nombreActualizar" 
            placeholder="Nombre del producto a actualizar" 
            className="form-control mb-2" 
            required 
          />
          <input 
            type="text" 
            id="nuevoNombre" 
            placeholder="Nuevo nombre" 
            className="form-control mb-2" 
          />
          <input 
            type="number" 
            id="nuevoPrecio" 
            placeholder="Nuevo precio" 
            className="form-control mb-2" 
          />
          <input 
            type="text" 
            id="nuevaImagen" 
            placeholder="Nueva URL de imagen" 
            className="form-control mb-2" 
          />
          <button type="button" className="btn btn-success">Actualizar producto</button>
        </section>
      </main>
    </>
  );
};

export default AdminPanel;