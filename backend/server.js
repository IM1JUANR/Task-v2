// 1. Importamos las dependencias
const express = require("express"); // Framework para el servidor
const mongoose = require("mongoose"); // Para conectarnos a MongoDB
const cors = require("cors"); // Para permitir conexiones desde el frontend
const bcrypt = require("bcrypt")
require("dotenv").config(); // Para leer variables de entorno desde .env

// 2. Creamos la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Middlewares
app.use(cors()); // Permite que Vue (frontend) pueda consumir la API
app.use(express.json()); // Para procesar datos en formato JSON

const userRoutes = require("./routes/userRoutes");
app.use("/api/users",userRoutes);

// 4. Ruta de prueba
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// 5. Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));

// 6. Levantar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
