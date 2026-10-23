
import { createContext, useContext, useState } from 'react';
import api from '../Services/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');

    if (!token || !usuarioGuardado) {
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

      localStorage.setItem('token', response.data.token);
      localStorage.setItem(
        'usuario',
        JSON.stringify(response.data.usuario)
      );

      setUsuario(response.data.usuario);

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
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
