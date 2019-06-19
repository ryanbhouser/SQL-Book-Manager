const express = require('express');
const app = express();
const { sequelize } = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

const mainRoute = require('./routes/index');
const bookRoute = require('./routes/books');

app.use('/', mainRoute);
app.use('/books', bookRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use((req, res, next) => {
  const error = new Error('Not found');
  next(error);
});

app.use((error, req, res, next) => {
  res.locals.error = error;
  error.status = 404;
  error.message = 'Sorry, that page does not exist!';
  res.status(error.status);
  console.log(error.message);
  res.render('error', error);
});

sequelize.sync().then(() => {
  app.listen(3001);
});
console.log('Project running on localhost:3001');
