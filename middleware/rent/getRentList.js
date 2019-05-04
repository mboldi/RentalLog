/**
 * getRentList
 * description
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const rentModel = requireOption(objectrepository, 'rentModel');

    return function (req, res, next) {
        rentModel.find({}, function (err, result) {
            if (typeof result === "undefined") {
                res.local = [];
            } else {
                res.local = result;
            }

            return next();
        });
    };
};