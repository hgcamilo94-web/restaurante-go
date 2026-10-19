
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import productosRoutes from "./routes/productos.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Configuración de middleware
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// 2. Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/productos", productosRoutes);

// 3. Ruta para comprobar que la API funciona
app.get("/api/health", (req, res) => {
  res.json({ mensaje: "RestauranteGo API funcionando" });
});

// 4. Conexión con MongoDB Atlas e inicio del servidor
async function iniciarServidor() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado correctamente");

    app.listen(PORT, () => {
      console.log(`Servidor activo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar MongoDB:", error.message);
    process.exit(1);
  }
}

iniciarServidor();
