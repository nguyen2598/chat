const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

// Access  public
router.get('/sendmail');

module.exports = router;
