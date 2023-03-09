const express = require('express');
const authenticationsHandler = require('../handlers/authenticationsHandler');

const router = express.Router();

router.post('/authentications', authenticationsHandler.postHandler);

module.exports = router;
