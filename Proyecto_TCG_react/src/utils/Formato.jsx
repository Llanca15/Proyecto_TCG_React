// Convierte 24990 en "$24.990" usando el formato chileno.
export function formatearPrecio(valor) {
  return valor.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
  })
}