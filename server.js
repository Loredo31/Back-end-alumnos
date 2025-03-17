const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');  // Conexión a la base de datos
const alumnosRoutes = require('./app/routes/alumnosRoutes');
const observacionesRoutes = require('./app/routes/observaciones');  // Rutas de observaciones
const carreraRoutes = require('./app/routes/carreraRoutes')
const profesorRoutes = require('./app/routes/profesorRoutes');  // Rutas de profesores

const app = express();

// Conectar a la base de datos MongoDB
conectarDB();

// Middleware
app.use(express.json());  // Para manejar solicitudes con JSON
app.use(cors());  // Para habilitar CORS y permitir peticiones desde otros dominios

// Rutas de la API
app.use("/api", alumnosRoutes);  // Rutas de alumnos
app.use("/api/observaciones", observacionesRoutes);  // Rutas de observaciones
app.use('/api/carreras', carreraRoutes);  // Rutas de carreras
app.use('/api/profesores', profesorRoutes);  // Rutas de profesores

// Configuración del puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
