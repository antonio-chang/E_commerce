const User = require('../Models/Users');
const config = require('../config');

exports.authorize = ({username, password}, callback) => {
    User.findOne({username: username}, (err, user) => {
        if (err) {
            return callback(err);
        }
        if (!user) {
            return callback(null, false, {message: 'username ' + username + ' not found'});
        }
        user.verifyPassword(password, function (err, result) {
            if (result) {
                // const token = jwt.sign({sub: user._id, role: user.role}, config.secret);
                const newUser = {
                    username: user.username,
                    password: user.password,
                };
                return callback(null, newUser);
            } else {
                return callback(null, false, {message: 'Invaild username and password'});
            }
        })
    })
};



exports.signup = (user, callback) => {
    User.findOne({username: user.username}, (err, exist) => {
        if (err) {
            return callback(err);
        }
        if (exist) {
            return callback(null, null)
        }

        const newUser = new User({
            username: user.username,
            password: user.password,
            email: user.email
        });

        newUser.save((err) => {
            if (err) {
                return callback(err);
            }
            return callback(null, newUser);
        });
    });
};
