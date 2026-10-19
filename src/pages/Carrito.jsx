
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Carrito() {
  const {
    carrito,
    cambiarCantidad,
    eliminarDelCarrito,
    totalPrecio,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const formatoCOP = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(valor);

  return (
    <main className="carrito-page">
      <h1>Mi carrito</h1>

      {carrito.length === 0 ? (
        <section className="carrito-vacio">
          <p>Tu carrito está vacío.</p>
          <button onClick={() => navigate("/catalogo")}>
            Ir al catálogo
          </button>
        </section>
      ) : (
        <>
          <section className="carrito-lista">
            {carrito.map((item) => (
              <article className="carrito-item" key={item.id}>
                <div className="carrito-info">
                  <h2>{item.nombre}</h2>
                  <p>Precio: {formatoCOP(item.precio)}</p>
                  <p>
                    Subtotal:{" "}
                    {formatoCOP(item.precio * item.cantidad)}
                  </p>
                </div>

                <div className="carrito-cantidad">
                  <button
                    onClick={() =>
                      cambiarCantidad(item.id, item.cantidad - 1)
                    }
                    disabled={item.cantidad <= 1}
                    aria-label={`Disminuir cantidad de ${item.nombre}`}
                  >
                    −
                  </button>

                  <span>{item.cantidad}</span>

                  <button
                    onClick={() =>
                      cambiarCantidad(item.id, item.cantidad + 1)
                    }
                    aria-label={`Aumentar cantidad de ${item.nombre}`}
                  >
                    +
                  </button>
                </div>

                <button
                  className="carrito-eliminar"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  Eliminar
                </button>
              </article>
            ))}
          </section>

          <section className="carrito-total">
            <h2>Total: {formatoCOP(totalPrecio)}</h2>
            <button onClick={() => navigate("/catalogo")}>
              Seguir comprando
            </button>
          </section>
        </>
      )}
    </main>
  );
}

export default Carrito;
