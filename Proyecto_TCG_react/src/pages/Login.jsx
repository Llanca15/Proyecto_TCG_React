import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Login({ setIsAuthenticated }) { 
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, correo, contrasena, confirmarContrasena } = formData;

    if (contrasena !== confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const usuarioActivo = nombre || correo;
    localStorage.setItem('usuario_activo', usuarioActivo);

    if (correo === 'admin@tcg.cl' && contrasena === 'tcgchampion') {
      localStorage.setItem('usuario_rol', 'admin');
      if (setIsAuthenticated) {
        setIsAuthenticated(true);
      }
      navigate('/admin');
    } else {
      localStorage.removeItem('usuario_rol');
      if (setIsAuthenticated) {
        setIsAuthenticated(false);
      }
      navigate('/');
    }

    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="container my-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-sm mx-auto border border-danger"
        style={{ maxWidth: '700px' }}
      >
        <h2 className="mb-4 text-center text-danger">Iniciar Sesión</h2>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nombre" className="form-label">Nombre Completo</label>
            <input
              className="form-control"
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="correo" className="form-label">Correo Electrónico</label>
            <input
              className="form-control"
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="contrasena" className="form-label">Contraseña</label>
            <input
              className="form-control"
              type="password"
              id="contrasena"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="confirmarContrasena" className="form-label">Confirmar Contraseña</label>
            <input
              className="form-control"
              type="password"
              id="confirmarContrasena"
              name="confirmarContrasena"
              value={formData.confirmarContrasena}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-end col-12 mx-3">
            <button className="btn btn-danger btn-lg" type="submit">
              Confirmar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}