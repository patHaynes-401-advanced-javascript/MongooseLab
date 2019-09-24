require('dotenv').config();
require('./lib/connect')();
const express = require('express');
const app = express();
const Dog = require('./lib/models/dog');

app.use(express.json());