const renderMW = require('../middleware/generic/render');
const authMW = require('../middleware/generic/auth');

const getDeviceListMW = require('../middleware/device/getDeviceList');
const addRentMW = require('../middleware/rent/addRent');
const getRentMW = require('../middleware/rent/getRent');
const getRentListMW = require('../middleware/rent/getRentList');
const rentBackMW = require('../middleware/rent/rentBack');

module.exports = function (app) {
    let objectRepository = {};

    app.get('/rent/list',
        authMW(objectRepository),
        getRentListMW(objectRepository),
        renderMW(objectRepository, 'rentList')
    );

    app.get('/rent/view/:id',
        authMW(objectRepository),
        getRentMW(objectRepository),
        renderMW(objectRepository, 'viewRent')
    );

    app.use('/rent/back/:id',
        authMW(objectRepository),
        getRentMW(objectRepository),
        rentBackMW(objectRepository),
        renderMW(objectRepository, 'rentBack')
    );

    app.use('/rent/new',
        authMW(objectRepository),
        //az eszkozok listázásához kell majd, hogy ki lehessen választani őket
        getDeviceListMW(objectRepository),
        addRentMW(objectRepository),
        renderMW(objectRepository, 'newRent')
    );
};