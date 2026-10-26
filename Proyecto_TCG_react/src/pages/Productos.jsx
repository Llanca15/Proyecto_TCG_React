
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Catalogo from '../components/Catalogo.jsx'
import Buscador from '../components/Buscador.jsx'

export default function Productos({ productos, onAgregar }) {
  const [texto, setTexto] = useState('')
  const [categoria, setCategoria] = useState('Todas')

  // Obtener las categorías disponibles sin repetirlas.
  const categorias = [
    ...new Set(productos.map((producto) => producto.categoria))
  ]

  // Filtrar productos por nombre y categoría.
  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = producto.nombre
      .toLowerCase()
      .includes(texto.trim().toLowerCase())

    const coincideCategoria =
      categoria === 'Todas' ||
      producto.categoria === categoria

    return coincideNombre && coincideCategoria
  })

  return (
    <Container
      as="section"
      id="catalogo"
      style={{ padding: '40px 0', color: 'black' }}
    >
      <h2 className="mb-3">Catálogo de cartas Pokémon</h2>
      <p>Busca tus cartas por nombre o categoría.</p>

      <Buscador
        texto={texto}
        onCambiarTexto={setTexto}
        categoria={categoria}
        onCambiarCategoria={setCategoria}
        categorias={categorias}
      />

      <Catalogo
        productos={productosFiltrados}
        onAgregar={onAgregar}
      />
    </Container>
  )
}
