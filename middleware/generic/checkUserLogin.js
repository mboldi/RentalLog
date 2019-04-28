/**
 * checkUserLogin
 * description
 */

const requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    const userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {


        return next();
    };
};