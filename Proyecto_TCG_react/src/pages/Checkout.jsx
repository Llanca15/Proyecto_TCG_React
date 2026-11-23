import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button, Container, Form, ListGroup } from 'react-bootstrap';
import { formatearPrecio } from '../data/productos.js';

export default function Checkout({ items, onProcesarPago }) {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nombre: '',
    email: '',
    direccion: '',
    resultado: 'exitoso',
  });
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState('');
  const total = items.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  );

  function actualizarCampo(evento) {
    const { name, value } = evento.target;
    setCliente((actual) => ({ ...actual, [name]: value }));
  }

  async function procesarPago(evento) {
    evento.preventDefault();
    setError('');

    if (cliente.resultado === 'fallido') {
      navigate('/pago-fallido', {
        state: { nombre: cliente.nombre, email: cliente.email },
      });
      return;
    }

    setProcesando(true);
    try {
      const pedido = await onProcesarPago({
        cliente: {
          nombre: cliente.nombre,
          email: cliente.email,
          direccion: cliente.direccion,
        },
        lineas: items.map((item) => ({
          productoId: item.id,
          cantidad: item.cantidad,
        })),
      });
      navigate('/pago-exitoso', {
        state: {
          nombre: cliente.nombre,
          email: cliente.email,
          pedidoId: pedido.id,
        },
      });
    } catch (errorPeticion) {
      setError(
        errorPeticion.message ||
          'No se pudo confirmar la compra. Revisa tu conexión e inténtalo nuevamente.'
      );
    } finally {
      setProcesando(false);
    }
  }

  if (items.length === 0) {
    return (
      <Container className="py-4">
        <h1>Tu carrito está vacío</h1>
        <p>Agrega productos antes de continuar con la compra.</p>
        <Button as={Link} to="/productos">Volver al catálogo</Button>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ maxWidth: 720 }}>
      <h1>Finalizar compra</h1>
      <h2 className="h5 mt-4">Resumen de compra</h2>
      <ListGroup className="mb-3">
        {items.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex justify-content-between">
            <span>{item.nombre} × {item.cantidad}</span>
            <span>{formatearPrecio(item.precio * item.cantidad)}</span>
          </ListGroup.Item>
        ))}
        <ListGroup.Item className="d-flex justify-content-between fw-bold">
          <span>Total</span>
          <span>{formatearPrecio(total)}</span>
        </ListGroup.Item>
      </ListGroup>

      <Form onSubmit={procesarPago}>
        {error && <p className="text-danger" role="alert">{error}</p>}
        <Form.Group className="mb-3" controlId="checkout-nombre">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control
            name="nombre"
            autoComplete="name"
            value={cliente.nombre}
            onChange={actualizarCampo}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="checkout-email">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            autoComplete="email"
            value={cliente.email}
            onChange={actualizarCampo}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="checkout-direccion">
          <Form.Label>Dirección de despacho</Form.Label>
          <Form.Control
            name="direccion"
            autoComplete="street-address"
            value={cliente.direccion}
            onChange={actualizarCampo}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="checkout-resultado">
          <Form.Label>Resultado de pago (modo demostración)</Form.Label>
          <Form.Select
            name="resultado"
            value={cliente.resultado}
            onChange={actualizarCampo}
          >
            <option value="exitoso">Pago aprobado</option>
            <option value="fallido">Simular pago rechazado</option>
          </Form.Select>
          <Form.Text>
            Esta tienda de demostración no procesa pagos reales ni solicita datos de tarjeta.
          </Form.Text>
        </Form.Group>
        <Button type="submit" variant="primary" disabled={procesando}>
          {procesando ? 'Procesando…' : 'Confirmar compra'}
        </Button>
      </Form>
    </Container>
  );
}
