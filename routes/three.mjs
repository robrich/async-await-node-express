import express from 'express';

import Work from '../services/work.mjs';

const router = express.Router();
export default router;

const work = new Work();

// make sure you call wrapit, it's easy to miss

function wrapit(func) {
  return function(req, res, next) {
    func(req, res)
      .catch(next);
  };
}
//const wrapit = func => (req, res, next) => func(req, res).catch(next);

router.get('/a', wrapit(async function(req, res) {
  await work.resolves();
  res.render('results', {message: 'it works'});
}));

router.get('/b', wrapit(async function(req, res) {
  await work.rejects();
  res.render('results', {message: 'it handles rejected promises'});
}));

router.get('/c', wrapit(async function(req, res) {
  await work.throws();
  res.render('results', {message: 'it handles rejected promises'});
}));

router.get('/d', async function(req, res) {
  await work.throws();
  res.render('results', {message: 'oops, forgot to wrap this one'});
});
