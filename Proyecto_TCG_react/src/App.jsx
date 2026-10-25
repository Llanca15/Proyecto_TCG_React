import Encabezado from './components/Encabezado';
import Portada from './components/Portada';
import PiePagina from './components/PiePagina';
import Productos from './pages/Productos';

import { Routes, Route } from 'react-router';

export default function App() {
  return (
    <>
      <Encabezado />

      <main>
        <Routes>
          <Route path="/" element={<Portada />} />
          <Route path="/productos" element={<Productos />} />
        </Routes>
      </main>

      <PiePagina />
    </>
  );
}