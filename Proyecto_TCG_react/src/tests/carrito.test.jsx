import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Carrito from '../components/Carrito' // Ajusta la ruta según dónde ubiques tu archivo de test

describe('Componente <Carrito />', () => {
  const itemsMock = [
    { id: 1, nombre: 'ETB ACENDED HEROES', precio: 68000, cantidad: 2, icono: '📦' },
    { id: {toString: () => '2'}, id: 2, nombre: 'Sobre pitch black', precio: 8000, cantidad: 1, icono: '🃏' }
  ]

  it('muestra mensaje de carrito vacío cuando no hay items', () => {
    render(<Carrito mostrar={true} items={[]} onQuitar={() => {}} onCerrar={() => {}} onVaciar={() => {}} />)

    expect(screen.getByText(/Todavía no agregas productos./i)).toBeInTheDocument()
  })

  it('renderiza los items, calcula el total correctamente y muestra el botón de vaciar', () => {
    render(
      <Carrito 
        mostrar={true} 
        items={itemsMock} 
        onQuitar={() => {}} 
        onCerrar={() => {}} 
        onVaciar={() => {}} 
      />
    )

    // Verificar que los productos aparecen en el DOM
    expect(screen.getByText(/ETB ACENDED HEROES × 2/i)).toBeInTheDocument()
    expect(screen.getByText(/Sobre pitch black × 1/i)).toBeInTheDocument()

    // Cálculo total esperado: (68000 * 2) + (8000 * 1) = 144000
    // formatearPrecio usa 'es-CL' con CLP (ej: $ 144.000,00 o similar según entorno)
    const totalTexto = screen.getByText(/Total:/i)
    expect(totalTexto).toHaveTextContent(/144\.000/)

    // Verificar botones de acción
    expect(screen.getByRole('button', { name: /Vaciar carrito/i })).toBeInTheDocument()
  })

  it('llama a la función onQuitar con el id correcto al hacer clic en "Quitar"', async () => {
    const handleQuitar = vi.fn()
    const user = userEvent.setup()

    render(
      <Carrito 
        mostrar={true} 
        items={itemsMock} 
        onQuitar={handleQuitar} 
        onCerrar={() => {}} 
        onVaciar={() => {}} 
      />
    )

    const botonesQuitar = screen.getAllByRole('button', { name: /Quitar/i })
    await user.click(botonesQuitar[0])

    expect(handleQuitar).toHaveBeenCalledTimes(1)
    expect(handleQuitar).toHaveBeenCalledWith(itemsMock[0].id)
  })

  it('llama a la función onVaciar al hacer clic en el botón "Vaciar carrito"', async () => {
    const handleVaciar = vi.fn()
    const user = userEvent.setup()

    render(
      <Carrito 
        mostrar={true} 
        items={itemsMock} 
        onQuitar={() => {}} 
        onCerrar={() => {}} 
        onVaciar={handleVaciar} 
      />
    )

    const botonVaciar = screen.getByRole('button', { name: /Vaciar carrito/i })
    await user.click(botonVaciar)

    expect(handleVaciar).toHaveBeenCalledTimes(1)
  })
})