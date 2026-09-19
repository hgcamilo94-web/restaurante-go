import { useState } from "react";
import { Link } from "react-router-dom";

function Catalogo() {
  const [busqueda, setBusqueda] = useState("");

  const productos = [
    { id: 1, nombre: "Hamburguesa Clásica", precio: 18000, descripcion: "Carne 100% de res, queso cheddar y vegetales frescos." },
    { id: 2, nombre: "Pizza Especial", precio: 25000, descripcion: "Masa artesanal, jamón, queso mozzarella y champiñones." },
    { id: 3, nombre: "Pasta Alfredo", precio: 22000, descripcion: "Fettuccine con salsa cremosita alfredo y pollo a la parrilla." },
    { id: 4, nombre: "Ensalada César", precio: 15000, descripcion: "Lechuga fresca, crotones, queso parmesano y aderezo césar." }
  ];

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

      <div className="products-grid">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <article className="product-card" key={producto.id}>
              <h2>{producto.nombre}</h2>
              <p className="price">${producto.precio.toLocaleString()}</p>
              <p className="description">{producto.descripcion}</p>
              <Link to={`/detalle/${producto.id}`} className="secondary-button">
                Ver detalle
              </Link>
            </article>
          ))
        ) : (
          <p className="no-results">No se encontraron productos que coincidan con "{busqueda}".</p>
        )}
      </div>
    </section>
  );
}

export default Catalogo;