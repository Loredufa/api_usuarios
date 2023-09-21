const { Router } = require('express');
const {getUserByUsername} = require('../controllers/RecuperoPass')
const router = Router();


router.post('/', getUserByUsername);

module.exports = router;