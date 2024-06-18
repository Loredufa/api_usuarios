const { Router } = require('express');
const {getAllFinancing, getAllFinancingbyId, addFinancing, getFinancingByContract, putFinancing, deleteFinancing, putRelacionFinancing} = require('../controllers/Financiación')

const router = Router();

router.get('/', getAllFinancing)
router.get('/:id', getAllFinancingbyId)
router.get('/contract/:num', getFinancingByContract)

router.put('/:id', putFinancing);
router.put('/relaction/:num', putRelacionFinancing);
router.post('/', addFinancing);
router.delete('/:id', deleteFinancing);



module.exports = router;