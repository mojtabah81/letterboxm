var express = require('express');
var router = express.Router();
const { getHomePageContent } = require('../controllers/homeController');

/* GET home page. */
router.get('/', getHomePageContent);

module.exports = router;
