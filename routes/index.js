var express = require('express');
var router = express.Router();
var db = require('../bin/db-controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/stat', function(req, res, next) {
  res.render('stat', { title: 'Express' });
});
router.get('/trend', function(req, res, next) {
  res.render('trend', { title: 'Express' });
});

module.exports = router;
router.post('/data', db.getTweet);
router.get('/nycdata', db.getNYCTweet);