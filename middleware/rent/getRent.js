/**
 * getRent
 * description
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const rentModel = requireOption(objectrepository, 'rentModel');
    const deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {
        rentModel.findOne(
            {_id: req.params.id},
            function (err, result) {
                if(typeof result !== 'undefined') {
                    res.local = result;
                    res.local.devices = [];

                    result.rented_items.forEach(item => {
                        let currDevice = {};

                        deviceModel.findOne(
                            {_id: item.id},
                            function (err, result) {
                                currDevice['name'] = result.name;
                                currDevice['value'] = result.value;
                                currDevice['rentQt'] = item.quantity;

                                res.local.devices.push(currDevice);
                            });
                    });

                    return next();
                }
            });

    };
};