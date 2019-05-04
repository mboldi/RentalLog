/**
 * sendUserPassw
 * description
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        res.local = {};

        if(typeof req.query.email !== 'undefined') {
            userModel.findOne(
                {email: req.query.email},
                function (err, result) {
                    if(!result) {
                        if(req.query.email !== "")
                            res.local.error = "Nincs ilyen email cím az adatbázisban, regisztráld be!";
                    }
                    else {
                        res.local.pw = result.password;
                    }
                    return next();
                }
            )
        }
        else {
            return next();
        }

    };
};