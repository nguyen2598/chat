const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

// Access  public
router.get('/sendmail');

module.exports = router;
