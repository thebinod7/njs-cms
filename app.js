const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const config = require('./config/database');
//mongoose.Promise = global.Promise;
mongoose.connect(config.database);

mongoose.connection.on('connected',function () {
    console.log('Connected to database:' + config.database);
});

mongoose.connection.on('error',function (err) {
    console.log('Database error:' + ' ' + err);
});

const app = express();

const apiCategory = require('./routes/category');
const port = 4242;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Body parser middleware
// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(session({secret: 'helloworld12345678', resave:false, saveUninitialized:false, cookie: { maxAge: 600000 }}));
app.use(flash());
app.use(bodyParser.json());

// ROUTES FOR OUR API
app.use('/', require('./routes'));
app.use('/category',apiCategory);
app.use(express.static(path.join(__dirname,'public')));

//Start server
app.listen(port,function () {
    console.log('Server running at port:' + port);
});