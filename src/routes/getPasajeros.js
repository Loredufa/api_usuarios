const { Router } = require('express');
const {getAllbyContract, addPasajero, putPessenger, getAllPasajeros} = require('../controllers/Pasajeros')


const router = Router();

router.get('/', getAllPasajeros)
router.get('/:num', getAllbyContract)
router.post('/', addPasajero);
router.put('/:id', putPessenger)



module.exports = router;