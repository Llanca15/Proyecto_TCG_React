
import { useState } from 'react';
import { Routes, Route } from 'react-router';

import productos from './data/productos.js';
import Encabezado from './components/Encabezado';
import Portada from './components/Portada';
import PiePagina from './components/PiePagina';
import Productos from './pages/Productos';
import Carrito from './components/Carrito';

export default function App() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

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
    setCarrito((actual) =>
      actual.filter((item) => item.id !== id)
    );
  }

  return (
    <>
      {/* ÚNICO encabezado de la aplicación */}
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
        </Routes>
      </main>

      {/* ÚNICO carrito de la aplicación */}
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
