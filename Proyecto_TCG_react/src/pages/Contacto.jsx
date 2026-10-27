import { Link } from 'react-router';

export default function Contacto() {
  return (
    <main className="pagina-contacto">
      <form
        className="formulario-contacto bg-white p-4 rounded shadow-sm mx-auto border border-danger"
        action="https://formspree.io/f/mbgjajyp"
        method="POST"
      >
        <h2 className="text-center mb-4">Contáctanos</h2>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre Completo
            </label>
            <input
              className="form-control"
              type="text"
              id="nombre"
              name="nombre"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="correo" className="form-label">
              Correo Electrónico
            </label>
            <input
              className="form-control"
              type="email"
              id="correo"
              name="correo"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="asunto" className="form-label">
            Asunto
          </label>
          <select
            className="form-select"
            id="asunto"
            name="asunto"
            defaultValue="pedido"
          >
            <option value="pedido">Estado de mi pedido</option>
            <option value="Stock o Disponibilidad">
              Disponibilidad de producto / Pre-órdenes
            </option>
            <option value="Problema con el pago">
              Problemas con el pago o facturación
            </option>
            <option value="Información de la Liga Pokémon">
              Información sobre la Liga Pokémon
            </option>
            <option value="Soporte o Reclamos">
              Soporte técnico / Reclamo de producto
            </option>
            <option value="Otra consulta">Otra consulta general</option>
            <option value="Liga pokemon">
              Quiero participar en la Liga Pokémon
            </option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="mensaje" className="form-label">
            Mensaje
          </label>
          <textarea
            className="form-control"
            id="mensaje"
            name="mensaje"
            rows="5"
            required
          />
        </div>

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="terminos"
            name="acepta_contacto"
            value="Sí"
            required
          />
          <label className="form-check-label" htmlFor="terminos">
            Acepto ser contactado por correo
          </label>
        </div>

        <div className="d-flex justify-content-end mx-3">
          <button className="btn btn-danger btn-lg" type="submit">
            Enviar
          </button>
        </div>

        <nav className="enlace-liga">
          <Link to="/liga-pokemon">
            Ir a la Liga Pokémon
          </Link>
        </nav>
      </form>
    </main>
  );
}
