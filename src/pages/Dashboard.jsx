import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h1>Panel de Control - RestauranteGo</h1>
      <p>Bienvenido, <strong>{usuario?.nombre || usuario?.email}</strong> 👋</p>
      <p>Has accedido correctamente a tu área privada conectada a MongoDB Atlas.</p>
      <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Dashboard;