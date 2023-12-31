const { Router } = require('express');
const {getAllUsuario, addUsuario, getUsuarioById, putUsuario, deleteUsuario, getUsuarioByLogin, putUsuarioMod} = require('../controllers/Usuarios')
const verifyToken = require('../utils/middlewares/verifyToken');

const router = Router();

router.get('/', verifyToken, getAllUsuario)
router.get('/:id',verifyToken, getUsuarioById)
router.post('/', verifyToken, addUsuario);
router.put('/', verifyToken, putUsuario);
router.put('/:id', verifyToken, putUsuarioMod);
router.delete('/:id', verifyToken, deleteUsuario);
router.get('/:usuario/:password', verifyToken, getUsuarioByLogin);



module.exports = router;