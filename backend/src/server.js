const express = require('express');
const dbSetup = require('./setup/db-setup');
dbSetup.setupDB('app');

const productsController = require('./controllers/products-controller');
const usersController = require('./controllers/users-controller')
const aufController = require('./controllers/auth-controller');
const app = express();
const serverSetup = require('./setup/server-setup');
const bodyParser = require('body-parser');

serverSetup(app);

app.use('/products', productsController);
app.use('/users', usersController);
app.use('/', aufController);


const server = app.listen(8080, function () {
   const port = server.address().port
   console.log("Example app listening at http://localhost:8080")
})

module.exports = app;
