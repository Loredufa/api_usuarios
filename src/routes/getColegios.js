const { Router } = require('express');
const router = Router();
const verifyToken = require('../utils/middlewares/verifyToken');
const {getAllSchools} = require('../controllers/Colegios')



router.get('/', verifyToken, getAllSchools);

module.exports = router;