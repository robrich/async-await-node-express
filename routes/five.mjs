import express from 'express';

import Work from '../services/work.mjs';

patchRouter();
const router = express.Router();
export default router;

const work = new Work();

// This works great, but patching the router is hairy

router.get('/a', async function(req, res) {
  await work.resolves();
  res.render('results', {message: 'it worked'});
});

router.get('/b', async function(req, res) {
  await work.rejects();
  res.render('results', {message: 'it handles rejected promises'});
});

router.get('/c', async function(req, res) {
  await work.throws();
  res.render('results', {message: 'it handles rejected promises'});
});

router.get('/d', function(req, res, next) {
  req.syncMiddleware = true;
  next();
});

router.get('/d', function(req, res) {
  res.render('results', {message: 'it handles sync, and hit the middeware: '+req.syncMiddleware});
});

function patchRouter() {
  express.__orig_Router = express.__orig_Router || express.Router;
  express.Router = function () {
    const router = express.__orig_Router();
    patchit(router, 'get');
    patchit(router, 'post');
    /* ...
    make sure you get them all:
    router.head
    router.options
    router.use
    router.all
    router.param
    // see https://github.com/jshttp/methods/blob/master/index.js
    */
    return router;
  };
}
function patchit(router, method) {
  const origMethod = router[method];
  router['__orig_'+method] = origMethod;
  router[method] = function (path, ...fns) {
    const wrapped = fns.map(wrapit);
    origMethod.call(router, path, ...wrapped);
  };
}
function wrapit(func) {
  return function(req, res, next) {
    Promise.resolve(func(req, res, next)).catch(next);
  };
}
