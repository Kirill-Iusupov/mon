const express = require('express');

const router = express.Router();

const UserController = require('./userController');

router.post('/login/:is_staff', UserController.login);
router.post('/check', UserController.check);
router.post('/logout', UserController.logout);

module.exports = router;
