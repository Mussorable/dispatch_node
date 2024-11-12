require('dotenv').config();

const http = require('http');
const express = require('express');
const app = express();
const db = require('./util/database');
const bodyParser = require('body-parser');

db.execute('SELECT * FROM users')
  .then(result => {
    console.log(result[0]);
  })
  .catch(err => {
    console.log(err);
  });

const server = http.createServer(app);
server.listen(3000);