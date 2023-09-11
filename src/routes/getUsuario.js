const { Router } = require('express');
const {getAllUsuario, addUsuario, getUsuarioById, putUsuario, deleteUsuario, getUsuarioByLogin} = require('../controllers/Usuarios')
const verifyToken = require('../utils/middlewares/verifyToken');
const router = Router();

router.get('/', getAllUsuario)
router.get('/:id', getUsuarioById)
router.post('/', addUsuario)
router.put('/:id', putUsuario);
router.delete('/:id', deleteUsuario);
router.get('/:usuario/:password', getUsuarioByLogin);

module.exports = router;