
import { Card, Button } from 'react-bootstrap';
import { formatearPrecio } from '../utils/Formato.jsx';

function TarjetaProducto({ producto, onAgregar }) {
  const { nombre, descripcion, precio, stock, imagen } = producto;
  const agotado = stock === 0;

  return (
    <Card className="tarjeta-producto h-100">
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

        <Card.Text className="precio-producto">
          {formatearPrecio(precio)}
        </Card.Text>

        <Card.Text className={agotado ? 'text-danger' : 'text-success'}>
          {agotado ? 'Sin stock' : `Quedan ${stock} unidades`}
        </Card.Text>

        <Button
          className="mt-auto boton-producto"
          disabled={agotado}
          onClick={() => onAgregar(producto)}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default TarjetaProducto;
