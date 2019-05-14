const dateFormat = require('dateformat');
const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const rentModel = requireOption(objectrepository, 'rentModel');
    const deviceModel = requireOption(objectrepository, 'deviceModel');
    const userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        let newRent = new rentModel();

        let quantities = [];

        res.local.rentChange = 0;

        if (typeof req.body['renterName'] !== 'undefined') {
            deviceModel.find({}, function (err, result) {
                if (err) {
                    console.log(err);
                    return next();
                }

                let numofItems = 0;
                let totalValue = 0;

                result.forEach(device => {
                    if (req.body[device._id] !== "0" && !device.deleted) {
                        quantities.push({
                            'id': device._id,
                            'quantity': req.body[device._id]
                        });

                        numofItems += parseInt(req.body[device._id]);
                        totalValue += parseInt(device.value) * parseInt(req.body[device._id]);

                        device.out = parseInt(device.out) + parseInt(req.body[device._id]);
                        device.save();
                    }
                });

                newRent.renter_name = req.body['renterName'];
                newRent.renter_email = req.body['renterEmail'];
                newRent.rented_items = quantities;
                newRent.planned_back_date = req.body['backDate'];
                newRent.out_date = dateFormat(Date.now(), "yyyy-mm-dd");
                newRent.num_of_items = numofItems;
                newRent.total_value = totalValue;

                userModel.findOne(
                    {_id: req.session.userid},
                    function (err, result) {
                        newRent.issuer_name = result.name;

                        newRent.save(function (err) {
                            if (err) console.log(err);
                            res.local.rentChange = 1;
                        })
                    })
                    .exec()
                    .then(function (result) {
                            return res.redirect('/rent/list');
                        }
                    )
                    .catch(function (err) {
                        console.log(err);
                        return next();
                    })

            });
        } else {
            return next();
        }
    };
};