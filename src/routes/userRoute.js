const express = require('express');
const userHandler = require('../handlers/userHandler');

const router = express.Router();

router.get('/users', userHandler.getHandler);
router.post('/users', userHandler.postHandler);

module.exports = router;
