const express = require('express');

const router = express.Router();

const RegisterController = require('./registerController');

router.post('/challenger', RegisterController.challenger);
// router.post('/admin', RegisterController.admin);

module.exports = router;
