import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../pages/Login';
import { describe, it, expect } from 'vitest';

describe('Pruebas del Módulo de Autenticación', () => {
  it('1. Renderiza correctamente el formulario de inicio de sesión', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Iniciar Sesión/i);
    expect(screen.getByRole('button', { name: /Ingresar/i })).toBeInTheDocument();
  });
});