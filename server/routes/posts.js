const express = require('express');
const router = express.Router();

const PostsCtrl = require('../controllers/posts');

router.get('', PostsCtrl.getPosts);

module.exports = router;
