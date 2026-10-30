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
    nombre: 'Destined Rivals Battle box Español',
    descripcion: '1 mazo de 40 cartas listo para jugar (incluye 1 de 4 cartas promocionales holográficas exclusivas)',
    precio: 24990, 
    descuento: 20,
    stock: 15,
    categoria: 'Battle box',
    imagen: './images/productos_varios/Caja_de_Combina_y_Combate_de_Rivales_Predestinados.webp'
  },
  {
    id: 8,
    nombre: '30th Celebration Booster Pack Inglés',
    descripcion: 'Contiene 10 cartas de la colección 30th Celebration, incluyendo 1 carta holográfica y 1 carta de energía holográfica',
    precio: 9990, 
    stock: 17,
    categoria: 'Booster Pack',
    imagen: './images/productos_varios/Pokemon_TCG_30th_Celebration_Booster_Wrap.webp'
  },
  {
    id: 9,
    nombre: '30th Celebration ETB Inglés',
    descripcion: 'Contiene 8 sobres de la colección 30th Celebration, 65 fundas de cartas, 45 contadores de daño, 1 dado de condición especial, 1 guía de estrategia y más',
    precio: 139990, 
    stock: 0,
    categoria: 'ETB',
    imagen: './images/productos_varios/Pokemon_TCG_30th_Celebration_Elite_Trainer_Box_EN.webp'
  },
  {
    id: 10,
    nombre: 'Chaos Rising Booster Pack Inglés',
    descripcion: 'Contiene 10 cartas de la colección Chaos Rising, incluyendo 1 carta holográfica y 1 carta de energía holográfica',
    precio: 7990, 
    descuento: 25,
    stock: 11,
    categoria: 'Booster Pack',
    imagen: './images/productos_varios/Pokemon_TCG_Mega_Evolution_Chaos_Rising_Booster_Wrap_Mega_Greninja_8da03de9-3cce-4d95-bfdd-628c4fbb2a3f.webp'
  },
  {
    id: 11,
    nombre: 'Ascended Heroes Booster Pack Español',
    descripcion: 'Contiene 10 cartas de la colección Ascended Heroes, incluyendo 1 carta holográfica y 1 carta de energía holográfica',
    precio: 7990, 
    descuento: 13,
    stock: 67,
    categoria: 'Booster Pack',
    imagen: './images/productos_varios/Pokemon_TCG_Mega_Evolution_Ascended_Heroes_Booster_Wrap_ES-LA.webp'
  },

];

export default productos;

export function formatearPrecio(valor) {
  return valor.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });
}