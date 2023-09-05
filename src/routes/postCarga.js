const { Router } = require('express');
const {addManyUsuarios} = require('../controllers/Carga')
const router = Router();


router.post('/', addManyUsuarios);

module.exports = router;