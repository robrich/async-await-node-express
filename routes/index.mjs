import express from 'express';

const router = express.Router();
export default router;

router.get('/', function(req, res) {
  res.render('index', { title: 'async / await with Node & Express' });
});
router.get('/one', function(req, res) {
  res.render('one');
});
router.get('/two', function(req, res) {
  res.render('two');
});
router.get('/three', function(req, res) {
  res.render('three');
});
router.get('/four', function(req, res) {
  res.render('four');
});
router.get('/five', function(req, res) {
  res.render('five');
});
