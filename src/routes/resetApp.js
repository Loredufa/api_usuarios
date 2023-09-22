const { Router } = require('express');
const {getUserByUserapp} = require('../controllers/RecupPassApp')
const router = Router();



router.post('/', getUserByUserapp);

module.exports = router;