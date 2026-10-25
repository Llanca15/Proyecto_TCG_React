import React from 'react';
import Encabezado from './components/Encabezado';
import Portada from './components/Portada';
import PiePagina from './components/PiePagina';

export default function Inicio() {
  return (
    <>
      {/* Encabezado */}
      <Encabezado />

      {/* Contenido principal con la Portada */}
      <main>
        <Portada />
      </main>

      {/* Pie de página */}
      <PiePagina />
    </>
  );
}