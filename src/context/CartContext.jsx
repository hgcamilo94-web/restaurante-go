
import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);

      if (existe) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      return;
    }

    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => item.id !== id)
    );
  };

  const cantidadTotal = carrito.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  const totalPrecio = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        cambiarCantidad,
        eliminarDelCarrito,
        cantidadTotal,
        totalPrecio,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
