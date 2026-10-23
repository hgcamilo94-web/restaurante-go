import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Detalle from "./pages/Detalle";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Carrito from "./pages/Carrito";

function RutaProtegida({ children }) {
  const { usuario } = useAuth();

  return usuario ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              {/* Ruta raíz redirige al login según rúbrica */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Rutas Públicas / Autenticación */}
              <Route path="/login" element={<Login />} />
              <Route path="/carrito" element={<Carrito />} />

              {/* Rutas Protegidas (Requieren sesión activa) */}
              <Route
                path="/inicio"
                element={
                  <RutaProtegida>
                    <Home />
                  </RutaProtegida>
                }
              />
              <Route
                path="/catalogo"
                element={
                  <RutaProtegida>
                    <Catalogo />
                  </RutaProtegida>
                }
              />
              <Route
                path="/detalle/:id"
                element={
                  <RutaProtegida>
                    <Detalle />
                  </RutaProtegida>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RutaProtegida>
                    <Dashboard />
                  </RutaProtegida>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;