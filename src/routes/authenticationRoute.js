const express = require('express');
const authenticationsHandler = require('../handlers/authenticationsHandler');

const router = express.Router();

router.post('/authentications', authenticationsHandler.postHandler);
router.put('/authentications', authenticationsHandler.putHandler);
router.delete('/authentications', authenticationsHandler.deleteHandler);

module.exports = router;
