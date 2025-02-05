var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');


var app = express();


app.set('view engine', 'ejs')
dbURI = 'mongodb+srv://mojtaba:13811121@network-eng.oayd0.mongodb.net/?retryWrites=true&w=majority&appName=network-eng'

mongoose.connect(dbURI)
    .then((result) => {
        console.log('Connected')
        app.listen(3000)
    })
    .catch((err) => console.log(err))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
