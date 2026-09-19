# RestauranteGo — Plataforma Web Gastronómica

## Definición del Problema
En el sector gastronómico actual, los clientes buscan visualizar menús de forma rápida, filtrar platos según sus preferencias e interactuar con la oferta comercial sin la lentitud de las páginas tradicionales. **RestauranteGo** es una Single Page Application (SPA) desarrollada para optimizar la experiencia del usuario, permitiendo explorar productos, buscar opciones en tiempo real y gestionar un carrito de compras dinámico sin recargas de página.

## Tecnologías Utilizadas
- **React 18** — Librería para interfaces de usuario basada en componentes.
- **Vite** — Tooling y empaquetador de aplicaciones web de alto rendimiento.
- **React Router DOM v6** — Navegación del lado del cliente (SPA) con Layouts e íconos dinámicos.
- **JavaScript (ES6+)** — Lógica de programación.
- **CSS3 (Flexbox & Grid)** — Estilos responsive y maquetación.
- **Git & GitHub** — Control de versiones e historial de desarrollo.

## Arquitectura del Proyecto

```text
restaurante-go/
├── public/
├── src/
│   ├── assets/          # Recursos estáticos (imágenes locales)
│   ├── components/      # Componentes de UI reutilizables (Header, Footer, HeroSection)
│   ├── context/         # Estado global (CartContext)
│   ├── layouts/         # Layout principal con <Outlet/> (MainLayout)
│   ├── pages/           # Vistas principales (Home, Catalogo, Detalle)
│   ├── App.css          # Estilos globales y reglas CSS Grid/Flexbox
│   ├── App.jsx          # Configuración de rutas e inyección de Context
│   └── main.jsx         # Punto de entrada de la aplicación
├── .gitignore
├── package.json
└── README.md