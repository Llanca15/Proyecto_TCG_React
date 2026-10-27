
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

export default function Encabezado({ cantidad = 0, onVerCarrito }) {
  const [usuarioActivo, setUsuarioActivo] = useState('');

  useEffect(() => {
    const verificarUsuario = () => {
      const usuarioGuardado = localStorage.getItem('usuario_activo');
      setUsuarioActivo(usuarioGuardado || '');
    };

    verificarUsuario();
    window.addEventListener('storage', verificarUsuario);
    return () => window.removeEventListener('storage', verificarUsuario);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario_activo');
    setUsuarioActivo('');
  };

  return (
    <header className="p-0">
      <Navbar expand="md" className="p-3">
        <Container className="header-container">
          {/* Logo a la izquierda */}
          
        <Navbar.Brand as={Link} to="/" className="m-0 p-0">
          <img
            src="/images/logos/Pokémon_Trading_Card_Game_logo_logo.svg.webp"
            alt="Logo de Pokémon"
            className="logo-header"
          />
        </Navbar.Brand>


          <Navbar.Toggle
            aria-controls="menu-principal"
            className="bg-light my-2"
          />

          <Navbar.Collapse id="menu-principal">
            {/* Menú central */}
            <Nav className="menu align-items-center">
              <Nav.Link as={Link} to="/">INICIO</Nav.Link>
              <Nav.Link as={Link} to="/productos">PRODUCTOS</Nav.Link>
              <Nav.Link as={Link} to="/contacto">CONTACTO</Nav.Link>

              {usuarioActivo ? (
                <div className="user-info">
                  <span>👤 <strong>{usuarioActivo}</strong></span>
                  <button
                    onClick={cerrarSesion}
                    className="btn btn-sm btn-outline-light"
                    style={{
                      fontSize: '12px',
                      padding: '2px 8px',
                      borderRadius: '15px',
                    }}
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <Nav.Link as={Link} to="/login">
                  INICIAR SESIÓN
                </Nav.Link>
              )}
            </Nav>

            {/* Carrito a la derecha */}
            {onVerCarrito && (
              <Button
                variant="outline-light"
                onClick={onVerCarrito}
                className="cart-button rounded-pill px-3 py-2"
              >
                🛒 Carrito
                <span className="badge bg-warning text-dark ms-2">
                  {cantidad}
                </span>
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
