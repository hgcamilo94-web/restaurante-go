import { createContext, useContext, useState } from 'react';
import api from '../Services/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [usuario, setUsuario] = useState(() => {
    const tokenGuardado = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');

    if (!tokenGuardado || !usuarioGuardado) {
      return null;
    }

    try {
      return JSON.parse(usuarioGuardado);
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      return null;
    }
  });

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const tokenRecibido = response.data.token;
      const usuarioRecibido = response.data.usuario;

      localStorage.setItem('token', tokenRecibido);
      localStorage.setItem('usuario', JSON.stringify(usuarioRecibido));

      setToken(tokenRecibido);
      setUsuario(usuarioRecibido);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        mensaje:
          error.response?.data?.mensaje ||
          'Error al iniciar sesión',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);