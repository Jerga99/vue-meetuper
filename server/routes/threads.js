const express = require('express');
const router = express.Router();

const ThreadsCtrl = require('../controllers/threads');
const AuthCtrl = require('../controllers/auth');

router.get('', ThreadsCtrl.getThreads);
router.post('', AuthCtrl.onlyAuthUser, ThreadsCtrl.createThread);

module.exports = router;
