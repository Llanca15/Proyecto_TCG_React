export const productos = [
  {
    id: 1,
    nombre: 'Audífonos inalámbricos',
    categoria: 'Tecnología',
    precio: 24990,
    stock: 12,
    icono: '🎧',
  },
  {
    id: 2,
    nombre: 'Mochila urbana',
    categoria: 'Accesorios',
    precio: 19990,
    stock: 8,
    icono: '🎒',
  },
  {
    id: 3,
    nombre: 'Botella térmica 750 ml',
    categoria: 'Hogar',
    precio: 9990,
    stock: 25,
    icono: '🧴',
  },
  {
    id: 4,
    nombre: 'Teclado mecánico',
    categoria: 'Tecnología',
    precio: 39990,
    stock: 0,
    icono: '⌨️',
  },
  {
    id: 5,
    nombre: 'Lámpara LED de escritorio',
    categoria: 'Hogar',
    precio: 14990,
    stock: 5,
    icono: '💡',
  },
  {
    id: 6,
    nombre: 'Polerón canguro',
    categoria: 'Vestuario',
    precio: 21990,
    stock: 10,
    icono: '🧥',
  },
  {
    id: 7,
    nombre: 'Zapatilla Nike',
    categoria: 'Vestuario',
    precio: 45990,
    stock: 30,
    icono: '👟'
  },
]

export function formatearPrecio(valor) {
  return valor.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
  })
}

