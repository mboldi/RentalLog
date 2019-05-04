/**
 * checkUserLogin
 * description
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        res.local = {};

        if ((typeof req.query.email === 'undefined') ||
            (typeof req.query.password === 'undefined')) {
            return next();
        }

        userModel.findOne(
            {email: req.query.email},
            function (err, result) {
                if(err || !result) {
                    console.log("email not in database");
                    if(req.query.email !== "")
                        res.local.error = "Nincs ilyen email cím az adatbázisban, regisztráld be!";
                    else
                        res.local.error = "Nem adtál meg email címet!";
                    return next();
                }
                if(result.password === req.query.password) {
                    req.session.userid = result.id;
                    return res.redirect('/rent/list');
                }
                else {
                    console.log("Wrong password :(");
                    if(req.query.password === "")
                        res.local.error = "Nem adtál meg jelszót!";
                    else
                        res.local.error = "Hibás jelszó!";
                    return next();
                }
            }
        );
    };
};