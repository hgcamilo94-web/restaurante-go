import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";

describe("Header", () => {
  test("muestra el nombre del restaurante y el carrito", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Header />
        </CartProvider>
      </BrowserRouter>
    );

    expect(screen.getByText("RestauranteGo")).toBeInTheDocument();
    expect(screen.getByText("Catálogo")).toBeInTheDocument();
    expect(screen.getByText(/🛒 0/)).toBeInTheDocument();
  });
});