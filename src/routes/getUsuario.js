const { Router } = require('express');
const {getAllUsuario, addUsuario, getUsuarioById, getAllCoordinadores, putUsuario, deleteUsuario, getUsuarioByLogin, putUsuarioMod, verifyUsuario} = require('../controllers/Usuarios')
const verifyToken = require('../utils/middlewares/verifyToken');

const router = Router();

router.get('/', verifyToken, getAllUsuario)
router.get('/coordinador', verifyToken, getAllCoordinadores)
router.get('/:id',verifyToken, getUsuarioById)
router.get('/verify/:dni',verifyToken, verifyUsuario)
router.post('/', verifyToken, addUsuario);
router.put('/', verifyToken, putUsuario);
router.put('/:id', verifyToken, putUsuarioMod);
router.delete('/:id', verifyToken, deleteUsuario);
router.get('/:usuario/:password', verifyToken, getUsuarioByLogin);



module.exports = router;