const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
const alumnosRoutes= require('./app/routes/alumnosRoutes');
const app = express();

conectarDB();

app.use(express.json());
app.use(cors());

app.use("/api", alumnosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});