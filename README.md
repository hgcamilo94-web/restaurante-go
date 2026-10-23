# RestauranteGo — Plataforma Web Gastronómica Full-Stack

## Definición del Proyecto
RestauranteGo es una aplicación web Full-Stack tipo Single Page Application (SPA) desarrollada para el sector gastronómico. Permite a los usuarios visualizar menús interactivos, filtrar platos, gestionar un carrito de compras dinámico y acceder a un panel de control administrativo protegido con autenticación JWT y persistencia de datos en la nube con MongoDB Atlas.

---

## Tecnologías Utilizadas

### Frontend:
- React 19 — Librería para interfaces de usuario basada en componentes.
- Vite 8 — Tooling y empaquetador de alto rendimiento.
- React Router DOM 7 — Enrutamiento del lado del cliente y protección de rutas.
- Axios — Cliente HTTP con interceptores para inyección automática de tokens JWT.
- CSS3 (Flexbox & Grid) — Diseño responsivo y moderno.

### Backend:
- Node.js & Express 5 — Servidor y API RESTful.
- MongoDB Atlas & Mongoose 9 — Base de datos NoSQL en la nube y modelado de datos.
- JWT (JSON Web Tokens) — Autenticación segura de usuarios.
- Bcrypt — Encriptación de contraseñas.

---

##  Arquitectura del Proyecto

```text
restaurante-go/
├── Backend/             # Servidor Express, modelos Mongoose y rutas de API
│   ├── Models/          # Esquemas de MongoDB (Producto.js, Usuario.js)
│   ├── routes/          # Endpoints de autenticación y productos
│   └── server.js        # Configuración principal del servidor
├── src/                 # Código fuente del Frontend (React)
│   ├── assets/          # Recursos estáticos
│   ├── components/      # Componentes reutilizables (Navbar, Rutas Protegidas)
│   ├── context/         # Estado global (AuthContext, CartContext)
│   ├── pages/           # Vistas (Login, Registro, Catalogo, Detalle, Dashboard)
│   ├── Services/        # Configuración de Axios (api.js)
│   ├── App.jsx          # Configuración de rutas principales
│   └── main.jsx         # Punto de entrada
├── .env                 # Variables de entorno (Oculto en Git)
├── .gitignore
├── package.json
└── README.md

---

## Guía de Instalación y Ejecución

### 1. Clonar el repositorio
git clone https://github.com/tu-usuario/restaurante-go.git
cd restaurante-go

### 2. Configuración del Backend
1. Entra a la carpeta del backend y configura tu archivo .env con las siguientes variables:
   PORT=5000
   MONGO_URI=tu_cadena_de_conexion_mongodb_atlas
   JWT_SECRET=tu_clave_secreta_jwt
2. Instala las dependencias del backend:
   cd Backend
   npm install
3. Inicia el servidor backend:
   npm run dev

### 3. Configuración del Frontend
1. Abre otra terminal en la raíz del proyecto (restaurante-go).
2. Instala las dependencias del frontend:
   npm install
3. Inicia el servidor de desarrollo del frontend:
   npm run dev
4. Para compilar la versión de producción:
   npm run build
