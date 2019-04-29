/**
 * checkUserLogin
 * description
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        if ((typeof req.query.email === 'undefined') ||
            (typeof req.query.password === 'undefined')) {
            return next();
        }

        userModel.findOne(
            {email: req.query.email},
            function (err, result) {
                if(err || !result) {
                    console.log("email not in database");
                    return res.redirect('/login');
                }

                if(result.password === req.query.password) {
                    req.session.userid = result.id;
                    return res.redirect('/rent/list');
                }
                else {
                    console.log("Wrong password :(");
                    return res.redirect('/login')
                }
            }
        );
    };
};