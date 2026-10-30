import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router'; // o 'react-router-dom'

import productos from './data/productos.js';
import Encabezado from './components/Encabezado';
import Portada from './components/Portada';
import PiePagina from './components/PiePagina';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import LigaPokemon from './pages/Liga_pokemon';
import Login from './pages/Login';
import Carrito from './components/Carrito';
import AdminPanel from './pages/Admin'; 
import ProtectedRoute from './pages/RutaAdmin.jsx'; 

const CLAVE_CARRITO = 'carrito-loquieres';
const CLAVE_PRODUCTOS = 'productos-tcg';

function cargarCarritoGuardado() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
}

function cargarProductosGuardados() {
  try {
    const guardados = localStorage.getItem(CLAVE_PRODUCTOS);
    if (!guardados) return productos;

    const productosGuardados = JSON.parse(guardados);
    if (Array.isArray(productosGuardados)) return productosGuardados;

    console.error('El inventario guardado no tiene un formato válido.');
    return productos;
  } catch (error) {
    console.error('No se pudo cargar el inventario guardado.', error);
    return productos;
  }
}

export default function App() {
  const [carrito, setCarrito] = useState(cargarCarritoGuardado);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [inventario, setInventario] = useState(cargarProductosGuardados);
  
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('usuario_rol') === 'admin'
  );

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(inventario));
  }, [inventario]);

  const cantidadTotal = carrito.reduce(
    (suma, item) => suma + item.cantidad,
    0
  );

  function agregarAlCarrito(producto) {
    setCarrito((actual) => {
      const existe = actual.find((item) => item.id === producto.id);
      if (existe) {
        return actual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...actual, { ...producto, cantidad: 1 }];
    });
  }

  function quitarDelCarrito(id) {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
  }

  function agregarProducto(producto) {
    setInventario((actual) => {
      const nuevoId = actual.reduce(
        (idMayor, item) => Math.max(idMayor, Number(item.id) || 0),
        0
      ) + 1;
      return [...actual, { ...producto, id: nuevoId }];
    });
  }

  function actualizarProducto(productoActualizado) {
    setInventario((actual) =>
      actual.map((producto) =>
        producto.id === productoActualizado.id
          ? productoActualizado
          : producto
      )
    );
  }

  function eliminarProducto(id) {
    setInventario((actual) => actual.filter((producto) => producto.id !== id));
  }

  function reordenarProductos(productosReordenados) {
    setInventario(productosReordenados);
  }

  return (
    <>
      <Encabezado
        cantidad={cantidadTotal}
        onVerCarrito={() => setMostrarCarrito(true)}
        isAuthenticated={isAuthenticated}
        onCerrarSesion={() => setIsAuthenticated(false)}
      />

      <main>
        <Routes>
          <Route path="/" element={<Portada />} />
          <Route
            path="/productos"
            element={
              <Productos productos={inventario} onAgregar={agregarAlCarrito} />
            }
          />
          <Route path="/contacto" element={<Contacto />} />
          
          <Route path="/liga-pokemon" element={<LigaPokemon />} />
          
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

          <Route 
            path="/admin" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminPanel
                  productos={inventario}
                  onAgregarProducto={agregarProducto}
                  onActualizarProducto={actualizarProducto}
                  onEliminarProducto={eliminarProducto}
                  onReordenarProductos={reordenarProductos}
                />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      <Carrito
        mostrar={mostrarCarrito}
        onCerrar={() => setMostrarCarrito(false)}
        items={carrito}
        onQuitar={quitarDelCarrito}
        onVaciar={() => setCarrito([])}
      />

      <PiePagina />
    </>
  );
}