import { NavLink } from "react-router-dom";

function Header() {
  const nombreRestaurante = "RestauranteGo";

  return (
    <header className="header">
      <div className="logo">{nombreRestaurante}</div>

      <nav className="nav">
        <NavLink to="/" end>
          Inicio
        </NavLink>

        <NavLink to="/catalogo">
          Catálogo
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;