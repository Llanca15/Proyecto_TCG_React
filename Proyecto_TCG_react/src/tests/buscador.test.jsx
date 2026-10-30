import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Buscador from '../components/Buscador';

const categorias = ['ETB', 'Sobre', 'Blister'];

function renderBuscador(overrides = {}) {
  const props = {
    texto: '',
    onCambiarTexto: vi.fn(),
    categoria: 'Todas',
    onCambiarCategoria: vi.fn(),
    categorias,
    ...overrides,
  };

  return { ...render(<Buscador {...props} />), props };
}

describe('Componente Buscador', () => {
  it('muestra el texto actual y las categorías disponibles', () => {
    renderBuscador({ texto: 'Charizard', categoria: 'ETB' });

    expect(screen.getByRole('searchbox')).toHaveValue('Charizard');
    expect(screen.getByRole('combobox')).toHaveValue('ETB');
    expect(screen.getByRole('option', { name: 'Todas las categorías' })).toBeInTheDocument();

    categorias.forEach((categoria) => {
      expect(screen.getByRole('option', { name: categoria })).toBeInTheDocument();
    });
  });

  it('notifica el nuevo texto de búsqueda', () => {
    const { props } = renderBuscador();

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'Charizard' },
    });

    expect(props.onCambiarTexto).toHaveBeenCalledTimes(1);
    expect(props.onCambiarTexto).toHaveBeenCalledWith('Charizard');
  });

  it('notifica la categoría seleccionada', async () => {
    const user = userEvent.setup();
    const { props } = renderBuscador();

    await user.selectOptions(screen.getByRole('combobox'), 'ETB');

    expect(props.onCambiarCategoria).toHaveBeenCalledTimes(1);
    expect(props.onCambiarCategoria).toHaveBeenCalledWith('ETB');
  });
});
