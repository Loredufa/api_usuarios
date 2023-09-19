const { Login } = require('../models/index');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require('../utils/config')


const conectionMail = async (req, res, usuario, token) => {
    try {
        verificationLink = `${config.urlReset}${token}`
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'cuyenreset@gmail.com',
                pass: config.mailPass
                }
            });
    
        const mailOptions = {
            from: `Cuyen <cuyenreset@gmail.com>`,
            to: usuario.email,
            subject: 'Tu contraseña de Cuyen',
            text: 'Hola '+ usuario.nombre + ', Te enviamos un link para que puedas generar una nueva contraseña ' + verificationLink
        }
        transporter.sendMail(mailOptions, (error) => {
            error? res.status(500).send(error.message): res.status(200).jsonp(req.body)
        })
        } catch (error) { console.log("Algo salio mal: ", error); 
            throw error; //lanzo el error
    }
}


const getUserByUsername = async (req, res) => {
  try {
    const user = req.body.usuario
    const usuario = await Login.findOne({
      where: {
        usuario: user
      }
    })

    if (usuario) {
        //genero token
        const token = jwt.sign({id: usuario.id, userName: usuario.usuario}, config.secretKey,{expiresIn: 84600})      
        const idUsuario = usuario.id
        const mailSend = conectionMail(req, res, usuario, token) 
        mailSend? res.status(200).send({token, idUsuario}): res.status(401).json({ message: 'No se pudo enviar el correo' })
        
     } else res.status(400).json({ message: 'El usuario no existe' })

  } catch (error) { console.log("Algo salio mal: ", error); 
    throw error; //lanzo el error
}
}


module.exports = {
    getUserByUsername
}
