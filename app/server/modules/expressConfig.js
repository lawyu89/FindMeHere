var passport = require('passport');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');

module.exports = function(app, express) {
  app.use("/", express.static("app/"));
  app.set('views', __dirname + '/../views');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Setup cookie sessions
  app.use(cookieParser());
  app.use(cookieSession({secret: 'secret'}));

  // Add CSRF token to requests to secure ajax requests
  app.use(csrf());

  app.set('view engine', 'ejs'); // Set the template engine to ejs

  // This is a little custom middleware which adds the csrf token to local variables
  // which can be used used within ejs template forms by doing something like:
  // <form>
  //   <input type="hidden", name="_csrf", value='<%-csrfToken%>'>
  //   ... other inputs and submit buttons
  // </form>
  //
  // Setting the: res.cookie('XSRF-TOKEN', req.csrfToken()); is for angularJS
  // AngularJs looks for this cookie, and if it exists it sends it along with each
  // ajax request made with the $http service.
  app.use(function(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
  });

  // Initialize passport middleware for user authentication
  app.use(passport.initialize());
  app.use(passport.session());
}