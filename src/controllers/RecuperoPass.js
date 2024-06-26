const { Login } = require('../models/index');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require('../utils/config')

//Envío de mail para resetear la contraseña
const conectionMail = async (req, res, usuario, token, idUsuario) => {
    try {
        //url que utiliza el front para el reseteo
        verificationLink = `${config.urlReset}${token}}&idUsuario=${idUsuario}`
        //credenciales del mail por donde se envía el correo
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'cuyenreset@gmail.com',
                pass: config.mailPass
                }
            });
        //Armado del correo a envar
        const mailOptions = {
            from: `Cuyen <cuyenreset@gmail.com>`,
            to: usuario.email,
            subject: 'Tu contraseña de Cuyen',
            text: 'Hola '+ usuario.nombre + ', Te enviamos un link para que puedas generar una nueva contraseña ' + verificationLink
        }
        //envío correo 
        transporter.sendMail(mailOptions, (error) => {
            error? res.status(500).send(error.message): res.status(200).jsonp(req.body)
        })
        return true
        } catch (error) { console.log("Algo salio mal: ", error); 
            //throw error; //lanzo el error
            return false
    }
}

//Funcion padre para el reseteo de contraseña 
const getUserByUsername = async (req, res) => {
  try {
    console.log('ENTRO A LA FUNCION')
    //recibe usuario por body
    const user = req.body.usuario
    console.log('USER', user)
    //Busco al usuario
    const usuario = await Login.findOne({
      where: {
        usuario: user
      }
    })
    console.log('USUARIO', usuario)
    if(!usuario) {res.status(400).json({ message: 'El usuario no existe' })} 
    else if (usuario.estado === 'true') {
        console.log('USUARIO.ESTADO', usuario.estado)
        //genero token
        const token = jwt.sign({id: usuario.id, userName: usuario.usuario}, config.secretKey,{expiresIn: 84600}) 
        //extraigo id del usuario     
        const idUsuario = usuario.id
        //llamo a la funcion que envía el mail
        const mailSend = await conectionMail(req, res, usuario, token, idUsuario) 
        console.log('MAILSEND', mailSend)
        mailSend? res.status(200).send({token, idUsuario}): res.status(401).json({ message: 'No se pudo enviar el correo' })
        
     } else {res.status(402).json({ message: 'El usuario está desactivado' })}

  } catch (error) { console.log("Algo salio mal: ", error); 
  res.status(500).send({ message: 'Error interno del servidor' });
}
}


module.exports = {
    getUserByUsername
}
