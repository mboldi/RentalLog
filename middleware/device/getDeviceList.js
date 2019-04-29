/**
 * getDeviceList
 * description
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectrepository, filter) {

    const deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {

        deviceModel.find(function (err, result) {
            if(typeof result === 'undefined')
                res.local = [];
            else
                res.local = result;

            return next();
        });

    };
};