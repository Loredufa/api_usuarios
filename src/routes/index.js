const { Router } = require('express');
const router = Router();
const verifyToken = require('../utils/middlewares/verifyToken');

const viajeRoute = require('./getUsuario');
const resetRoute = require('./resetPassword');


router.use('/usuarios', verifyToken, viajeRoute)
router.use('/reset', verifyToken, resetRoute)


module.exports = router;