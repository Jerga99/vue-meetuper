const express = require('express');
const router = express.Router();

const CategoriesCtrl = require('../controllers/categories');

router.get('', CategoriesCtrl.getCategories);

module.exports = router;
