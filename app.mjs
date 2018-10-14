import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sassMiddleware from 'node-sass-middleware';

import indexRouter from './routes/index.mjs';
import oneRouter from './routes/one.mjs';
import twoRouter from './routes/two.mjs';

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
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(dirname, 'public'),
  dest: path.join(dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(dirname, 'public')));

app.use('/', indexRouter);
app.use('/one', oneRouter);
app.use('/two', twoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler: must have 4 parameters
app.use(function(err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = (err && err.message ? err.message : err) || 'error';
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
