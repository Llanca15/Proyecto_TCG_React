import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import App from '../App.jsx';

const apiMocks = vi.hoisted(() => ({
  listarProductos: vi.fn(),
  crearPedido: vi.fn(),
  crearProducto: vi.fn(),
  actualizarProducto: vi.fn(),
  eliminarProducto: vi.fn(),
  reordenarProductos: vi.fn(),
}));

vi.mock('../services/api.js', () => ({
  ...apiMocks,
  mensajeErrorApi: (error, mensajePredeterminado) =>
    error?.message || mensajePredeterminado,
}));

const productosApi = [
  {
    id: 1,
    nombre: 'ETB de prueba',
    descripcion: 'Producto de prueba',
    precio: 12000,
    descuento: 0,
    stock: 5,
    categoria: 'ETB',
    imagen: '/etb.jpg',
    orden: 0,
  },
];

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
  apiMocks.listarProductos.mockResolvedValue(productosApi);
  apiMocks.crearPedido.mockResolvedValue({ id: 42 });
});

describe('flujo de compra de la aplicación', () => {
  it('agrega productos, mantiene compras rechazadas y vacía las aprobadas', async () => {
    const user = userEvent.setup();
    renderApp('/productos');

    const botonAgregar = (await screen.findAllByRole('button', { name: 'Agregar al carrito' }))[0];
    await user.click(botonAgregar);
    await user.click(botonAgregar);
    await user.click(screen.getByRole('button', { name: /Carrito/ }));
    await user.click(screen.getByRole('button', { name: 'Continuar al pago' }));
    await user.type(screen.getByLabelText('Nombre completo'), 'Ana Pérez');
    await user.type(screen.getByLabelText('Correo electrónico'), 'ana@example.com');
    await user.type(screen.getByLabelText('Dirección de despacho'), 'Calle 123');
    await user.selectOptions(
      screen.getByLabelText('Resultado de pago (modo demostración)'),
      'fallido'
    );
    await user.click(screen.getByRole('button', { name: 'Confirmar compra' }));

    expect(await screen.findByText('No se pudo completar el pago')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(apiMocks.crearPedido).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: 'Intentar nuevamente' }));
    await user.type(screen.getByLabelText('Nombre completo'), 'Ana Pérez');
    await user.type(screen.getByLabelText('Correo electrónico'), 'ana@example.com');
    await user.type(screen.getByLabelText('Dirección de despacho'), 'Calle 123');
    await user.click(screen.getByRole('button', { name: 'Confirmar compra' }));

    expect(await screen.findByText('¡Pago exitoso!')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(apiMocks.crearPedido).toHaveBeenCalledWith({
      nombre: 'Ana Pérez',
      email: 'ana@example.com',
      direccion: 'Calle 123',
      lineas: [{ productoId: 1, cantidad: 2 }],
    });
    expect(JSON.parse(localStorage.getItem('carrito-loquieres'))).toEqual([]);
  });

  it('muestra errores del backend y permite volver a cargar el catálogo', async () => {
    const user = userEvent.setup();
    apiMocks.listarProductos
      .mockRejectedValueOnce(new Error('Backend no disponible'))
      .mockResolvedValueOnce(productosApi);

    renderApp('/checkout');

    expect(await screen.findByRole('alert')).toHaveTextContent('Backend no disponible');
    await user.click(screen.getByRole('button', { name: 'Reintentar conexión' }));
    expect(await screen.findByText('Tu carrito está vacío')).toBeInTheDocument();
  });

  it('permite quitar y vaciar productos del carrito', async () => {
    const user = userEvent.setup();
    renderApp('/productos');

    await user.click((await screen.findAllByRole('button', { name: 'Agregar al carrito' }))[0]);
    await user.click(screen.getByRole('button', { name: /Carrito/ }));
    await user.click(screen.getByRole('button', { name: 'Quitar' }));

    expect(screen.getByText('Todavía no agregas productos.')).toBeInTheDocument();
  });

  it('tolera un carrito guardado con JSON inválido', () => {
    localStorage.setItem('carrito-loquieres', '{');
    renderApp('/checkout');

    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
  });
});
