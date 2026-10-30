import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Carrito from '../components/Carrito';

const items = [
  { id: 1, nombre: 'ETB ACENDED HEROES', precio: 68000, cantidad: 2, icono: '📦' },
  { id: 2, nombre: 'Sobre pitch black', precio: 8000, cantidad: 1, icono: '🃏' },
];

function renderCarrito(overrides = {}) {
  const props = {
    mostrar: true,
    items,
    onQuitar: vi.fn(),
    onCerrar: vi.fn(),
    onVaciar: vi.fn(),
    ...overrides,
  };

  return { ...render(<Carrito {...props} />), props };
}

describe('Componente Carrito', () => {
  it('muestra el mensaje correspondiente cuando no hay productos', () => {
    renderCarrito({ items: [] });

    expect(screen.getByText('Todavía no agregas productos.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Vaciar carrito' })).not.toBeInTheDocument();
  });

  it('muestra los productos, el total y la opción para vaciar el carrito', () => {
    renderCarrito();

    expect(screen.getByText(/ETB ACENDED HEROES × 2/)).toBeInTheDocument();
    expect(screen.getByText(/Sobre pitch black × 1/)).toBeInTheDocument();
    expect(screen.getByText(/Total:/)).toHaveTextContent(/144\.000/);
    expect(screen.getByRole('button', { name: 'Vaciar carrito' })).toBeInTheDocument();
  });

  it('solicita quitar el producto seleccionado', async () => {
    const user = userEvent.setup();
    const { props } = renderCarrito();

    await user.click(screen.getAllByRole('button', { name: 'Quitar' })[0]);

    expect(props.onQuitar).toHaveBeenCalledTimes(1);
    expect(props.onQuitar).toHaveBeenCalledWith(items[0].id);
  });

  it('solicita vaciar el carrito', async () => {
    const user = userEvent.setup();
    const { props } = renderCarrito();

    await user.click(screen.getByRole('button', { name: 'Vaciar carrito' }));

    expect(props.onVaciar).toHaveBeenCalledTimes(1);
  });

  it('solicita cerrar el carrito', async () => {
    const user = userEvent.setup();
    const { props } = renderCarrito();

    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(props.onCerrar).toHaveBeenCalledTimes(1);
  });
});
