import { NavLink } from "react-router-dom";
import logo from "../assets/image-removebg-preview (6).png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <img
          src={logo}
          alt="Sport Hub"
          className="navbar__logo"
        />

        <span className="navbar__name">
          SPORT HUB
        </span>
      </div>

      <div className="navbar__links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "navbar__link active" : "navbar__link"
          }
        >
          Inicio
        </NavLink>

        <NavLink
          to="/equipos"
          className={({ isActive }) =>
            isActive ? "navbar__link active" : "navbar__link"
          }
        >
          Equipos
        </NavLink>

        <NavLink
          to="/partidos"
          className={({ isActive }) =>
            isActive ? "navbar__link active" : "navbar__link"
          }
        >
          Partidos
        </NavLink>

        <NavLink
          to="/favoritos"
          className={({ isActive }) =>
            isActive ? "navbar__link active" : "navbar__link"
          }
        >
          Favoritos
        </NavLink>
      </div>

      <button
        type="button"
        className="navbar__menu"
        aria-label="Abrir menú"
      >
        ☰
      </button>
    </nav>
  );
}
