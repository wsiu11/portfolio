// Student name: wsiu11
// Student ID: 301272297
// Filename: server.js
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');

var app = express();
app.listen(8081);
module.exports = app;

console.log('Server running at http://localhost:8081/');