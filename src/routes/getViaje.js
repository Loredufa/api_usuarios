const { Router } = require('express');
const {getAllUsuario, addUsuario, getUsuarioById, putUsuario, deleteUsuario} = require('../controllers/Usuarios')
const router = Router();

router.get('/', getAllUsuario)
router.get('/:id', getUsuarioById)
router.post('/', addUsuario)
router.put('/:id', putUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;