const express = require('express');
const router = express.Router();

const blockController = require('../controllers/blockController');

// Access  public
router.get('/sendmail');

module.exports = router;
