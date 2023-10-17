const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');

// Access  public
router.get('/sendmail');

module.exports = router;
