const productos = [
  {
    id: 1,
    nombre: 'ETB ACENDED HEROES',
    descripcion: 'Etb de la expansion acended heroes protagonizada por MEGA DRAGONITE EX',
    precio: 80000,
    descuento: 15,
    stock: 10,
    categoria: 'ETB', // <-- Añadido
    imagen: '/images/productos_etb/etb_acended_heroes.jpg'
  },
  {
    id: 2,
    nombre: 'ETB CHAOS RISING',
    descripcion: 'Etb de la expansion chaos rising protagonizada por GRENINJA EX',
    precio: 75000,
    stock: 10,
    categoria: 'ETB', // <-- Añadido
    imagen: '/images/productos_etb/etb_chaos_rising.jpg'
  },
  {
    id: 3,
    nombre: 'ETB PERFECT ORDER',
    descripcion: 'Etb de la expansion chaos rising protagonizada por MEGA ZYGARDE EX',
    precio: 90000,
    descuento: 20,
    stock: 10,
    categoria: 'ETB', // <-- Añadido
    imagen: '/images/productos_etb/etb_perfect_order.jpg'
  },
  {
    id: 4,
    nombre: 'ETB DELTA REIGN',
    descripcion: 'Etb de la expansion delta reing protagonizada por MEGA RAYQUAZA EX',
    precio: 95000,
    stock: 10,
    categoria: 'ETB', // <-- Añadido
    imagen: '/images/productos_etb/etb_delta_reign.png'
  },
  {
    id: 5,
    nombre: 'ETB PHANTHASMAL FLAMES',
    descripcion: 'Etb de la expansion phanthasmal flames protagonizada por MEGA CHARIZARD X EX',
    precio: 75000,
    descuento: 35,
    stock: 10,
    categoria: 'ETB', // <-- Añadido
    imagen: '/images/productos_etb/etb_phanthasmal_flames.webp'
  },
  {
    id: 6,
    nombre: 'ETB PITCH BLACK',
    descripcion: 'Etb de la expansion pitch black protagonizada por MEGA DARKRAI EX',
    precio: 80000,
    stock: 10,
    categoria: 'ETB', // <-- Añadido
    imagen: '/images/productos_etb/etb_pitch_black.webp'
  },
  {
    id: 7,
    nombre: 'Sobre pitch black',
    descripcion: 'Sobre de la expansion pitch black',
    precio: 8000, // Ajustado de 8 a 8000 por formato CLP
    stock: 10,
    categoria: 'Sobre', // <-- Añadido
    imagen: ''
  },
];

export default productos;

export function formatearPrecio(valor) {
  return valor.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });
}