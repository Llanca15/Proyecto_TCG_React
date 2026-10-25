import React, { useState, useEffect } from 'react';

export default function Inicio() {
  const [usuarioActivo, setUsuarioActivo] = useState('');

  useEffect(() => {
    // Lee la sesión almacenada en localStorage al cargar el componente
    const usuarioGuardado = localStorage.getItem('usuario_activo');
    if (usuarioGuardado) {
      setUsuarioActivo(usuarioGuardado);
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario_activo');
    setUsuarioActivo(''); // Actualiza el estado para reflejar el cambio en pantalla de inmediato
  };

  return (
    <>
      <header>
        <img
          src="/image/Pokémon_Trading_Card_Game_logo_logo.svg.webp"
          width="400"
          height="200"
          alt="Logo de pokemon"
          style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
        />
        <nav className="menu">
          <a href="pokemon_tcg.html"> INICIO </a>
          <a href="./"> PRODUCTOS </a>
          <a href="contacto_tcg.html"> CONTACTO </a>

          {/* Renderizado condicional según el estado de la sesión */}
          {usuarioActivo ? (
            <span id="user-info" style={{ color: 'white', marginLeft: '15px' }}>
              👤 <strong>{usuarioActivo}</strong>
              <button
                onClick={cerrarSesion}
                className="btn btn-sm btn-outline-light ms-2"
                style={{ fontSize: '12px', padding: '2px 6px' }}
              >
                Salir
              </button>
            </span>
          ) : (
            <a href="Login_tcg.html"> INICIAR SESIÓN </a>
          )}
        </nav>
      </header>

      <main>
        <section id="aboutUs">
          <h2>Quienes Somos ?</h2>
          <p>
            POKEMON TCG es una tienda especializada nacida por y para la comunidad de entrenadores que disfrutan del
            juego físico.
            Nos dedicamos a ofrecer los últimos lanzamientos de cartas, desde sobres individuales y cajas de sobres
            (Booster Boxes)
            hasta colecciones especiales, fundas protectoras y carpetas de alta calidad para mantener tus joyas a
            salvo. Además de
          </p>
        </section>
      </main>

      <footer className="text-white text-center py-4 mt-5 bg-dark">
        <div className="container">
          <h5>Pobres TCG Store</h5>
          <p>Tu tienda de cartas coleccionables favorita.</p>
          <hr className="border-light" />
          <p className="mb-0">&copy; 2026 Pobres TCG Store. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}