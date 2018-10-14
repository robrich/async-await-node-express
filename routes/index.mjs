import express from 'express';

const router = express.Router();
export default router;

router.get('/', function(req, res) {
  res.render('index', { title: 'async / await with Node & Express' });
});
