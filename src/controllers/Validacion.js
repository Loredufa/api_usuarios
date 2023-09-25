const { Login } = require('../models/index')

//valida si el usuario y contraseña existen en la bd
const validacion = async (req, res) =>  {
    try{
    // Verifica si los usuarios y contraseñas existen en la tabla Login
          const existingUsuario = await Login.findOne({
            where: {
              usuario: req.usuario, 
              password: req.password, 
            },
          });
    // Si el usuario existe, devuelve nombre y password
    if (existingUsuario) {
        return {
          nombre: existingUsuario.nombre, // Reemplaza con el nombre del campo de la tabla
        };
      } else {
        return "ok"; // Si el usuario no existe, devuelve "ok"
      }
    } catch (error) {
      console.error("Error al validar usuario: ", error);
    }
  }

  module.exports = {
    validacion
}
  