const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const rentModel = requireOption(objectrepository, 'rentModel');
    const deviceModel = requireOption(objectrepository, 'deviceModel');

    return function (req, res, next) {
        rentModel.findOne(
            {_id: req.params.id},
            function (err, result) {
                res.local.rentedItems = [];
                let rentItems = [];

                result.rented_items.forEach(item => {
                    let deviceData = {};

                    deviceModel.findOne(
                        {_id: item.id},
                        function (err, device) {
                            deviceData.name = device.name;
                            deviceData.quantity = item.quantity;

                            rentItems.push(deviceData);

                            if(rentItems.length === result.rented_items.length){
                                for(let i = 0; i < rentItems.length; i = i + 2) {   //tomoritem a dupla megjelenites miatt a pdfben :/
                                    let twodeviceData = {};

                                    twodeviceData.quantity1 = rentItems[i].quantity;
                                    twodeviceData.name1 = rentItems[i].name;

                                    if(typeof rentItems[i + 1] !== 'undefined') {
                                        twodeviceData.quantity2 = rentItems[i + 1].quantity;
                                        twodeviceData.name2 = rentItems[i + 1].name;
                                    }
                                    else {
                                        twodeviceData.quantity2 = "";
                                        twodeviceData.name2 = "";
                                    }

                                    res.local.rentedItems.push(twodeviceData);
                                }

                                return next();
                            }
                        }
                    )
                });
            });
    }
}