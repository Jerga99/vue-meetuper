const express = require('express');
const router = express.Router();

const ThreadsCtrl = require('../controllers/threads');

router.get('', ThreadsCtrl.getThreads);

module.exports = router;
