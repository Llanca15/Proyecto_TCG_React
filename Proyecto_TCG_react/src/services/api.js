import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export function mensajeErrorApi(error, mensajePredeterminado) {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) return error.response.data.message;
    if (!error.response) {
      return 'No se pudo conectar con el backend. Comprueba que esté iniciado.';
    }
  }
  return mensajePredeterminado;
}

export async function listarProductos() {
  const { data } = await api.get('/productos');
  return data;
}

export async function crearProducto(producto) {
  const { data } = await api.post('/productos', producto);
  return data;
}

export async function actualizarProducto(producto) {
  const { id, ...datos } = producto;
  const { data } = await api.put(`/productos/${id}`, datos);
  return data;
}

export async function eliminarProducto(id) {
  await api.delete(`/productos/${id}`);
}

export async function reordenarProductos(productos) {
  const { data } = await api.put(
    '/productos/orden',
    productos.map((producto) => producto.id)
  );
  return data;
}

export async function crearPedido(pedido) {
  const { data } = await api.post('/pedidos', pedido);
  return data;
}
