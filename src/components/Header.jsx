import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Header() {
  const nombreRestaurante = "RestauranteGo";
  const { cantidadTotal } = useContext(CartContext);
  const { usuario, logout } = useAuth();

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
          🛒 {cantidadTotal}
        </NavLink>

        {usuario ? (
          <>
            <NavLink to="/dashboard">
              Dashboard
            </NavLink>
            <button 
              onClick={logout} 
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                fontSize: "1rem"
              }}
            >
              Salir
            </button>
          </>
        ) : (
          <NavLink to="/login">
            Iniciar Sesión
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;