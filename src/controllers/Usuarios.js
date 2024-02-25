const { Sequelize, Login } = require('../models/index')
const { validacion } = require('./Validacion')
const jwt = require('jsonwebtoken');
const config = require('../utils/config')

//obtener todos los usuarios
const getAllUsuario = async (req, res) => {
  try {
    const usuario = await Login.findAll()
    res.send(JSON.stringify(usuario))
  } catch (error) { console.log("Algo salio mal: ", error); 
  res.status(500).send({ message: 'Error interno del servidor' });
}
}

//Verifica si existe un usuario por dni
const verifyUsuario = async (req,res) => {
  try {
    const usr = await Login.findOne({
      where: {
        usuario: req.params.dni
      }
    });
    usr? res.status(200).send(usr): res.status(401).send({message: 'No se encontraron usuarios en la verificacion'});
  } catch (error) { console.log("Algo salio mal: ", error); 
  res.status(500).send({ message: 'Error interno del servidor' });
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
    res.status(200).send({token, usuario: newUsuario}) }  

    else res.status(404).send({message: `El usuario ya existe`})
  } catch (error) { console.log("Algo salio mal: ", error); 
  res.status(500).send({ message: 'Error interno del servidor' });
}
}

//Obtener usuario por id
const getUsuarioById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const usuario = await Login.findByPk(id);

    if (!usuario) {
      res.status(401).send({ message: `No se pudo encontrar el usuario` });
    } else if (usuario.estado === "true") {
      res.status(200).send(usuario);
    } else {
      res.status(402).send({ message: { 'El usuario está desactivado': usuario.estado } });
    }
  } catch (error) {
    console.log("Algo salió mal: ", error);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
};


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
  if (!login) {
    res.status(404).send({ mensaje: "Usuario no encontrado" });
 
  } else if (login.estado === "true") {

    const token = jwt.sign({id: login.id, userName: login.usuario}, config.secretKey,{expiresIn: 86400});
    res.status(200).send({"token" :token, "usuario" : login});

  } else { res.status(402).send({ mensaje: "El usuario está desactivado"});}

  } catch (error) { console.log("Algo salio mal: ", error); 
  res.status(500).send({ message: 'Error interno del servidor' });
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
  res.status(500).send({ message: 'Error interno del servidor' });
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
  res.status(500).send({ message: 'Error interno del servidor' });
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
  res.status(500).send({ message: 'Error interno del servidor' });
}
}


module.exports = {
    getAllUsuario,
    getUsuarioById,
    addUsuario,
    putUsuario,
    deleteUsuario,
    getUsuarioByLogin,
    putUsuarioMod,
    verifyUsuario

}