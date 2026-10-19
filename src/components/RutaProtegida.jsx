import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RutaProtegida = ({ children }) => {
  const { usuario, cargando } = useAuth();

  if (cargando) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Cargando...</div>;

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RutaProtegida;