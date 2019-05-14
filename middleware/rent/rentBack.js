/**
 * rentBack
 * description
 */

const dateFormat = require('dateformat');
const async = require('async');
const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const rentModel = requireOption(objectrepository, 'rentModel');
    const deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {
        let numDevicesBack = 0;

        //res.local.rentChange = 0;

        res.local.devices.forEach( device => {
            if(req.body[device._id] === 'on') {
                ++numDevicesBack;
            }
            else {
                return next();
            }

            if(numDevicesBack === res.local.devices.length) {
                rentModel.findOne(
                    {_id: res.local.rent._id},
                    function (err, result) {
                        result.actual_back_date = dateFormat(Date.now(), "yyyy-mm-dd");

                        result.save();

                        return res.redirect('/rent/list');
                    }
                );
            }
        });

/*
        async.series([
            function (callback) {
                res.local.devices.forEach(device => {
                    if (req.body[device._id] === 'on') {
                        ++numDevicesBack;
                    } else {
                        return next();
                    }

                    deviceModel.findOne(
                        {_id: device._id},
                        function (err, devic) {
                            devic.out -= device.quantity;
                            devic.save();

                            if (numDevicesBack === res.local.devices.length)
                                callback(null)
                        });
                });
            }
        ], function (err) {
            rentModel.findOne(
                {_id: res.local._id},
                function (err, result) {
                    result.actual_back_date = dateFormat(Date.now(), "yyyy-mm-dd");

                    result.save();

                    //res.local.rentChange = 1;
                    return res.redirect('/rent/list');
                }
            );
        });*/


    };
};