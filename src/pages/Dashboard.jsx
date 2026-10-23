import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../Services/api.js";

const Dashboard = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  // Estados para el formulario de nuevo producto
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("Comidas Rápidas");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSubmitProducto = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    setCargando(true);

    try {
      // El interceptor de api.js adjunta automáticamente el token JWT
      await api.post("/productos", {
        nombre,
        precio: Number(precio),
        categoria,
        descripcion: descripcion.trim() || `Delicioso plato de la categoría ${categoria}`,
        imagen,
      });

      setMensaje("¡Producto creado y persistido en MongoDB Atlas con éxito!");
      setNombre("");
      setPrecio("");
      setCategoria("Comidas Rápidas");
      setDescripcion("");
      setImagen("");
    } catch (err) {
      const mensajeError = err.response?.data?.mensaje || err.response?.data?.error || "Error al crear el producto. Verifica los datos o tu sesión.";
      setError(mensajeError);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
      {/* Cabecera del Dashboard */}
      <div 
        style={{ 
          background: "#fff", 
          padding: "25px", 
          borderRadius: "12px", 
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          marginBottom: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px"
        }}
      >
        <div>
          <h1 style={{ margin: "0 0 10px 0", fontSize: "1.8rem", color: "#333" }}>Panel de Control</h1>
          <p style={{ margin: 0, color: "#666" }}>
            Bienvenido, <strong>{usuario?.nombre || usuario?.email}</strong>
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.2s"
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Sección del Formulario */}
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ marginBottom: "20px", borderBottom: "2px solid #f0f0f0", paddingBottom: "15px" }}>
          <h2 style={{ margin: "0 0 5px 0", color: "#2c3e50" }}>Registrar Nuevo Plato</h2>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#7f8c8d" }}>
            Añade un nuevo producto al menú mediante escritura directa (POST) hacia MongoDB Atlas.
          </p>
        </div>

        {mensaje && (
          <div style={{ padding: "12px 15px", backgroundColor: "#d4edda", color: "#155724", marginBottom: "20px", borderRadius: "6px", border: "1px solid #c3e6cb" }}>
            {mensaje}
          </div>
        )}

        {error && (
          <div style={{ padding: "12px 15px", backgroundColor: "#f8d7da", color: "#721c24", marginBottom: "20px", borderRadius: "6px", border: "1px solid #f5c6cb" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmitProducto} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div style={{ gridColumn: "span 2" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333" }}>Nombre del plato:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Ej: Patacón con Hogao"
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "1rem", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333" }}>Precio ($):</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              placeholder="Ej: 15000"
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "1rem", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333" }}>Categoría:</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "1rem", background: "#fff", boxSizing: "border-box" }}
            >
              <option value="Comidas Rápidas">Comidas Rápidas</option>
              <option value="Pizzas">Pizzas</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Platos Típicos">Platos Típicos</option>
              <option value="Postres">Postres</option>
            </select>
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333" }}>Descripción:</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Breve descripción de los ingredientes..."
              rows="3"
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "1rem", boxSizing: "border-box", resize: "vertical" }}
            />
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333" }}>URL de la Imagen (Unsplash):</label>
            <input
              type="url"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              required
              placeholder="https://images.unsplash.com/..."
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "1rem", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ gridColumn: "span 2", textAlign: "right", marginTop: "10px" }}>
            <button
              type="submit"
              disabled={cargando}
              style={{
                padding: "12px 25px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
                width: "100%"
              }}
            >
              {cargando ? "Guardando en MongoDB Atlas..." : "Guardar Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;