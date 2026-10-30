import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TarjetaProducto from '../components/TarjetaProducto.jsx';

describe('TarjetaProducto Component', () => {
  const productoBase = {
    id: 1,
    nombre: 'ETB ACENDED HEROES',
    descripcion: 'Etb de la expansion acended heroes',
    precio: 80000,
    descuento: 0,
    stock: 10,
    imagen: '/images/productos_etb/etb_acended_heroes.jpg',
  };

  it('renderiza correctamente la información básica del producto', () => {
    render(<TarjetaProducto producto={productoBase} onAgregar={() => {}} />);

    expect(screen.getByText('ETB ACENDED HEROES')).toBeInTheDocument();
    expect(screen.getByText('Etb de la expansion acended heroes')).toBeInTheDocument();
    expect(screen.getByText('Quedan 10 unidades')).toBeInTheDocument();
    
    const imagen = screen.getByRole('img', { name: /ETB ACENDED HEROES/i });
    expect(imagen).toHaveAttribute('src', '/images/productos_etb/etb_acended_heroes.jpg');
  });

  it('muestra el precio formateado cuando no tiene descuento', () => {
    render(<TarjetaProducto producto={productoBase} onAgregar={() => {}} />);

    // Verifica que aparezca el precio formateado en CLP
    expect(screen.getByText('$80.000')).toBeInTheDocument();
    expect(screen.queryByText(/-[0-9]+%/)).not.toBeInTheDocument();
  });

  it('calcula y muestra correctamente el descuento y precio final', () => {
    const productoConDescuento = {
      ...productoBase,
      descuento: 15, // 15% de 80.000 es 12.000 -> Precio final: 68.000
    };

    render(<TarjetaProducto producto={productoConDescuento} onAgregar={() => {}} />);

    // Muestra el badge con el porcentaje de descuento
    expect(screen.getByText('-15%')).toBeInTheDocument();

    // Muestra el precio original tachado y el nuevo precio calculado
    expect(screen.getByText('$80.000')).toHaveClass('text-decoration-line-through');
    expect(screen.getByText('$68.000')).toBeInTheDocument();
  });

  it('deshabilita el botón y muestra "Sin stock" cuando el stock es 0', () => {
    const productoAgotado = {
      ...productoBase,
      stock: 0,
    };

    render(<TarjetaProducto producto={productoAgotado} onAgregar={() => {}} />);

    expect(screen.getByText('Sin stock')).toBeInTheDocument();

    const boton = screen.getByRole('button', { name: /Agregar al carrito/i });
    expect(boton).toBeDisabled();
  });

  it('llama a la función onAgregar con el producto y el precio con descuento aplicado al hacer clic', async () => {
    const onAgregarMock = vi.fn();
    const user = userEvent.setup();
    const productoConDescuento = {
      ...productoBase,
      descuento: 20, // Precio final: 64.000
    };

    render(<TarjetaProducto producto={productoConDescuento} onAgregar={onAgregarMock} />);

    const boton = screen.getByRole('button', { name: /Agregar al carrito/i });
    await user.click(boton);

    expect(onAgregarMock).toHaveBeenCalledTimes(1);
    expect(onAgregarMock).toHaveBeenCalledWith({
      ...productoConDescuento,
      precio: 64000,
    });
  });
});