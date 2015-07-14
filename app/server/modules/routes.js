var express = require('express');
var app = express();

// Load Express Configuration
require('./expressConfig')(app, express);

// Root route
app.get('/', function(req, res){
  res.sendFile('index.html', {root: app.settings.views});
});

//require('./routes/user')(app); //user routes
//require('./routes/session')(app); // session routes, mostly for authentication

module.exports = app;