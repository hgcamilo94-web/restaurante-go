import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import api from "../Services/api.js";

function Detalle() {
  const { id } = useParams();
  const { agregarAlCarrito } = useContext(CartContext);

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const response = await api.get("/productos");
        const encontrado = response.data.find(
          (item) => item._id === id
        );

        if (encontrado) {
          setProducto({
            ...encontrado,
            id: encontrado._id,
            descripcion: encontrado.descripcion || encontrado.categoria,
          });
        }
      } catch {
        setError("No fue posible cargar el producto.");
      } finally {
        setCargando(false);
      }
    };

    cargarProducto();
  }, [id]);

  if (cargando) {
    return (
      <section className="detalle-container">
        <p>Cargando producto...</p>
      </section>
    );
  }

  if (error || !producto) {
    return (
      <section className="detalle-container">
        <h1>Producto no encontrado</h1>
        <p>{error || `El producto con el ID ${id} no existe en nuestro menú.`}</p>
        <Link to="/catalogo" className="primary-button">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="detalle-container">
      <div className="detalle-card">
        <h1>{producto.nombre}</h1>
        <p className="price">
          ${Number(producto.precio).toLocaleString("es-CO")}
        </p>
        <p className="description">{producto.descripcion}</p>

        <div className="detalle-actions">
          <button
            className="primary-button"
            onClick={() => agregarAlCarrito(producto)}
          >
            Agregar al carrito
          </button>

          <Link to="/catalogo" className="secondary-button">
            Volver al catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Detalle;