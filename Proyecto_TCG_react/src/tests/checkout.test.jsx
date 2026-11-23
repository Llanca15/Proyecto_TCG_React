import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import Checkout from '../pages/Checkout.jsx';
import ResultadoPago from '../pages/ResultadoPago.jsx';

const items = [
  { id: 1, nombre: 'ETB Pokémon', precio: 12000, cantidad: 2 },
];

function renderCheckout(props = {}) {
  return render(
    <MemoryRouter initialEntries={['/checkout']}>
      <Routes>
        <Route
          path="/checkout"
          element={<Checkout items={items} onProcesarPago={vi.fn()} {...props} />}
        />
        <Route path="/pago-exitoso" element={<ResultadoPago exitoso />} />
        <Route path="/pago-fallido" element={<ResultadoPago />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Checkout', () => {
  it('muestra el resumen y exige los datos del cliente', () => {
    renderCheckout();

    expect(screen.getByText('ETB Pokémon × 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre completo')).toBeRequired();
    expect(screen.getByLabelText('Correo electrónico')).toBeRequired();
    expect(screen.getByLabelText('Dirección de despacho')).toBeRequired();
    expect(screen.getByText(/no procesa pagos reales/)).toBeInTheDocument();
  });

  it('vacía el carrito y muestra el resultado aprobado', async () => {
    const user = userEvent.setup();
    const onProcesarPago = vi.fn().mockResolvedValue({ id: 9 });
    renderCheckout({ onProcesarPago });

    await user.type(screen.getByLabelText('Nombre completo'), 'Ana Pérez');
    await user.type(screen.getByLabelText('Correo electrónico'), 'ana@example.com');
    await user.type(screen.getByLabelText('Dirección de despacho'), 'Calle 123');
    await user.click(screen.getByRole('button', { name: 'Confirmar compra' }));

    expect(onProcesarPago).toHaveBeenCalledWith({
      cliente: {
        nombre: 'Ana Pérez',
        email: 'ana@example.com',
        direccion: 'Calle 123',
      },
      lineas: [{ productoId: 1, cantidad: 2 }],
    });
    expect(await screen.findByText('¡Pago exitoso!')).toBeInTheDocument();
    expect(screen.getByText(/Ana Pérez/)).toBeInTheDocument();
    expect(screen.getByText(/Número de pedido: 9/)).toBeInTheDocument();
  });

  it('conserva el carrito cuando se simula un pago rechazado', async () => {
    const user = userEvent.setup();
    const onProcesarPago = vi.fn();
    renderCheckout({ onProcesarPago });

    await user.type(screen.getByLabelText('Nombre completo'), 'Ana Pérez');
    await user.type(screen.getByLabelText('Correo electrónico'), 'ana@example.com');
    await user.type(screen.getByLabelText('Dirección de despacho'), 'Calle 123');
    await user.selectOptions(
      screen.getByLabelText('Resultado de pago (modo demostración)'),
      'fallido'
    );
    await user.click(screen.getByRole('button', { name: 'Confirmar compra' }));

    expect(onProcesarPago).not.toHaveBeenCalled();
    expect(await screen.findByText('No se pudo completar el pago')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Intentar nuevamente' })).toHaveAttribute(
      'href',
      '/checkout'
    );
  });

  it('no muestra éxito ni vacía el flujo si el backend rechaza el pedido', async () => {
    const user = userEvent.setup();
    const onProcesarPago = vi.fn().mockRejectedValue(
      new Error('Stock insuficiente')
    );
    renderCheckout({ onProcesarPago });

    await user.type(screen.getByLabelText('Nombre completo'), 'Ana Pérez');
    await user.type(screen.getByLabelText('Correo electrónico'), 'ana@example.com');
    await user.type(screen.getByLabelText('Dirección de despacho'), 'Calle 123');
    await user.click(screen.getByRole('button', { name: 'Confirmar compra' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Stock insuficiente');
    expect(screen.getByRole('heading', { name: 'Finalizar compra' })).toBeInTheDocument();
  });

  it('ofrece volver al catálogo si el carrito está vacío', () => {
    render(
      <MemoryRouter>
        <Checkout items={[]} onProcesarPago={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: 'Volver al catálogo' })).toHaveAttribute(
      'href',
      '/productos'
    );
  });
});
