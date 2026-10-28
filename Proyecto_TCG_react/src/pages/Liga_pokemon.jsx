import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function LigaPokemon() {
  const navigate = useNavigate();
  const [usuarioActivo, setUsuarioActivo] = useState(
    () => localStorage.getItem('usuario_activo')
  );

  useEffect(() => {
    setUsuarioActivo(localStorage.getItem('usuario_activo'));
  }, []);

  function cerrarSesion() {
    localStorage.removeItem('usuario_activo');
    setUsuarioActivo(null);
    window.location.reload();
  }

  return (
    <main className="liga-pokemon">
      <form
        className="bg-white p-4 rounded shadow-sm mx-auto border border-danger liga-info"
        onSubmit={(e) => e.preventDefault()}
      >
        <section id="aboutUs">
          <h2 className="titulo-liga">
            <img
              src="/images/logos/Logo_Liga_pokemon.webp"
              alt="Logo de la Liga Pokémon"
            />
            Liga Pokémon
            <img
              src="/images/logos/Logo_Liga_pokemon.webp"
              alt="Logo de la Liga Pokémon"
            />
          </h2>

          <p>
            Has llegado a un desafío reservado para los entrenadores más
            preparados. Aquí tendrás la oportunidad de enfrentarte a los
            3 Administradores de la Liga Pokémon y demostrar que tienes
            lo necesario para convertirte en el campeón.
          </p>

          <p>
            A medida que avances y consigas victorias, recibirás premios
            por cada combate ganado. Sin embargo, cuidado: una sola
            derrota significará el fin de tu desafío en la Liga.
          </p>

          <p>
            Si desea participar debe dirigirse a la sección de consulta
            y en asunto debe poner "Quiero participar en la liga pokemon"
            y darle al botón de ser contactado por correo.
          </p>

          <h3>Premios</h3>
          <p>1° victoria - 5% descuento en la próxima compra</p>
          <p>2° victoria - 2 sobres de alguna colección aleatoria</p>
          <p>3° victoria - 25% descuento en la próxima compra</p>

          <h3>Reglas de la Liga</h3>
          <ul>
            <li>Deberás enfrentarte a cada uno de los 3 Administradores.</li>
            <li>Deberás utilizar el mismo mazo durante toda la Liga.</li>
            <li>
              No está permitido cambiar, modificar ni reemplazar tu mazo
              entre combates.
            </li>
            <li>
              Cada enfrentamiento será decisivo: si pierdes un solo
              combate, quedas eliminado de la Liga.
            </li>
            <li>
              Una vez eliminado, no podrás volver a participar en la
              Liga Pokémon.
            </li>
          </ul>

          <h3>Oponentes a derrotar</h3>
        </section>
      </form>

      <section id="admins" className="admins-liga">
        <article>
          <img
            src="/images/liga_pokemon/Ogerpon_planta.png"
            alt="Ogerpon Planta EX"
          />
          <h3>Ogerpon Planta EX</h3>
          <p className="descripcion-admin">
            Un mazo centrado en <strong>Teal Mask Ogerpon EX</strong>,
            y Pokémon de tipo Planta. Su estrategia busca aprovechar
            las Energías Planta para preparar rápidamente sus ataques
            y mantener una presión constante sobre el rival.
          </p>
          <h4>Administrador</h4>
          <p><strong>Pablo Navarro</strong></p>
        </article>

        <article>
          <img
            src="/images/liga_pokemon/mega darkrai.png"
            alt="Mega-Darkrai EX"
          />
          <h3>Mega-Darkrai EX</h3>
          <p className="descripcion-admin">
            El mazo de <strong>Mega-Darkrai EX</strong> es una estrategia
            de control letal diseñada para la ejecución instantánea.
            Su juego consiste en atrapar y envenenar o confundir al
            Pokémon rival para borrarlo del campo de un solo golpe,
            ignorando por completo sus puntos de vida.
          </p>
          <h4>Administrador</h4>
          <p><strong>Llancamil Flores</strong></p>
        </article>

        <article>
          <img
            src="/images/liga_pokemon/carta_random.jpg"
            alt="Carta misteriosa"
          />
          <h3>??</h3>
          <p className="descripcion-admin">
            Su estrategia es difícil de predecir y puede combinar
            diferentes Pokémon, tipos y cartas de Entrenador.
            No sabrás exactamente qué estrategia te espera{' '}
            <strong>hasta que comience el combate</strong>.
          </p>
          <h4>Administrador</h4>
          <p>
            <strong>
              <img
                className="imagen-aron"
                src="/images/liga_pokemon/Aron.png"
                alt="Aron"
              />
              Tapia
            </strong>
          </p>
        </article>
      </section>
    </main>
  );
}
