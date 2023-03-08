const express = require('express');
const homeHandler = require('../handlers/homeHandler');

const router = express.Router();

router.get('/', homeHandler.getHandler);

module.exports = router;
