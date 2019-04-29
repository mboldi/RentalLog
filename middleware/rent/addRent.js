const dateFormat = require('dateformat');
const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const rentModel = requireOption(objectrepository, 'rentModel');
    const deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {
        let newRent = new rentModel();

        let quantities = [];

        if(typeof req.body['renterName'] !== 'undefined') {
            deviceModel.find({}, function (err, result) {
                let numofItems = 0;
                let totalValue = 0;

                result.forEach(device => {
                    if(req.body[device._id] !== "0") {
                        //quantities[device._id] = req.body[device._id];
                        /*let deviceData = {};
                        deviceData[device._id] = req.body[device._id];*/

                        quantities.push({   'id': device._id,
                                            'quantity': req.body[device._id]});

                        numofItems += parseInt(req.body[device._id]);
                        totalValue += parseInt(device.value);
                    }
                });

                newRent.renter_name = req.body['renterName'];
                newRent.renter_email = req.body['renterEmail'];
                newRent.rented_items = quantities;
                newRent.planned_back_date = req.body['backDate'];
                newRent.out_date = dateFormat(Date.now(), "yyyy-mm-dd");
                newRent.num_of_items = numofItems;
                newRent.total_value = totalValue;

                newRent.save(function (err) {
                    return res.redirect('/rent/list');
                });
            });
        }
        else {
            return next();
        }
    };
};