import { Card, Button, Badge } from 'react-bootstrap';
import { formatearPrecio } from '../utils/Formato.jsx';

function TarjetaProducto({ producto, onAgregar }) {
  const { nombre, descripcion, precio, descuento, stock, imagen } = producto;
  const stockDisponible = Number(stock);
  const agotado = !Number.isFinite(stockDisponible) || stockDisponible <= 0;

  // Calcular precio con descuento si aplica
  const tieneDescuento = Number(descuento) > 0;
  const precioFinal = tieneDescuento ? precio * (1 - descuento / 100) : precio;

  // Al agregar al carrito, podemos mandar el precio ya con descuento aplicado
  const productoParaAgregar = {
    ...producto,
    precio: precioFinal
  };

  return (
    <Card className="tarjeta-producto h-100 position-relative">
      {tieneDescuento && (
        <Badge bg="danger" className="position-absolute top-0 end-0 m-2 p-2">
          -{descuento}%
        </Badge>
      )}

      <div className="contenedor-imagen-producto">
        <Card.Img
          src={imagen}
          alt={nombre}
          className="imagen-producto"
        />
      </div>

      <Card.Body className="cuerpo-producto d-flex flex-column">
        <Card.Title className="titulo-producto">
          {nombre}
        </Card.Title>

        <Card.Text className="descripcion-producto">
          {descripcion}
        </Card.Text>

        <div className="mb-2">
          {tieneDescuento ? (
            <div>
              <span className="text-muted text-decoration-line-through me-2">
                {formatearPrecio(precio)}
              </span>
              <span className="precio-producto fw-bold text-danger">
                {formatearPrecio(precioFinal)}
              </span>
            </div>
          ) : (
            <Card.Text className="precio-producto">
              {formatearPrecio(precio)}
            </Card.Text>
          )}
        </div>

        <Card.Text className={agotado ? 'text-danger' : 'text-success'}>
          {agotado ? 'Sin stock' : `Quedan ${stockDisponible} unidades`}
        </Card.Text>

        <Button
          className="mt-auto boton-producto"
          disabled={agotado}
          onClick={() => onAgregar(productoParaAgregar)}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default TarjetaProducto;