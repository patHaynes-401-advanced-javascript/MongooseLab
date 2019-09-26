const express = require('express');
const app = express();

// middleware
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');

// request logging
app.use(morgan('dev'));

// body parser
app.use(express.json());

// static file server (public)
app.use(express.static('public'));

// test route
app.get('/hello', (req, res) => {
  res.send('hello express');
});

// check connection - returns error if no db connection
app.use(checkConnection);

// API ROUTES
const dogs = require('./routes/dogs');
app.use('/api/dogs', dogs);

// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);
// using express default 404 for non-api routes

//ERRORS


module.exports = app;