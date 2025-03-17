const express = require('express');
const router = express.Router();
const Carrera = require('../models/Carrera');

// Ruta para obtener todas las carreras
router.get('/', async (req, res) => {
  try {
    const carreras = await Carrera.find();
    res.json(carreras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
