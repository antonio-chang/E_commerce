const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('morgan');
const EXPRESS_PORT = 4000;
const app = express();
const User = require('./Models/Users');
const cors = require('cors');
const flash = require('express-flash');


//Router
const usersRouter = require('./routes/users');
const chatRouter = require('./routes/chats');



const mongoose = require('mongoose');
const mongodb = ("mongodb+srv://admin:2560.web@cluster0.rtacl.mongodb.net/userInfo?retryWrites=true&w=majority");
mongoose.connect(mongodb , {useCreateIndex:true, useUnifiedTopology: true, useNewUrlParser: true});

mongoose.connection.on('connected', ()=> {
    console.log('MONGODB connected at port 27017');
});
 
// Create default admin
User.findOne({username: 'admin'}, (err, admin) => {
    if (err) {
        throw err;
    }
    if (!admin) {
        const newAdmin = new User ({
            username: 'admin',
            password: 'admin',
            role: 'Admin'
        });
        newAdmin.save((err) => {
            if (err) {
                throw err;
            }
        })
    }
});


// view engine setup
app.set('port', EXPRESS_PORT);
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(cors());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '1'
}));

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// Routers
app.use('/users', usersRouter);
app.use('/chat', chatRouter);


// catch 404 and forward to error handler
app.use(function(request, response, callback) {
    response.locals.user = request.user;
    callback();
});

// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

app.listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});
module.exports = app;
