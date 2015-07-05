var express = require('express'),

    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google').Strategy,
    config = require('./oauth.js'),
    mongoose = require('mongoose');

var app = express();

//setup MongoDB database for users
mongoose.connect('mongodb://localhost/FindMeHere')

var User = mongoose.model('User', {
  oauthID: Number,
  name: String
})

//serial and deserialize users
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//app configuration
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

//passport oauth configuration
passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
      return done(null, profile);
    });
  }
));

//setup routes






app.listen(8080);
console.log("Listening on port 8080");
