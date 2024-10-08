const { Router } = require('express');
const {getAllbyContract, getRelationBycontract, addPasajero, putPessenger, putPessengerGral, getAllPasajeros, verifyPessegerToApp, getPassengerById, deletePasajero, getRelationByIdLogin} = require('../controllers/Pasajeros')


const router = Router();

router.get('/', getAllPasajeros)
router.get('/:num', getAllbyContract)
router.get('/verify/:dni/:num/:id', verifyPessegerToApp)
router.get('/relation/:loginId', getRelationByIdLogin)
router.get('/relationbyNum/:loginId/:num', getRelationBycontract)
router.get('/byid/:id', getPassengerById)

router.post('/', addPasajero);
router.put('/:id', putPessenger);
router.put('/datos/:id', putPessengerGral); //Se utiliza para modificar el presente en el viaje
router.delete('/:id', deletePasajero);



module.exports = router;