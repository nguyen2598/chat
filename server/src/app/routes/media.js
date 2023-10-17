const express = require('express');
const router = express.Router();

const mediaController = require('../controllers/mediaController');

// Access  public
router.get('/sendmail');

module.exports = router;
