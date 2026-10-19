import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Header() {
  const nombreRestaurante = "RestauranteGo";
  const { cantidadTotal } = useContext(CartContext);

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

        <NavLink to="/carrito" className="cart-badge">
          🛒 Carrito ({cantidadTotal})
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;