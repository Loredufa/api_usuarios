const jwt = require('jsonwebtoken');
const secretKey = '1234567890'; // Debes usar una clave secreta segura en producción

// Middleware para verificar el token

const verifyToken = (req, res, next) => { 
    const token = req.headers['x-access-token'];    
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
    console.log("Soy el tocken ", token)
    console.log("Soy secretKey", secretKey)
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token no válido' });
        }
        // El token es válido
        req.userId = decoded.userId; // Puedes almacenar información del usuario en el objeto de solicitud si es necesario
        console.log(req.userId)
        next();
    });
}


module.exports = verifyToken;
