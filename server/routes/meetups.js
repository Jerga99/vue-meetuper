const express = require('express');
const router = express.Router();

const MeetupsCtrl = require('../controllers/meetups');

router.get('', MeetupsCtrl.getMeetups);
router.get('/:id', MeetupsCtrl.getMeetupById);

module.exports = router;
