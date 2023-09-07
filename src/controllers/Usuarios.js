const { Login } = require('../models/index')

const getAllUsuario = async (req, res) => {
  try {
    const usuario = await Login.findAll()
    res.send(usuario)
  } catch (error) { console.log("Algo salio mal: ", error); 
    throw error; //lanzo el error
}
}

const addUsuario = async (req,res) => {
  try {
    const usuario = req.body
    const newUsuario = await Login.create(usuario)
    res.send(newUsuario)
  } catch (error) { console.log("Algo salio mal: ", error); 
    throw error; //lanzo el error 
}
}

const getUsuarioById = async (req, res, next) => {
  try {
    const id = req.params.id
    const usuario = await Login.findByPk(id)
    res.send(usuario)
  } catch (error) { console.log("Algo salio mal: ", error); 
    throw error; //lanzo el error
}
}

const getUsuarioByLogin = async (req, res, next) => {
  try {
    const usuario = req.params.usuario
    const password = req.params.password
    const login = await Login.findOne({
    where: {
      usuario,
      password
    }
  })
  if (login) {
    res.send(login);
  } else {
    res.status(404).send({ mensaje: "Usuario no encontrado" });
  }
  } catch (error) { console.log("Algo salio mal: ", error); 
    throw error; //lanzo el error
}
}

const putUsuario = async (req, res) => {
  try {
    const id = req.params.id
    const usuario = req.body
    const updateUsuario = await Login.update(usuario, {
      where: {
        id,
      },
    })
    res.send(updateUsuario)
  } catch (error) { console.log("Algo salio mal: ", error); 
    throw error; //lanzo el error
}
}

const deleteUsuario = (req, res, next) => {
  const id = req.params.id
  return Login.destroy({
    where: {
      id,
    },
  }).then(() => {
    res.sendStatus(200)
  }).catch((error) => next(error))
}

module.exports = {
    getAllUsuario,
    getUsuarioById,
    addUsuario,
    putUsuario,
    deleteUsuario,
    getUsuarioByLogin

}