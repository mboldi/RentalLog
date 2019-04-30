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

                    let ind = 1;
                    const itemNum = result.rented_items.length;

                    result.rented_items.forEach(item => {
                        let currDevice = {};

                        deviceModel.findOne(
                            {_id: item.id},
                            function (err, result) {
                                if(result !== null) {
                                    currDevice['ind'] = ind++;
                                    currDevice['name'] = result.name;
                                    currDevice['value'] = result.value;
                                    currDevice['rentQt'] = item.quantity;
                                    currDevice['_id'] = result._id;

                                    res.local.devices.push(currDevice);

                                    if (res.local.devices.length === itemNum) {
                                        return next();
                                    }
                                }
                            });
                    });

                }
                else {
                    return next();
                }
            });

    };
};