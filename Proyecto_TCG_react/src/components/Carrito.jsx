import { Offcanvas, ListGroup, Button } from 'react-bootstrap'
import { formatearPrecio } from '../data/productos.js'
//delegacion de funciones
function Carrito({ mostrar,  items, onQuitar, onCerrar,onVaciar }) {
  // Dato derivado: se calcula en cada render, NO se guarda en el estado.
  const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0)

  return (
    
    <Offcanvas show={mostrar} onHide={onCerrar} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>🛒 Tu carrito</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {items.length === 0 ? (
          <p className="text-muted">Todavía no agregas productos.</p>
        ) : (
          <>
            <ListGroup className="mb-3">
              {items.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>
                    {item.icono} {item.nombre} × {item.cantidad}
                  </span>
                  <Button size="sm" variant="outline-danger" onClick={() => onQuitar(item.id)}>
                    Quitar
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <p className="fs-5">
              Total: <strong>{formatearPrecio(total)}</strong>
            </p>
            <Button variant="outline-secondary" onClick={onVaciar}>
              Vaciar carrito
            </Button>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default Carrito