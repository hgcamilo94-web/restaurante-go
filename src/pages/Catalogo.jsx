import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import api from "../Services/api.js";

function Catalogo() {
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const { agregarAlCarrito } = useContext(CartContext);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await api.get("/productos");
        const productosAdaptados = response.data.map((producto) => ({
          ...producto,
          id: producto._id,
          descripcion: producto.descripcion || producto.categoria,
        }));

        setProductos(productosAdaptados);
      } catch {
        setError("No fue posible cargar los productos. Intenta nuevamente.");
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="catalogo-container">
      <h1>Nuestro Catálogo</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-input"
        />
      </div>

      {cargando && <p>Cargando productos...</p>}
      {error && <p role="alert">{error}</p>}

      {!cargando && !error && (
        <div className="products-grid">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <article className="product-card" key={producto.id}>
                {/* Imagen del producto traída desde MongoDB */}
                {producto.imagen && (
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="product-image"
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "8px 8px 0 0"
                    }}
                  />
                )}

                <div>
                  <h2>{producto.nombre}</h2>
                  <p className="price">
                    ${Number(producto.precio).toLocaleString("es-CO")}
                  </p>
                  <p className="description">{producto.descripcion}</p>
                </div>

                <div className="card-actions">
                  <button
                    className="primary-button"
                    onClick={() => agregarAlCarrito(producto)}
                  >
                    Agregar al carrito
                  </button>

                  <Link
                    to={`/detalle/${producto.id}`}
                    className="secondary-button"
                  >
                    Ver detalle
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <p className="no-results">
              {busqueda
                ? `No se encontraron productos que coincidan con "${busqueda}".`
                : "Todavía no hay productos en el catálogo."}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default Catalogo;