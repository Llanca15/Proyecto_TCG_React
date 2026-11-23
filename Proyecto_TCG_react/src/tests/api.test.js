import { beforeEach, describe, expect, it, vi } from 'vitest';

const axiosMocks = vi.hoisted(() => ({
  client: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
  create: vi.fn(),
  config: null,
  isAxiosError: vi.fn(),
}));

vi.mock('axios', () => ({
  default: {
    create: (...args) => {
      axiosMocks.create(...args);
      axiosMocks.config = args[0];
      return axiosMocks.client;
    },
    isAxiosError: (error) => axiosMocks.isAxiosError(error),
  },
}));

import {
  actualizarProducto,
  crearPedido,
  crearProducto,
  eliminarProducto,
  listarProductos,
  mensajeErrorApi,
  reordenarProductos,
} from '../services/api.js';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('servicio Axios', () => {
  it('configura la API y consulta productos', async () => {
    const respuesta = [{ id: 1, nombre: 'ETB' }];
    axiosMocks.client.get.mockResolvedValue({ data: respuesta });

    await expect(listarProductos()).resolves.toEqual(respuesta);
    expect(axiosMocks.config).toEqual(
      expect.objectContaining({
        baseURL: expect.stringMatching(/\/api$/),
        timeout: 10000,
      })
    );
    expect(axiosMocks.client.get).toHaveBeenCalledWith('/productos');
  });

  it('crea y actualiza productos sin enviar el id dentro del cuerpo', async () => {
    const producto = { id: 7, nombre: 'ETB' };
    axiosMocks.client.post.mockResolvedValue({ data: producto });
    axiosMocks.client.put.mockResolvedValue({ data: producto });

    await crearProducto({ nombre: 'ETB' });
    await actualizarProducto(producto);

    expect(axiosMocks.client.post).toHaveBeenCalledWith('/productos', {
      nombre: 'ETB',
    });
    expect(axiosMocks.client.put).toHaveBeenCalledWith('/productos/7', {
      nombre: 'ETB',
    });
  });

  it('elimina productos, persiste el orden y crea pedidos', async () => {
    axiosMocks.client.put.mockResolvedValue({ data: [] });
    axiosMocks.client.post.mockResolvedValue({ data: { id: 4 } });

    await eliminarProducto(3);
    await reordenarProductos([{ id: 5 }, { id: 2 }]);
    await crearPedido({ nombre: 'Ada', lineas: [] });

    expect(axiosMocks.client.delete).toHaveBeenCalledWith('/productos/3');
    expect(axiosMocks.client.put).toHaveBeenCalledWith('/productos/orden', [5, 2]);
    expect(axiosMocks.client.post).toHaveBeenCalledWith('/pedidos', {
      nombre: 'Ada',
      lineas: [],
    });
  });

  it('presenta errores HTTP, desconexiones y un mensaje alternativo', () => {
    axiosMocks.isAxiosError.mockReturnValue(true);
    expect(mensajeErrorApi(
      { response: { data: { message: 'Stock insuficiente' } } },
      'Error'
    )).toBe('Stock insuficiente');
    expect(mensajeErrorApi({}, 'Error')).toMatch(/No se pudo conectar/);

    axiosMocks.isAxiosError.mockReturnValue(false);
    expect(mensajeErrorApi(new Error('interno'), 'Error alternativo'))
      .toBe('Error alternativo');
  });
});
