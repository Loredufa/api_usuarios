const { Login } = require('../models/index')

const addManyUsuarios = async (req,res) => {
    try {
      console.log("soy req: ",req.body)
      const usuario = req.body
      console.log("soy usuario: ", usuario)
      const newUsuario = await usuario.map(el => Login.create(el))
      console.log("soy newUsuario; ", newUsuario)
      res.send(newUsuario)
    } catch (error) { console.log("Algo salio mal: ", error); 
      //throw error; //lanzo el error 
  }
  }

  module.exports = {
    addManyUsuarios

}