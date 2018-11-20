const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

mongoose.Promise = global.Promise;
const ENV = require('./ENV');
mongoose.connect(ENV.CONNECTION_STRING,  { useNewUrlParser: true })
    .then(() => console.log("You are Connected :p"))
    .catch(() => console.log("Opsss ! Somthing happned :("));

// Dummy Data !


const fixtures = require('pow-mongodb-fixtures').connect('timeTracking', {
    host: '127.0.0.1',
    port: 27017
});

const data = require('./data');
fixtures.clearAndLoad(data, function(err) {
    if(err){
        console.error(err);
    }else{
        console.log("Dummy Data Added x)")
    }
});


// MiddleWare

app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// Routes

app.use('/', require('./routes/index'));
app.use('/api/auth', require('./routes/api/auth'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Start The Server

const port = process.env.PORT || '5000';
app.listen(port);
console.log('Server Listning at ' + port);