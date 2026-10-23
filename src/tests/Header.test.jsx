import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import Header from '../components/Header';
import { describe, it, expect } from 'vitest';

describe('Header', () => {
  it('muestra el nombre del restaurante y el carrito', () => {
    const mockCart = { cantidadTotal: 0 };

    render(
      <BrowserRouter>
        <AuthProvider>
          <CartContext.Provider value={mockCart}>
            <Header />
          </CartContext.Provider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/RestauranteGo/i)).toBeInTheDocument();
  });
});