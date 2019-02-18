const express = require('express');
const router = express.Router();

const UsersCtrl = require('../controllers/users');

router.get('', UsersCtrl.getUsers);

router.post('/register', UsersCtrl.register)

module.exports = router;
