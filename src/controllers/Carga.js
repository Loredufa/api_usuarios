const { Login } = require('../models/index')

const addManyUsuarios = async (req,res) => {
    try {
      console.log("soy req: ",req.body)
      const usuario = req.body
      console.log("soy usuario: ", usuario)
      const newUsuario = await Promise.all(usuario.map((el) => Login.create(el))); // Utiliza Promise.all para esperar todas las creaciones
      console.log("soy newUsuario; ", newUsuario)
      res.send(newUsuario)
    } catch (error) {  
      console.error("este es el catch: ", error); 
      res.status(500).send("Algo salió mal");
  }
  }

  module.exports = {
    addManyUsuarios
}