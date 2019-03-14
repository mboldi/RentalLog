var requireOption = require('../common').requireOption;

/**
 * mainRedirect
 * description
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };
};