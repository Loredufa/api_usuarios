const { Router } = require('express');
const {getUserByUsername} = require('../controllers/RecuperoPass')
const router = Router();


router.get('/', getUserByUsername);

module.exports = router;