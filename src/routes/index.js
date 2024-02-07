const { Router } = require('express');
const router = Router();
const verifyToken = require('../utils/middlewares/verifyToken');

const viajeRoute = require('./getUsuario');
const resetRoute = require('./resetPassword');
const resetRouteApp = require('./resetApp');
const passengerRoute = require('./getPasajeros');
const CuotasRoute = require('./getCuotas');


router.use('/usuarios', viajeRoute)
router.use('/reset', verifyToken, resetRoute)
router.use('/resetapp', verifyToken, resetRouteApp)
router.use('/pasajero', verifyToken, passengerRoute)
router.use('/cuotas', verifyToken, CuotasRoute)


module.exports = router;