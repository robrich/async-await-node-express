import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'async / await with Node & Express' });
});

export default router;
