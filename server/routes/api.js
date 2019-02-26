const express = require('express');
const router = express.Router();

const ApiCtrl = require('../controllers/api');

router.get('', ApiCtrl.getMeta);

module.exports = router;
