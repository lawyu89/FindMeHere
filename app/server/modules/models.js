var Sequelize = require('sequelize');

// We're using sqlite for this demo app, so the username and password don't really
// matter, anything works. Other databases such as postgresql could be used here instead.
// see: http://sequelizejs.com/docs/1.7.8/usage#basics
// for more information on how this can be configured.
var sequelize = new Sequelize('note_wrangler', 'username', 'password', {
  dialect: "postgresql",
  port:    3306,
  storage: './database.sqlite' // Local to where app.js is running from
});

var User = sequelize.import(__dirname + "/models/user");