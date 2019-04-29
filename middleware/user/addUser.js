/**
 * addUser
 * description
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        let newUser = new userModel();

        if ((typeof req.query.email === 'undefined') ||
            (typeof req.query.password === 'undefined') ||
            (typeof req.query.name === 'undefined')) {
            return next();
        }

        userModel.findOne({
            email: req.query.email
        }, function (err, result) {

            if ((err) || (result !== null)) {
                console.log('Your e-mail address is already registered.');
                return res.redirect('/register');
            }

            newUser.name = req.query.name;
            newUser.email = req.query.email;
            newUser.password = req.query.password;

            newUser.save(function(err) {
                console.log("successful :D");
                return res.redirect('/login');
            });
        });
    };
};