const { Router } = require('express');
const {getAllbyContract, addPasajero, putPessenger, getAllPasajeros, verifyPessegerToApp, deletePasajero, getRelationByIdLogin} = require('../controllers/Pasajeros')


const router = Router();

router.get('/', getAllPasajeros)
router.get('/:num', getAllbyContract)
router.get('/verify/:dni/:num', verifyPessegerToApp)
router.get('/relation/:loginId', getRelationByIdLogin)

router.post('/', addPasajero);
router.put('/:id', putPessenger);
router.delete('/:id', deletePasajero);



module.exports = router;