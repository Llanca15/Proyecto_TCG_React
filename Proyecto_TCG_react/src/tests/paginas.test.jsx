import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import Encabezado from '../components/Encabezado.jsx';
import PiePagina from '../components/PiePagina.jsx';
import Portada from '../components/Portada.jsx';
import Contacto from '../pages/Contacto.jsx';
import Inicio from '../pages/Inicio.jsx';
import LigaPokemon from '../pages/Liga_pokemon.jsx';
import Login from '../pages/Login.jsx';
import ProtectedRoute from '../pages/RutaAdmin.jsx';
import Productos from '../pages/Productos.jsx';
import { formatearPrecio } from '../utils/Formato.jsx';
import productos from '../data/productos.js';

beforeEach(() => localStorage.clear());

describe('páginas y componentes de navegación', () => {
  it('renderiza portada, pie de página y página de inicio', () => {
    const { rerender } = render(<Portada />);
    expect(screen.getByRole('heading', { name: 'Quienes Somos ?' })).toBeInTheDocument();

    rerender(<PiePagina />);
    expect(screen.getByText('Pobres TCG Store')).toBeInTheDocument();

    rerender(<Inicio />);
    expect(screen.getByRole('heading', { name: 'Bienvenido a Pokémon TCG' })).toBeInTheDocument();
  });

  it('muestra la página de contacto con sus opciones y enlace a la liga', () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('Asunto')).toHaveValue('pedido');
    expect(screen.getByRole('link', { name: 'LIGA' })).toHaveAttribute(
      'href',
      '/liga-pokemon'
    );
  });

  it('muestra los oponentes de la liga', () => {
    const { container } = render(
      <MemoryRouter>
        <LigaPokemon />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Liga Pokémon' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Ogerpon Planta EX' })).toBeInTheDocument();
    fireEvent.submit(container.querySelector('.liga-info'));
  });

  it('permite acceso protegido solo cuando está autenticado', () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={['/privado']}>
        <Routes>
          <Route
            path="/privado"
            element={<ProtectedRoute isAuthenticated={false}>Privado</ProtectedRoute>}
          />
          <Route path="/login" element={<p>Iniciar sesión requerido</p>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Iniciar sesión requerido')).toBeInTheDocument();
    rerender(
      <MemoryRouter>
        <ProtectedRoute isAuthenticated>Contenido privado</ProtectedRoute>
      </MemoryRouter>
    );
    expect(screen.getByText('Contenido privado')).toBeInTheDocument();
  });

  it('filtra el catálogo por texto y categoría', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Productos productos={productos} onAgregar={vi.fn()} />
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText(/Buscar coleccion/), 'pitch black');
    expect(screen.getByText('ETB PITCH BLACK')).toBeInTheDocument();
    expect(screen.queryByText('ETB ACENDED HEROES')).not.toBeInTheDocument();
  });
});

describe('navegación y autenticación', () => {
  it('muestra la ruta accesible del logo y el carrito', () => {
    render(
      <MemoryRouter>
        <Encabezado cantidad={2} onVerCarrito={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: 'Logo de Pokémon' })).toHaveAttribute(
      'src',
      '/images/logos/Pok%C3%A9mon_Trading_Card_Game_logo_logo.svg.webp'
    );
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('muestra al usuario autenticado y limpia la sesión al salir del panel', async () => {
    const user = userEvent.setup();
    const onCerrarSesion = vi.fn();
    localStorage.setItem('usuario_activo', 'Entrenador');
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Encabezado
          isAuthenticated
          onCerrarSesion={onCerrarSesion}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Entrenador')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'SALIR DEL PANEL' })).toHaveAttribute(
      'href',
      '/'
    );
    await user.click(screen.getByRole('button', { name: 'Salir' }));
    expect(localStorage.getItem('usuario_activo')).toBeNull();
    expect(onCerrarSesion).toHaveBeenCalledOnce();
  });

  it('registra una sesión de usuario y permite cerrar sesión', async () => {
    const user = userEvent.setup();
    const setIsAuthenticated = vi.fn();
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/" element={<p>Inicio</p>} />
        </Routes>
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText('Nombre Completo'), 'Nora');
    await user.type(screen.getByLabelText('Correo Electrónico'), 'nora@example.com');
    await user.type(screen.getByLabelText('Contraseña'), 'clave');
    await user.type(screen.getByLabelText('Confirmar Contraseña'), 'clave');
    await user.click(screen.getByRole('button', { name: 'Confirmar' }));

    expect(await screen.findByText('Inicio')).toBeInTheDocument();
    expect(localStorage.getItem('usuario_activo')).toBe('Nora');
    expect(setIsAuthenticated).toHaveBeenCalledWith(false);
  });

  it('rechaza claves diferentes y autentica al administrador', async () => {
    const user = userEvent.setup();
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const setIsAuthenticated = vi.fn();
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/admin" element={<p>Panel de administración</p>} />
        </Routes>
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText('Nombre Completo'), 'Admin');
    await user.type(screen.getByLabelText('Correo Electrónico'), 'admin@tcg.cl');
    await user.type(screen.getByLabelText('Contraseña'), 'incorrecta');
    await user.type(screen.getByLabelText('Confirmar Contraseña'), 'distinta');
    await user.click(screen.getByRole('button', { name: 'Confirmar' }));
    expect(alert).toHaveBeenCalledWith('Las contraseñas no coinciden');

    await user.clear(screen.getByLabelText('Confirmar Contraseña'));
    await user.clear(screen.getByLabelText('Contraseña'));
    await user.type(screen.getByLabelText('Contraseña'), 'tcgchampion');
    await user.type(screen.getByLabelText('Confirmar Contraseña'), 'tcgchampion');
    await user.click(screen.getByRole('button', { name: 'Confirmar' }));

    expect(await screen.findByText('Panel de administración')).toBeInTheDocument();
    expect(setIsAuthenticated).toHaveBeenCalledWith(true);
    alert.mockRestore();
  });

  it('formatea precios en moneda chilena', () => {
    expect(formatearPrecio(24990)).toMatch(/24\.990/);
  });
});
