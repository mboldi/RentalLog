const requireOption = require('../common').requireOption;
const dateFormat = require('dateformat');
const ejs = require('ejs');
const pdf = require('html-pdf');
const pdfOptions = {"border": "2cm"};

module.exports = function (objectrepository) {

    const rentModel = requireOption(objectrepository, 'rentModel');

    return function (req, res, next) {

        rentModel.findOne(
            {_id: req.params.id},
            function (err, rent) {
                let data = {};

                data.rent = rent;

                data.groupName = req.body.groupName;
                data.groupLeader = req.body.groupLeader;
                data.responsible = req.body.responsible;
                data.responsibleId = req.body.responsibleId;
                data.uzFel = req.body.uzFel;
                data.opGuy = req.body.opGuy;

                data.today = dateFormat(Date.now(), "yyyy.mm.dd.");

                let outDateSplit = rent.out_date.split("-");
                data.outDate = outDateSplit[0] + "." + outDateSplit[1] + "." + outDateSplit[2] + ".";

                let backDateSplit = rent.planned_back_date.split("-");
                data.plannedBackDate = backDateSplit[0] + "." + backDateSplit[1] + "." + backDateSplit[2] + ".";

                data.deviceList = res.local.rentedItems;

                ejs.renderFile('./templates/kiviteli_template.ejs',
                    {data: data},
                    function (err, result) {
                        if (result) {
                            pdf.create(result, pdfOptions).toFile('./pdfs/kiviteli_' + req.params.id + '.pdf', function (err, asd) {
                                if (err) return console.log(err);
                                res.pdfName = asd.filename;
                                //console.log(asd);

                                //console.log(asd.filename);
                                return next();
                            });
                        } else {
                            console.log(err);
                            return next();
                        }
                    });
            });
    };
};