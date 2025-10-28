var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
console.log("Starting the app...");

var db = require("./db");
db.connectDB();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var categoryRouter = require('./routes/category')
var productRouter = require('./routes/product')

app.listen(4000); // Start listening on port 4000
console.log("Server is running on http://localhost:4000");


var session = require("express-session")

const timeout = 10000 * 60 * 24;




app.use(session({
  secret: "secret_key",
  saveUninitialized: false,
  cookie: { maxAge: timeout },
  resave: false
}))


app.use((req, res, next) => {
  res.locals.username = req.session.username;
  next();
});

app.use('/', indexRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/auth', authRouter);



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
