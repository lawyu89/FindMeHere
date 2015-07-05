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
app.set('views', __dirname + '/public/views');
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.use(passport.initialize());
app.use(passport.session());

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
app.get('/', function(req,res){
  res.render('index.html')
})

app.get('/auth/facebook', passport.authenticate('facebook'),
  function(req, res){
})

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});





app.listen(8080);
console.log("Listening on port 8080");
