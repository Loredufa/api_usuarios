const { Router } = require('express');
const router = Router();
//const verifyToken = require('../utils/middlewares/verifyToken');

const viajeRoute = require('./getUsuario');
const resetRoute = require('./resetPassword');
const resetRouteApp = require('./resetApp');


router.use('/usuarios', viajeRoute)
//router.use('/reset', verifyToken, resetRoute)
//router.use('/resetapp', verifyToken, resetRouteApp)


module.exports = router;