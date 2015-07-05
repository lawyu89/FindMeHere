var express = require('express'),
    passport = require('passport'),
    FacebookStrategu = require('passport-facebook').Strategy,
    GoogleStrategy - require('passport-google').Strategy,
    config = require('./oauth.js'),
    mongoose = require('mongoose');

var app = express();
app.configure(function(){
  app.set('port', config.app.port)
})

app.listen(8080)