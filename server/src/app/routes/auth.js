const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Check  xem users login chuwa
// Access  public
router.post('/sendmail', authController.sendMail);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
