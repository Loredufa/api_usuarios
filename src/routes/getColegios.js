const { Router } = require('express');
const router = Router();
const verifyToken = require('../utils/middlewares/verifyToken');
const {getAllSchools, verifySchoolContract} = require('../controllers/Colegios')



router.get('/', verifyToken, getAllSchools);
router.post('/verify', verifyToken, verifySchoolContract);

module.exports = router;