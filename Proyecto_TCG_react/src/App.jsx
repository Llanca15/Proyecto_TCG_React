import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import productos from './data/productos.js';
import Encabezado from './components/Encabezado';
import Portada from './components/Portada';
import PiePagina from './components/PiePagina';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import Carrito from './components/Carrito';

const CLAVE_CARRITO = 'carrito-loquieres';

// Recuperar el carrito guardado en el navegador.
function cargarCarritoGuardado() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [carrito, setCarrito] = useState(cargarCarritoGuardado);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  // Guardar el carrito cada vez que cambie.
  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);

  const cantidadTotal = carrito.reduce(
    (suma, item) => suma + item.cantidad,
    0
  );

  function agregarAlCarrito(producto) {
    setCarrito((actual) => {
      const existe = actual.find(
        (item) => item.id === producto.id
      );

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
    setCarrito((actual) =>
      actual.filter((item) => item.id !== id)
    );
  }

  return (
    <>
      <Encabezado
        cantidad={cantidadTotal}
        onVerCarrito={() => setMostrarCarrito(true)}
      />

      <main>
        <Routes>
          <Route path="/" element={<Portada />} />

          <Route
            path="/productos"
            element={
              <Productos
                productos={productos}
                onAgregar={agregarAlCarrito}
              />
            }
          />

          {/* Página de contacto */}
          <Route
            path="/contacto"
            element={<Contacto />}
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