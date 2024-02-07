const { Router } = require('express');
const {getAllFees, getFeeById, getCuotaByPessenger, putCuota, deleteCuota, getStatusCuota, addCuota} = require('../controllers/Cuotas')


const router = Router();

router.get('/', getAllFees)
router.get('/:id', getFeeById)
router.get('/allfee/:num/:num_pass', getCuotaByPessenger)
router.get('/statusfee/:num/:num_pass', getStatusCuota)

router.put('/:id', putCuota);
router.post('/', addCuota);
router.delete('/:id', deleteCuota);



module.exports = router;