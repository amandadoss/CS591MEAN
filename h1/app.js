const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')

//HOMEWORK ROUTES
//var index = require('./routes/index')
//var hw = require('./routes/hw1')
//var hw2 = require('./routes/hw2')

var home = require('./routes/api')
var auth = require('./routes/authTwitter')

//flash is used with passport to pop up messages
const flash = require('connect-flash')
//and flash requires session. We'll also want passport-session.








var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Pass anything other than mounted routes to Angular
app.use(session({ secret: 'this is not a secret' }));
app.use(passport.initialize());
app.use(passport.session());




//app.use('/hw1', hw);
//app.use('/hw2', hw2);


app.use('/api', home);
app.use('/auth', auth);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
