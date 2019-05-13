/**
 * deleteDevice
 * description
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {
        if(typeof res.local === 'undefined') {
            return next();
        }
        else {
            res.local.deleted = true;
            res.local.save();
            next();
        }
    };
};