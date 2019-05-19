/**
 * updateDevice
 * description
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {
        let device = new deviceModel();

        if(typeof res.local === 'undefined')
            res.local = {};

        if ((typeof req.query.deviceName === 'undefined') ||
            (typeof req.query.deviceValue === 'undefined') ||
            (typeof req.query.deviceQuantity === 'undefined')) {
            res.local.err = 'not enough values';
            return next();
        }

        if( typeof req.params.id === 'undefined') {
            device.name = req.query.deviceName;
            device.value = req.query.deviceValue;
            device.quantity = req.query.deviceQuantity;
            device.out = 0;

            device.save(function(err) {
                res.local.device = device;
                res.local.redir = true;
                return next();
            });
        }
        else {
            deviceModel.findOne(
                {_id: req.params.id},
                function (err, result) {
                    if(typeof err !== "undefined"){
                        res.local.err = 'error in findOne';
                        return next();
                    }

                    if(typeof result === 'undefined') {
                        res.local.err = 'item not found';
                        return next();
                    }

                    result.name = req.query.deviceName;
                    result.value = req.query.deviceValue;
                    result.quantity = req.query.deviceQuantity;

                    result.save(function (err) {
                        res.local.redir = true;
                        return next();
                    });
                }
            )
        }
    };
};