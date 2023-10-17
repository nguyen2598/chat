const express = require('express');
const router = express.Router();

const followController = require('../controllers/followController');

// Access  public
router.get('/sendmail');

module.exports = router;
