import React, { useState, useEffect } from 'react';
import { Link } from 'react-router'; // 1. Importar Link

export default function Encabezado() {
  const [usuarioActivo, setUsuarioActivo] = useState('');

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario_activo');
    if (usuarioGuardado) {
      setUsuarioActivo(usuarioGuardado);
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario_activo');
    setUsuarioActivo('');
  };

  return (
    <header>
      <img
        src="/image/Pokémon_Trading_Card_Game_logo_logo.svg.webp"
        width="400"
        height="200"
        alt="Logo de pokemon"
        style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
      />
      <nav className="menu">
        {/* 2. Reemplazar <a> por <Link to="..."> */}
        <Link to="/">INICIO</Link>
        <Link to="/productos">PRODUCTOS</Link>
        <Link to="/contacto">CONTACTO</Link>

        {usuarioActivo ? (
          <div id="user-info" style={{ display: 'inline-block', color: 'white', marginLeft: '15px' }}>
            <span>👤 <strong>{usuarioActivo}</strong></span>
            <button
              onClick={cerrarSesion}
              className="btn btn-sm btn-outline-light ms-2"
              style={{ fontSize: '12px', padding: '2px 6px' }}
            >
              Salir
            </button>
          </div>
        ) : (
          <Link to="/login">INICIAR SESIÓN</Link>
        )}
      </nav>
    </header>
  );
}