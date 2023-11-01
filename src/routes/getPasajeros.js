const { Router } = require('express');
const {getAllbyContract, addPasajero} = require('../controllers/Pasajeros')


const router = Router();


router.get('/:num', getAllbyContract)
router.post('/', addPasajero);



module.exports = router;