const { Router } = require('express');
const axios = require ('axios');
const router = Router();

const viajeRoute = require('./getViaje');


router.use('/usuarios', viajeRoute)


module.exports = router;