const { Login } = require('../models/index')

const addManyUsuarios = async (req,res) => {
    try {
      const usuario = req.body
      const newUsuario = await Promise.all(usuario.map((el) => Login.create(el))); // Utiliza Promise.all para esperar todas las creaciones
      res.send(newUsuario)
    } catch (error) {  
      console.error("este es el catch: ", error); 
      res.status(500).send("Algo salió mal");
  }
  }

module.exports = {
    addManyUsuarios
}