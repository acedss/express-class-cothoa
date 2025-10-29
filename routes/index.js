var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Hau depzi', layout: 'layout' });
  console.log("Hello   index.js");
});

module.exports = router;
