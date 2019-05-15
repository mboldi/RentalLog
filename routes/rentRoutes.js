const renderMW = require('../middleware/generic/render');
const authMW = require('../middleware/generic/auth');

const getDeviceListMW = require('../middleware/device/getDeviceList');
const addRentMW = require('../middleware/rent/addRent');
const getRentMW = require('../middleware/rent/getRent');
const getRentListMW = require('../middleware/rent/getRentList');
const rentBackMW = require('../middleware/rent/rentBack');
const countOutsMW = require('../middleware/device/countOuts');
const generatePdfMW = require('../middleware/rent/genPdf');
const sendPdfMW = require('../middleware/rent/pdfSend');
const getUserDataMW = require('../middleware/user/getUserData');
const getRentedItemsMW = require('../middleware/rent/getRentedItems')

const deviceModel = require('../models/device');
const rentModel = require('../models/rent');
const userModel = require('../models/user');

module.exports = function (app) {

    let objectRepository = {
        userModel: userModel,
        rentModel: rentModel,
        deviceModel: deviceModel
    };

    /*
    list rents
     */
    app.get('/rent/list',
        authMW(objectRepository),
        getRentListMW(objectRepository),
        renderMW(objectRepository, 'rentList')
    );

    app.use('/rent/pdf/:id',
        authMW(objectRepository),
        getUserDataMW(objectRepository),
        getRentedItemsMW(objectRepository),
        generatePdfMW(objectRepository),
        function (req, res) {
            res.redirect('/rent/viewpdf/' + req.params.id);
        }
    );

    app.use('/rent/viewpdf/:id',
        authMW(objectRepository),
        sendPdfMW(objectRepository)
    );

    /*
    view rent with given id
     */
    app.get('/rent/view/:id',
        authMW(objectRepository),
        getUserDataMW(objectRepository),
        getRentMW(objectRepository),
        renderMW(objectRepository, 'viewRent')
    );

    /*
    finish the renting
     */
    app.use('/rent/back/:id',
        authMW(objectRepository),
        getRentMW(objectRepository),
        rentBackMW(objectRepository),
        //countOutsMW(objectRepository),
        /*function (req, res, next) {
            if(res.local.rentChange === 1)
                return res.redirect('/rent/list');
            else
                return next();
        },*/
        renderMW(objectRepository, 'rentBack')
    );

    /*
    add new rent to the system
     */
    app.use('/rent/new',
        authMW(objectRepository),
        //az eszkozok listázásához kell majd, hogy ki lehessen választani őket
        getDeviceListMW(objectRepository),
        addRentMW(objectRepository),
        //countOutsMW(objectRepository),
        renderMW(objectRepository, 'newRent')
    );
};