import express from 'express';

import Work from '../services/work.mjs';

const router = express.Router();
export default router;

const work = new Work();

// This works, but there's a lot of duplication

router.get('/a', async function(req, res, next) {
  try {
    await work.resolves();
    res.send('it worked');
  } catch (err) {
    next(err);
  }
});

router.get('/b', async function(req, res, next) {
  try {
    await work.rejects();
    res.send('it handles rejected promises');
  } catch (err) {
    next(err);
  }
});

router.get('/c', async function(req, res, next) {
  try {
    await work.throws();
    res.send('it handles rejected promises');
  } catch (err) {
    next(err);
  }
});
