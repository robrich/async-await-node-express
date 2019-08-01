import express from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import path from 'path';

import indexRouter from './routes/index.mjs';
import oneRouter from './routes/one.mjs';
import twoRouter from './routes/two.mjs';
import threeRouter from './routes/three.mjs';
import fourRouter from './routes/four.mjs';
//import fiveRouter from './routes/five.mjs';
// FRAGILE: can only use four or five as both monkey-patch `express.Router`

// compensate for no __dirname, https://stackoverflow.com/a/50052194/702931
let dirname = path.dirname(decodeURI(new URL(import.meta.url).pathname));
// and hack it 'cause windows
dirname = path.normalize(dirname);
if (dirname[0] === '\\') {
  dirname = dirname.substring(1);
}

export const app = express();

// view engine setup
app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(dirname, 'public')));

app.use('/', indexRouter);
app.use('/one', oneRouter);
app.use('/two', twoRouter);
app.use('/three', threeRouter);
app.use('/four', fourRouter);
//app.use('/five', fiveRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  /*eslint no-unused-vars:0 */
  // because express error handler: must have 4 parameters

  if (typeof err !== 'object') {
    err = {
      message: err
    };
  }

  // ASSUME: err.message doesn't expose internals
  res.locals.message = err.message || 'error';

  // only leak details in development
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', {title: 'Error'});
});
