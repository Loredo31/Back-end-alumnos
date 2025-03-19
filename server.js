require('dotenv').config(); // Esto carga las variables de tu archivo .env
express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
const alumnosRoutes= require('./app/routes/alumnosRoutes');
const profesorExtRoutes= require('./app/routes/profesorExtRoutes');
const login= require('./app/routes/authRoutes')
const app = express();

conectarDB();

app.use(express.json());
app.use(cors());

app.use("/api", alumnosRoutes);
app.use("/api", profesorExtRoutes);
app.use("/api", login);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});