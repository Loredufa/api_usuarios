const { Login } = require('../models/index');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require('../utils/config')

//Funcion para el envío del mail
const conectionMail = async (req, res, usuario, numeroAleatorio) => {
    try {
        //credenciales del correo emisor
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'cuyenreset@gmail.com',
                pass: config.mailPass
                }
            });
        //Armado del correo 
        const mailOptions = {
            from: `Cuyen <cuyenreset@gmail.com>`,
            to: usuario.email,
            subject: 'Tu contraseña de Cuyen',
            text: 'Hola '+ usuario.nombre + ', Te enviamos un código para que puedas generar una nueva contraseña CODIGO: ' + numeroAleatorio
        }
        transporter.sendMail(mailOptions, (error) => {
            error? res.status(500).send(false): res.status(200).send(true)
        })
        } catch (error) { console.log("Algo salio mal: ", error); 
           // throw error; //lanzo el error
    }
}


const getUserByUserapp = async (req, res) => {
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
        const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
        console.log(numeroAleatorio);
        const mailSend = conectionMail(req, res, usuario, token, numeroAleatorio) 
        mailSend? res.status(200).send({token, idUsuario, numeroAleatorio}): res.status(401).json({ message: 'No se pudo enviar el correo' })
        
     } else res.status(400).json({ message: 'El usuario no existe' })

  } catch (error) { console.log("Algo salio mal: ", error); 
    //throw error; //lanzo el error
}
}


module.exports = {
    getUserByUserapp
}
