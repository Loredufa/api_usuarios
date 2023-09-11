const { Router } = require('express');
const axios = require ('axios');
const router = Router();
const verifyToken = require('../utils/middlewares/verifyToken');

const viajeRoute = require('./getUsuario');
const cargaRoute = require('./postCarga');


router.use('/usuarios', verifyToken, viajeRoute)
router.use('/carga', verifyToken, cargaRoute)


module.exports = router;