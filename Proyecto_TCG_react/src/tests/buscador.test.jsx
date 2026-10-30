import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Buscador from '../components/Buscador' // Ajusta la ruta según donde tengas tu archivo

describe('Componente Buscador', () => {
  const categoriasMock = ['ETB', 'Sobre', 'Blister']

  it('renderiza el input de búsqueda y el selector con sus categorías', () => {
    render(
      <Buscador
        texto=""
        onCambiarTexto={() => {}}
        categoria="Todas"
        onCambiarCategoria={() => {}}
        categorias={categoriasMock}
      />
    )

    // Verificar que el input de búsqueda está presente
    const inputBusqueda = screen.getByPlaceholderText(/buscar coleccion por nombre.../i)
    expect(inputBusqueda).toBeInTheDocument()

    // Verificar la opción por defecto del select
    expect(screen.getByText('Todas las categorías')).toBeInTheDocument()

    // Verificar que cada categoría de la lista se renderiza como opción
    categoriasMock.forEach((cat) => {
      expect(screen.getByRole('option', { name: cat })).toBeInTheDocument()
    })
  })

  it('llama a onCambiarTexto cuando el usuario escribe en el buscador', async () => {
    const handleCambiarTexto = vi.fn()
    const user = userEvent.setup()

    render(
      <Buscador
        texto=""
        onCambiarTexto={handleCambiarTexto}
        categoria="Todas"
        onCambiarCategoria={() => {}}
        categorias={categoriasMock}
      />
    )

    const inputBusqueda = screen.getByPlaceholderText(/buscar coleccion por nombre.../i)
    
    // Escribir en el input
    await user.type(inputBusqueda, 'Charizard')

    // Comprueba que se haya llamado a la función por cada letra escrita
    expect(handleCambiarTexto).toHaveBeenCalled()
  })

  it('llama a onCambiarCategoria cuando el usuario selecciona otra categoría', async () => {
    const handleCambiarCategoria = vi.fn()
    const user = userEvent.setup()

    render(
      <Buscador
        texto=""
        onCambiarTexto={() => {}}
        categoria="Todas"
        onCambiarCategoria={handleCambiarCategoria}
        categorias={categoriasMock}
      />
    )

    const selectCategoria = screen.getByRole('combobox')

    // Cambiar la selección del select
    await user.selectOptions(selectCategoria, 'ETB')

    expect(handleCambiarCategoria).toHaveBeenCalledWith('ETB')
  })
})