import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminPanel from '../pages/Admin';

const producto = {
  id: 1,
  nombre: 'Sobre de prueba',
  descripcion: 'Descripción del producto',
  precio: 5000,
  descuento: 10,
  stock: 4,
  categoria: 'Sobres',
  imagen: '/sobre.jpg',
};

function renderAdmin(overrides = {}) {
  const props = {
    productos: [producto],
    onAgregarProducto: vi.fn(),
    onActualizarProducto: vi.fn(),
    onEliminarProducto: vi.fn(),
    onReordenarProductos: vi.fn(),
    ...overrides,
  };

  return { ...render(<AdminPanel {...props} />), props };
}

describe('Panel de administración', () => {
  it('agrega productos con sus datos al enviar el formulario', async () => {
    const user = userEvent.setup();
    const { props } = renderAdmin({ productos: [] });

    await user.type(screen.getByLabelText('Nombre'), 'Caja nueva');
    await user.type(screen.getByLabelText('Descripción'), 'Descripción nueva');
    await user.type(screen.getByLabelText('Precio (CLP)'), '12000');
    await user.type(screen.getByLabelText('Descuento (%)'), '5');
    await user.type(screen.getByLabelText('Stock'), '3');
    await user.type(screen.getByLabelText('Categoría'), 'Cajas');
    await user.type(screen.getByLabelText('URL de imagen'), '/caja.jpg');
    await user.click(screen.getByRole('button', { name: 'Agregar producto' }));

    expect(props.onAgregarProducto).toHaveBeenCalledWith({
      nombre: 'Caja nueva',
      descripcion: 'Descripción nueva',
      precio: 12000,
      descuento: 5,
      stock: 3,
      categoria: 'Cajas',
      imagen: '/caja.jpg',
    });
  });

  it('edita el producto seleccionado', async () => {
    const user = userEvent.setup();
    const { props } = renderAdmin();

    await user.click(screen.getByRole('button', { name: 'Editar Sobre de prueba' }));
    const nombre = screen.getByLabelText('Nombre');
    await user.clear(nombre);
    await user.type(nombre, 'Sobre actualizado');
    await user.click(screen.getByRole('button', { name: 'Guardar cambios' }));

    expect(props.onActualizarProducto).toHaveBeenCalledWith({
      ...producto,
      nombre: 'Sobre actualizado',
    });
  });

  it('elimina el producto seleccionado', async () => {
    const user = userEvent.setup();
    const { props } = renderAdmin();

    await user.click(screen.getByRole('button', { name: 'Eliminar Sobre de prueba' }));

    expect(props.onEliminarProducto).toHaveBeenCalledWith(producto.id);
  });

  it('reordena productos al arrastrar una fila sobre otra', () => {
    const segundoProducto = { ...producto, id: 2, nombre: 'Otro sobre' };
    const { props } = renderAdmin({ productos: [producto, segundoProducto] });
    const filaOrigen = screen.getByRole('row', {
      name: /Producto reordenable: Sobre de prueba/,
    });
    const filaDestino = screen.getByRole('row', {
      name: /Producto reordenable: Otro sobre/,
    });

    fireEvent.dragStart(filaOrigen);
    fireEvent.dragOver(filaDestino);
    fireEvent.drop(filaDestino);

    expect(props.onReordenarProductos).toHaveBeenCalledWith([
      segundoProducto,
      producto,
    ]);
  });
});
