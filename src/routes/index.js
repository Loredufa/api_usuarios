const { Router } = require('express');
const axios = require ('axios');
const router = Router();

const viajeRoute = require('./getViaje');
const cargaRoute =require('./postCarga');


router.use('/usuarios', viajeRoute)
router.use('/carga', cargaRoute)





module.exports = router;