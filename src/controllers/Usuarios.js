const { Login } = require('../models/index')
const { validacion } = require('./Validacion')
const jwt = require('jsonwebtoken');
const config = require('../utils/config')

//obtener todos los usuarios
const getAllUsuario = async (req, res) => {
  try {
    const usuario = await Login.findAll()
    res.send(usuario)
  } catch (error) { console.log("Algo salio mal: ", error); 
    //throw error; //lanzo el error
}
}

//Dar de alta un nuevo usuario
const addUsuario = async (req,res) => {
  try {
    const usuario = req.body
    //verifica si existe el usuarios
    let userValidado = await validacion({usuario: usuario.usuario, password: usuario.password})
    if (userValidado === 'ok') {
      const usuarioCompleto = { ...usuario, contrato: usuario.contrato || '0000' };
    const newUsuario = await Login.create(usuarioCompleto)
    //Genera token del usuario
    //Estructura del tolen: ({dato a guardar}, palabrasecreta, tiempo de expiracion)
    const token = jwt.sign({id: newUsuario.id, userName: newUsuario.usuario}, config.secretKey,{expiresIn: 86400});
    res.status(200).send(token) }  

    else res.status(404).send({message: `El usuario ya existe`})
  } catch (error) { console.log("Algo salio mal: ", error); 
    //throw error; //lanzo el error 
}
}

//Obtener usuario po id
const getUsuarioById = async (req, res, next) => {
  try {
    const id = req.params.id
    const usuario = await Login.findByPk(id)
    usuario? res.status(200).send(usuario) : res.status(401).send({message: `No se pudo encontrar el usuario`}) 
  } catch (error) { console.log("Algo salio mal: ", error); 
    //throw error; //lanzo el error
}
}

//Obtener usuario segun usuario y contraseña
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
    const token = jwt.sign({id: login.id, userName: login.usuario}, config.secretKey,{expiresIn: 86400});
    res.status(200).send({"token" :token, "usuario" : login});
  } else {
    res.status(404).send({ mensaje: "Usuario no encontrado" });
  }
  } catch (error) { console.log("Algo salio mal: ", error); 
   // throw error; //lanzo el error
}
}

//Modificar password de un usuario
const putUsuario = async (req, res) => {
  try {
    const id = req.body.idUsuario;
    const password = req.body.password;   
    const newPassword = {password: password}

    if (!id) {
      return res.status(401).send({ message: "No existe el ID" });
    } else {
    const updateUsuario = await Login.update(newPassword, {
      where: {
        id,
      },
    })
    updateUsuario[0] !== 0? res.status(200).send({updateUsuario, message:"Contraseña actualizada"}) : 
    res.status(400).send({message:"No se pudo actualizar la contraseña"})}
  } catch (error) { console.log("Algo salio mal: ", error); 
   // throw error; //lanzo el error
}
}

//Modificar datos de un ususario
const putUsuarioMod = async (req, res) => {
  try {
    const id = req.params.id;
    const info = req.body;   
    const updateUsuario = await Login.update(info, {
      where: {
        id,
      },
    })
    updateUsuario[0] !== 0? res.status(200).send({updateUsuario, message:"Usuario actualizado"}) : 
    res.status(400).send({message:"No se pudo actualizar el usuario"})}
  catch (error) { console.log("Algo salio mal: ", error); 
}
}

//Eliminar un usuario
const deleteUsuario = async(req, res) => {
  try {
    const id = req.params.id
    const deleteUser = await Login.destroy({
      where: {
        id,
      },
    })
    deleteUser? res.status(200).send({message: 'Usuario eliminado'}) :
    res.status(401).send({message: 'No se pudo eliminar el usuario'})

  } catch (error) { console.log("Algo salio mal: ", error); 
    //throw error
}
}


module.exports = {
    getAllUsuario,
    getUsuarioById,
    addUsuario,
    putUsuario,
    deleteUsuario,
    getUsuarioByLogin,
    putUsuarioMod

}