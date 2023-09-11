const { Login } = require('../models/index')
const { validacion } = require('./Validacion')


const addManyUsuarios = async (req,res) => {
    try {
      const usuario = req.body
      const UsuarioCargado = []
      const newUsuario = await Promise.all(
        usuario.map( async (el) => {
          const validado = await validacion({usuario: el.usuario, password: el.password});
          validado === 'ok'? UsuarioCargado.push(await Login.create(el)) : UsuarioCargado.push(`El usuario ${el.usuario} ya está creado`)
          
          //const newUsuario = await Promise.all(usuario.map((el) => Login.create(el))); // Utiliza Promise.all para esperar todas las creaciones
      }
      ))
      res.send(UsuarioCargado)
    } catch (error) {  
      console.error("este es el catch: ", error); 
      res.status(500).send("La carga no se pudo realizar");
  }
  }

module.exports = {
    addManyUsuarios
}