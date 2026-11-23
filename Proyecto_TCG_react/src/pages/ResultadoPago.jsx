import { Link, useLocation } from 'react-router';
import { Button, Container } from 'react-bootstrap';

export default function ResultadoPago({ exitoso = false }) {
  const { state } = useLocation();

  return (
    <Container className="py-5 text-center" style={{ maxWidth: 680 }}>
      <h1>{exitoso ? '¡Pago exitoso!' : 'No se pudo completar el pago'}</h1>
      {exitoso ? (
        <p>
          Gracias{state?.nombre ? `, ${state.nombre}` : ''}. Tu compra fue confirmada.
          {state?.pedidoId ? ` Número de pedido: ${state.pedidoId}.` : ''}
          {state?.email ? ` Enviaremos los detalles a ${state.email}.` : ''}
        </p>
      ) : (
        <p>Tu carrito sigue guardado. Puedes volver a intentarlo cuando quieras.</p>
      )}
      <Button
        as={Link}
        to={exitoso ? '/productos' : '/checkout'}
        variant={exitoso ? 'success' : 'primary'}
      >
        {exitoso ? 'Seguir comprando' : 'Intentar nuevamente'}
      </Button>
    </Container>
  );
}
