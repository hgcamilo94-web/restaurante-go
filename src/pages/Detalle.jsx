import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Detalle() {
  const { id } = useParams();
  const { agregarAlCarrito } = useContext(CartContext);

  const productos = [
    { id: 1, nombre: "Hamburguesa Clásica", precio: 18000, descripcion: "Carne 100% de res, queso cheddar y vegetales frescos." },
    { id: 2, nombre: "Pizza Especial", precio: 25000, descripcion: "Masa artesanal, jamón, queso mozzarella y champiñones." },
    { id: 3, nombre: "Pasta Alfredo", precio: 22000, descripcion: "Fettuccine con salsa cremosita alfredo y pollo a la parrilla." },
    { id: 4, nombre: "Ensalada César", precio: 15000, descripcion: "Lechuga fresca, crotones, queso parmesano y aderezo césar." }
  ];

  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) {
    return (
      <section className="detalle-container">
        <h1>Producto no encontrado</h1>
        <p>El producto con el ID {id} no existe en nuestro menú.</p>
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
        <p className="price">${producto.precio.toLocaleString()}</p>
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