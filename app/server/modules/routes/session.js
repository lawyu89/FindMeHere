var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var encrypt = require('../encrypt');
var models = require('../models');
var User = models.User;