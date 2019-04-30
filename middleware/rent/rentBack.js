/**
 * rentBack
 * description
 */

const dateFormat = require('dateformat');
const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const rentModel = requireOption(objectrepository, 'rentModel');

    return function (req, res, next) {
        let numDevicesBack = 0;

        res.local.devices.forEach( device => {
            if(req.body[device._id] === 'on') {
                ++numDevicesBack;
            }
            else {
                return next();
            }

            if(numDevicesBack === res.local.devices.length) {
                rentModel.findOne(
                    {_id: res.local._id},
                    function (err, result) {
                        result.actual_back_date = dateFormat(Date.now(), "yyyy-mm-dd");

                        result.save();

                        return res.redirect('/rent/list');
                    }
                );
            }
        });

    };
};