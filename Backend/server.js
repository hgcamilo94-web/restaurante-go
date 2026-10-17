import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ mensaje: "RestauranteGo API funcionando" });
});

const PORT = process.env.PORT || 5000;

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