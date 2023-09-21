const { Router } = require('express');
const {getAllUsuario, addUsuario, getUsuarioById, putUsuario, deleteUsuario, getUsuarioByLogin} = require('../controllers/Usuarios')
//const verifyRoleAdministrador = require('../controllers/role/VerifyRoleAdministrador');
const verifyToken = require('../utils/middlewares/verifyToken');
const router = Router();

router.get('/', getAllUsuario)
router.get('/:id',verifyToken, getUsuarioById)
router.post('/', verifyToken, addUsuario)
router.put('/', verifyToken, putUsuario);
router.delete('/:id', verifyToken, deleteUsuario);
router.get('/:usuario/:password', verifyToken, getUsuarioByLogin);

module.exports = router;