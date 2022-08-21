const userService = require('../Services/userService');

exports.authorize = (req, res) => {
    userService.authorize(req.body, (err, user, message) => {
        if (err) {
            res.status(401).send(err);
        } else if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send(message);
        }
    });
};

exports.signup = (req, res) => {
    userService.signup(req.body, (err, user) => {
        if (err) {
            res.status(401).send(err);
        } else if (!user) {
            res.status(401).json({message: 'User already exists!'})
        } else {
            res.status(200).send(user);
        }
    });
};

