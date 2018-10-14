import express from 'express';

import Work from '../services/work.mjs';

const router = express.Router();
export default router;

const work = new Work();

// NEVER DO THIS !!!
router.get('/a', async function(req, res) {
  await work.resolves();
  res.send('it worked');
});

// Because this will fail !!!
router.get('/b', async function(req, res) {
  await work.rejects();
  // we never get here
  res.send('it handles rejected promises');
});

// Because this will fail too !!!
router.get('/c', async function(req, res) {
  await work.throws();
  // we never get here
  res.send('it handles exceptions');
});
