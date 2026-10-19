import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [esRegistro, setEsRegistro] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensajeExito('');

    if (esRegistro) {
      try {
        await api.post('/auth/registro', formData);
        setMensajeExito('Usuario registrado exitosamente. Por favor, inicia sesión.');
        setEsRegistro(false);
      } catch (err) {
        setError(err.response?.data?.mensaje || 'Error al registrar usuario');
      }
    } else {
      const res = await login(formData.email, formData.password);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.mensaje);
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{esRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {mensajeExito && <p style={{ color: 'green' }}>{mensajeExito}</p>}

      <form onSubmit={handleSubmit}>
        {esRegistro && (
          <div style={{ marginBottom: '10px' }}>
            <label>Nombre:</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
          </div>
        )}
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Contraseña:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
          {esRegistro ? 'Registrarse' : 'Ingresar'}
        </button>
      </form>

      <button onClick={() => setEsRegistro(!esRegistro)} style={{ marginTop: '15px', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}>
        {esRegistro ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
      </button>
    </div>
  );
};

export default Login;