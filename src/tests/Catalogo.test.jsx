
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import Catalogo from "../pages/Catalogo";
import api from "../Services/api.js";

vi.mock("../Services/api.js", () => ({
  default: {
    get: vi.fn(),
  },
}));

const productosPrueba = [
  {
    _id: "1",
    nombre: "Hamburguesa Clásica",
    precio: 15000,
    categoria: "Hamburguesas",
  },
  {
    _id: "2",
    nombre: "Pizza Especial",
    precio: 22000,
    categoria: "Pizzas",
  },
  {
    _id: "3",
    nombre: "Pasta Alfredo",
    precio: 18000,
    categoria: "Pastas",
  },
  {
    _id: "4",
    nombre: "Ensalada César",
    precio: 12000,
    categoria: "Ensaladas",
  },
];

const renderCatalogo = () => {
  return render(
    <BrowserRouter>
      <CartProvider>
        <Catalogo />
      </CartProvider>
    </BrowserRouter>
  );
};

describe("Catalogo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    api.get.mockResolvedValue({
      data: productosPrueba,
    });
  });

  test("muestra los productos del catálogo", async () => {
    renderCatalogo();

    expect(
      await screen.findByText("Hamburguesa Clásica")
    ).toBeInTheDocument();

    expect(screen.getByText("Pizza Especial")).toBeInTheDocument();
    expect(screen.getByText("Pasta Alfredo")).toBeInTheDocument();
    expect(screen.getByText("Ensalada César")).toBeInTheDocument();

    expect(api.get).toHaveBeenCalledWith("/productos");
  });

    test("muestra el buscador con el placeholder actual", async () => {
    renderCatalogo();
    
    expect(
      screen.getByPlaceholderText("Buscar producto...")
    ).toBeInTheDocument();
  
    expect(
      await screen.findByText("Hamburguesa Clásica")
    ).toBeInTheDocument();
  });
});
