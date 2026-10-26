import productos from '../data/productos.js'
import Catalogo from '../components/Catalogo.jsx'
import { Container } from 'react-bootstrap'

export default function Productos() {
  return (
    <Container style={{ padding: '40px', color: 'black' }}>
      <h1>Catálogo de productos</h1>
      <p>Aquí aparecerán las cartas Pokémon.</p>
      <Catalogo productos={productos} />
    </Container>
  );
}