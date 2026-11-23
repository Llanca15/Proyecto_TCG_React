import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import { Alert, Button } from 'react-bootstrap';
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
import Checkout from './pages/Checkout.jsx';
import ResultadoPago from './pages/ResultadoPago.jsx';
import {
  actualizarProducto as actualizarProductoApi,
  crearPedido,
  crearProducto,
  eliminarProducto as eliminarProductoApi,
  listarProductos,
  mensajeErrorApi,
  reordenarProductos as reordenarProductosApi,
} from './services/api.js';

const CLAVE_CARRITO = 'carrito-loquieres';

function cargarCarritoGuardado() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState(cargarCarritoGuardado);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [inventario, setInventario] = useState([]);
  const [cargandoProductos, setCargandoProductos] = useState(true);
  const [errorApi, setErrorApi] = useState('');
  const [intentosCarga, setIntentosCarga] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('usuario_rol') === 'admin'
  );

  useEffect(() => {
    let vigente = true;
    listarProductos()
      .then((productos) => {
        if (!vigente) return;
        setInventario(productos);
        setErrorApi('');
      })
      .catch((error) => {
        if (vigente) {
          setErrorApi(mensajeErrorApi(error, 'No se pudo cargar el catálogo.'));
        }
      })
      .finally(() => {
        if (vigente) setCargandoProductos(false);
      });

    return () => {
      vigente = false;
    };
  }, [intentosCarga]);

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);

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

  async function agregarProducto(producto) {
    try {
      const creado = await crearProducto(producto);
      setInventario((actual) => [...actual, creado]);
      setErrorApi('');
      return creado;
    } catch (error) {
      setErrorApi(mensajeErrorApi(error, 'No se pudo crear el producto.'));
      throw error;
    }
  }

  async function actualizarProducto(productoActualizado) {
    try {
      const actualizado = await actualizarProductoApi(productoActualizado);
      setInventario((actual) =>
        actual.map((producto) =>
          producto.id === actualizado.id ? actualizado : producto
        )
      );
      setErrorApi('');
      return actualizado;
    } catch (error) {
      setErrorApi(mensajeErrorApi(error, 'No se pudo actualizar el producto.'));
      throw error;
    }
  }

  async function eliminarProducto(id) {
    try {
      await eliminarProductoApi(id);
      setInventario((actual) => actual.filter((producto) => producto.id !== id));
      setErrorApi('');
    } catch (error) {
      setErrorApi(mensajeErrorApi(error, 'No se pudo eliminar el producto.'));
      throw error;
    }
  }

  async function reordenarProductos(productosReordenados) {
    try {
      const actualizados = await reordenarProductosApi(productosReordenados);
      setInventario(actualizados);
      setErrorApi('');
      return actualizados;
    } catch (error) {
      setErrorApi(mensajeErrorApi(error, 'No se pudo guardar el orden.'));
      throw error;
    }
  }

  async function procesarPedido({ cliente, lineas }) {
    try {
      const pedido = await crearPedido({
        nombre: cliente.nombre,
        email: cliente.email,
        direccion: cliente.direccion,
        lineas,
      });
      setCarrito([]);
      setErrorApi('');
      listarProductos()
        .then(setInventario)
        .catch((error) => {
          setErrorApi(mensajeErrorApi(
            error,
            'El pedido se confirmó, pero no se pudo actualizar el catálogo.'
          ));
        });
      return pedido;
    } catch (error) {
      setErrorApi(mensajeErrorApi(error, 'No se pudo confirmar el pedido.'));
      throw error;
    }
  }

  function reintentarConexion() {
    setErrorApi('');
    setCargandoProductos(true);
    setIntentosCarga((intento) => intento + 1);
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
        {errorApi && (
          <Alert variant="danger" role="alert">
            {errorApi}
            <Button
              className="ms-2"
              size="sm"
              variant="outline-danger"
              onClick={reintentarConexion}
            >
              Reintentar conexión
            </Button>
          </Alert>
        )}
        <Routes>
          <Route path="/" element={<Portada />} />
          <Route
            path="/productos"
            element={
              cargandoProductos
                ? <p role="status">Cargando catálogo…</p>
                : <Productos productos={inventario} onAgregar={agregarAlCarrito} />
            }
          />
          <Route path="/contacto" element={<Contacto />} />
          
          <Route path="/liga-pokemon" element={<LigaPokemon />} />
          <Route
            path="/checkout"
            element={
              <Checkout
                items={carrito}
                onProcesarPago={procesarPedido}
              />
            }
          />
          <Route
            path="/pago-exitoso"
            element={<ResultadoPago exitoso />}
          />
          <Route
            path="/pago-fallido"
            element={<ResultadoPago />}
          />
          
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
        onCheckout={() => {
          setMostrarCarrito(false);
          navigate('/checkout');
        }}
      />

      <PiePagina />
    </>
  );
}