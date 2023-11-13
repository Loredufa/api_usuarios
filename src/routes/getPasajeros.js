const { Router } = require('express');
const {getAllbyContract, addPasajero, putPessenger} = require('../controllers/Pasajeros')


const router = Router();


router.get('/:num', getAllbyContract)
router.post('/', addPasajero);
router.put('/:id', putPessenger)



module.exports = router;