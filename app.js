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

sequelize.sync().then(() => {
  app.listen(3001);
});
console.log('Project running on localhost:3001');