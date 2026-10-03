import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import Catalogo from "../pages/Catalogo";

const renderCatalogo = () => {
  render(
    <BrowserRouter>
      <CartProvider>
        <Catalogo />
      </CartProvider>
    </BrowserRouter>
  );
};

describe("Catalogo", () => {
  test("muestra los productos del catálogo", () => {
    renderCatalogo();

    expect(screen.getByText("Hamburguesa Clásica")).toBeInTheDocument();
    expect(screen.getByText("Pizza Especial")).toBeInTheDocument();
    expect(screen.getByText("Pasta Alfredo")).toBeInTheDocument();
    expect(screen.getByText("Ensalada César")).toBeInTheDocument();
  });

  test("muestra el buscador con el placeholder actual", () => {
    renderCatalogo();

    expect(
      screen.getByPlaceholderText("Buscar producto...")
    ).toBeInTheDocument();
  });
});