/**
 * getDeviceList
 * description
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {
        res.local = [
            {
                _id: 0,
                name: "Sony PMW-320",
                price: 4000000,
                quantity: 2,
                out: 0
            },
            {
                _id: 1,
                name: "Sony PMW-EX3",
                price: 2500000,
                quantity: 1,
                out: 0
            },
            {
                _id: 2,
                name: "Canon UHD Digisuper 90",
                price: 52225000,
                quantity: 1,
                out: 0
            }
        ];

        return next();
    };
};