const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {
    const deviceModel = requireOption(objectrepository, 'deviceModel');
    const rentModel = requireOption(objectrepository, 'rentModel');

    return function (req, res, next) {
        if (res.local.rentChange === 1) {
            deviceModel.find({},
                function (err, devices) {
                    if (typeof devices !== 'undefined') {
                        rentModel.find({},
                            function (err, rents) {
                                if (typeof rents.length != 0) {
                                    devices.forEach(device => {
                                        let deviceOut = 0;

                                        rents.forEach(rent => {
                                            if (typeof rent.actual_back_date === "undefined") {
                                                rent.rented_items.forEach(rentedItem => {
                                                    if (rentedItem.id == device._id)
                                                        deviceOut += rentedItem.quantity;
                                                });
                                            }
                                        });

                                        device.out = deviceOut;
                                        device.save();
                                    });
                                } else {
                                    devices.forEach(device => {
                                        device.out = 0;
                                        device.save();
                                    });
                                }
                            }
                        ).then(next());
                    } else {
                        return next();
                    }
                });
        } else {
            return next();
        }
    }
};