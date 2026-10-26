
import { Container } from 'react-bootstrap';
import Catalogo from '../components/Catalogo.jsx';

export default function Productos({ productos, onAgregar }) {
  return (
    <Container
      as="section"
      id="catalogo"
      style={{ padding: '40px 0', color: 'black' }}
    >
      <h2 className="mb-3">Catálogo</h2>
      <p>Aquí aparecerán las cartas Pokémon.</p>

      <Catalogo
        productos={productos}
        onAgregar={onAgregar}
      />
    </Container>
  );
}
