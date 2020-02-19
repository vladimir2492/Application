const express = require('express');
const dbSetup = require('./setup/db-setup');
dbSetup.setupDB('appnew');


const usersController = require('./controllers/users-controller')
const aufController = require('./controllers/auth-controller');
const restController = require('./controllers/rest-controller');
const reviewController = require('./controllers/review-controller');

const app = express();
const serverSetup = require('./setup/server-setup');
const bodyParser = require('body-parser');

serverSetup(app);


app.use('/restaurants', restController);
app.use('/reviews', reviewController);
app.use('/users', usersController);
app.use('/', aufController);

const server = app.listen(8080, function () {
   const port = server.address().port
   console.log("Example app listening at http://localhost:8080")
})

module.exports = app;
