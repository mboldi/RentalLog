/**
 * getDevice
 * description
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {
        deviceModel.findOne(
            {_id: req.params.id},
            function (err, result) {
                if(typeof result === 'undefined') {
                    res.local = {};
                }
                else {
                    res.local = result;
                }

                return next();
            }
        );
    };
};