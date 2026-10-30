import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Catalogo from '../components/Catalogo'; // Ajusta la ruta según tu estructura de carpetas

describe('Componente <Catalogo />', () => {
  const productosMock = [
    {
      id: 1,
      nombre: 'ETB ACENDED HEROES',
      descripcion: 'Etb de la expansion acended heroes',
      precio: 80000,
      descuento: 15,
      stock: 10,
      categoria: 'ETB',
      imagen: '/images/test1.jpg'
    },
    {
      id: 2,
      nombre: 'Sobre pitch black',
      descripcion: 'Sobre de la expansion',
      precio: 8000,
      stock: 0,
      categoria: 'Sobre',
      imagen: ''
    }
  ];

  it('muestra un mensaje de advertencia cuando la lista de productos está vacía', () => {
    render(<Catalogo productos={[]} onAgregar={() => {}} />);

    const alerta = screen.getByText(/No se encontraron productos con esos filtros/i);
    expect(alerta).toBeInTheDocument();
  });

  it('renderiza la lista de productos correctamente', () => {
    render(<Catalogo productos={productosMock} onAgregar={() => {}} />);

    // Verifica que los nombres de los productos aparezcan en el documento
    expect(screen.getByText('ETB ACENDED HEROES')).toBeInTheDocument();
    expect(screen.getByText('Sobre pitch black')).toBeInTheDocument();
  });

  it('llama a la función onAgregar cuando se hace clic en el botón de agregar de una tarjeta', async () => {
    const handleAgregar = vi.fn();
    const user = userEvent.setup();

    render(<Catalogo productos={productosMock} onAgregar={handleAgregar} />);

    // Buscamos el botón de agregar del producto con stock disponible (ETB ACENDED HEROES)
    const botonesAgregar = screen.getAllByRole('button', { name: /Agregar al carrito/i });
    
    // El primer botón corresponde al producto con stock (id: 1)
    await user.click(botonesAgregar[0]);

    // Verificamos que la función se llamó con el producto correcto aplicando su precio final con descuento
    expect(handleAgregar).toHaveBeenCalledTimes(1);
    expect(handleAgregar).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        nombre: 'ETB ACENDED HEROES',
        precio: 68000 // 80000 - 15% de descuento
      })
    );
  });
});