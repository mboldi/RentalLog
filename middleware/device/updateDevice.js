/**
 * updateDevice
 * description
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {
        let device = new deviceModel();

        if ((typeof req.query.deviceName === 'undefined') ||
            (typeof req.query.deviceValue === 'undefined') ||
            (typeof req.query.deviceQuantity === 'undefined')) {
            return next();
        }

        if( typeof req.params.id === 'undefined') {
            device.name = req.query.deviceName;
            device.value = req.query.deviceValue;
            device.quantity = req.query.deviceQuantity;

            device.save(function(err) {
                return res.redirect('/device/list');
            });
        }
        else {
            deviceModel.findOne(
                {_id: req.params.id},
                function (err, result) {
                    result.name = req.query.deviceName;
                    result.value = req.query.deviceValue;
                    result.quantity = req.query.deviceQuantity;

                    result.save(function (err) {
                        return res.redirect('/device/list');
                    });
                }
            )
        }
    };
};