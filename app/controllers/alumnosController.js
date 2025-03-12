const Alumno = require('../models/alumnosModel');

// Función para crear un nuevo alumno
const crearAlumno = async (req, res) => {
  const { nombre, apellido_paterno, apellido_materno, fecha_nacimiento, sexo, correo, matricula, contrasenia, ...resto } = req.body;

  // Verifica si los campos requeridos están presentes
  if (!matricula || !nombre || !apellido_paterno || !apellido_materno) {
   return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  try {
    const nuevoAlumno = new Alumno({
      matricula, // Asigna la matrícula en el formato requerido
      foto: resto.foto,
      apellido_paterno,
      apellido_materno,
      nombre,
      fecha_alta: new Date(),
      fecha_nacimiento,
      sexo,
      telefonos: resto.telefonos,  // Se pueden incluir múltiples teléfonos
      correos: correo,  // Correos en formato array
      promedio_bachillerato: resto.promedio_bachillerato,  // Valor de promedio
      especialidad_bachillerato: resto.especialidad_bachillerato,  // Especialidad de bachillerato
      rfc: resto.rfc,  // RFC generado, ajustarlo si es necesario
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

    await nuevoAlumno.save();
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

module.exports = { crearAlumno };
