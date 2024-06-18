const { Router } = require('express');
const router = Router();
const verifyToken = require('../utils/middlewares/verifyToken');

const viajeRoute = require('./getUsuario');
const resetRoute = require('./resetPassword');
const resetRouteApp = require('./resetApp');
const passengerRoute = require('./getPasajeros');
const CuotasRoute = require('./getCuotas');
const ColegiosRoute = require('./getColegios');
const FinanciacionRoute = require('./getFinanciacion');


router.use('/usuarios', viajeRoute)
router.use('/reset', verifyToken, resetRoute)
router.use('/resetapp', verifyToken, resetRouteApp)
router.use('/pasajero', verifyToken, passengerRoute)
router.use('/cuotas', verifyToken, CuotasRoute)
router.use('/colegios', verifyToken, ColegiosRoute)
router.use('/financiacion', verifyToken, FinanciacionRoute)


module.exports = router;