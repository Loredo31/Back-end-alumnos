const Alumno = require('../models/alumnosModel');

// Función para crear un nuevo alumno
const crearAlumno = async (req, res) => {
  const { nombre, apellido_paterno, apellido_materno, fecha_nacimiento, sexo, correo, contrasenia, ...resto } = req.body;

  // Verifica si los campos requeridos están presentes
  if (!nombre || !apellido_paterno || !apellido_materno || !fecha_nacimiento || !sexo) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  try {
    // Crear un nuevo alumno, sin pasar la matrícula ni el RFC ya que se generan automáticamente
    const nuevoAlumno = new Alumno({
      foto: resto.foto,
      apellido_paterno,
      apellido_materno,
      nombre,
      fecha_alta: new Date(),  // Fecha de alta asignada automáticamente
      fecha_nacimiento,
      sexo,
      telefonos: resto.telefonos,  // Se pueden incluir múltiples teléfonos
      correos: correo,  // Correos en formato array
      promedio_bachillerato: resto.promedio_bachillerato,  // Valor de promedio
      especialidad_bachillerato: resto.especialidad_bachillerato,  // Especialidad de bachillerato
      rol: 1,  // Definir el rol como Administrador (1)
      contrasenia,
      domicilio: {
        calle: resto.domicilio.calle,
        numero_interior: resto.domicilio.numero_interior,
        numero_exterior: resto.domicilio.numero_exterior,
        colonia: resto.domicilio.colonia,
        codigo_postal: resto.domicilio.codigo_postal,
        ciudad: resto.domicilio.ciudad
      },
      tutores: resto.tutores,  // Información de tutores, si se proporciona
      carrera: {
        nombre: resto.carrera.nombre,
        especialidad: resto.carrera.especialidad
      },
      certificado_bachillerato: resto.certificado_bachillerato ? 1 : 0  // Certificado de bachillerato (1 para sí, 0 para no)
    });

    // Guardar el alumno en la base de datos
    await nuevoAlumno.save();

    // Devolver la respuesta con el alumno creado (incluyendo la matrícula y el RFC generados)
    res.status(201).json(nuevoAlumno);
  } catch (error) {
    console.error('Error al registrar alumno:', error);
    res.status(400).json({
      message: 'Error al registrar alumno',
      error: error.message,  // Devuelve el mensaje del error
      stack: error.stack     // Devuelve el stack trace para obtener más detalles
    });
  }
};

// Función para obtener los datos de un alumno por su matrícula
const obtenerAlumno = async (req, res) => {
  const { id } = req.params;  // Capturar la matrícula del parámetro de la ruta

  try {
    // Buscar al alumno en la base de datos por su matrícula
    const alumno = await Alumno.findOne({ matricula: id });

    if (!alumno) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    // Si el alumno se encuentra, devolver los datos
    res.status(200).json(alumno);
  } catch (error) {
    console.error('Error al obtener los datos del alumno:', error);
    res.status(500).json({
      message: 'Error al obtener los datos del alumno',
      error: error.message,  // Mensaje del error
      stack: error.stack     // Stack trace para más detalles
    });
  }
};

// 🔹 Actualizar perfil del alumno
const actualizarAlumno = async (req, res) => {
  const { id } = req.params; // Obtener la matrícula del alumno
  const { telefonos, correos, contrasenia, domicilio } = req.body;

  try {
    const alumno = await Alumno.findOneAndUpdate(
      { matricula: id }, // Busca por matrícula
      { telefonos, correos, contrasenia, domicilio },
      { new: true }
    );

    if (!alumno) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    res.json({ message: 'Alumno actualizado correctamente', alumno });
  } catch (error) {
    console.error('Error al actualizar el alumno:', error);
    res.status(500).json({ message: 'Error al actualizar el perfil', error: error.message });
  }
};



// Obtener todos los alumnos
const obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.find(); // Obtiene todos los alumnos de la colección
    res.status(200).json(alumnos);
  } catch (error) {
    console.error('Error al obtener la lista de alumnos:', error);
    res.status(500).json({
      message: 'Error al obtener la lista de alumnos',
      error: error.message
    });
  }
};

module.exports = { crearAlumno, obtenerAlumno, actualizarAlumno, obtenerAlumnos };

