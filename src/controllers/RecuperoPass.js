const { Login } = require('../models/index');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


const conectionMail = async (req, res, usuario) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'cuyenreset@gmail.com',
                pass: 'bgenaelepmiagwpo'
                }
            });
    
        const mailOptions = {
            from: `Cuyen <cuyenreset@gmail.com>`,
            to: usuario.email,
            subject: 'Tu contraseña de Cuyen',
            text: 'Hola '+ usuario.nombre + ', Te enviamos tu contraseña para que puedas ingresar a nuestra aplicacion.... Contraseña: ' + usuario.password
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

        const mailSend = conectionMail(req, res, usuario) 
        mailSend? res.status(200).json({ message: 'Mail enviado' }): res.status(401).json({ message: 'No se pudo enviar el correo' })
        
     } else res.status(400).json({ message: 'El usuario no existe' })

  } catch (error) { console.log("Algo salio mal: ", error); 
    throw error; //lanzo el error
}
}


module.exports = {
    getUserByUsername
}

    // //genero el token
   // const token = jwt.sign({id: usuario.id, userName: usuario.usuario}, config.jwtSecret,{expiresIn: '10m'});
    // //link que se debe enviar al usuario para el reseteo del password
    // verificationLink = `http://localhost:4002/${token}`
    // usuario.resetToken = token
    // console.log('SOY RESETTOKEN ', usuario)