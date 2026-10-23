
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Detalle from "./pages/Detalle";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Carrito from "./pages/Carrito";

function RutaProtegida({ children }) {
  const { usuario } = useAuth();

  return usuario
    ? children
    : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/detalle/:id" element={<Detalle />} />
              <Route path="/login" element={<Login />} />
              <Route
                    path="/dashboard"
                    element={
                      <RutaProtegida>
                        <Dashboard />
                      </RutaProtegida>
                    }
                  />
              <Route path="/carrito" element={<Carrito />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
