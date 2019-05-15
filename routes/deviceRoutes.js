const renderMW = require('../middleware/generic/render');
const authMW = require('../middleware/generic/auth');

const updateDeviceMW = require('../middleware/device/updateDevice');
const countOutsMW = require('../middleware/device/countOuts');
const getDeviceMW = require('../middleware/device/getDevice');
const getDeviceListMW = require('../middleware/device/getDeviceList');
const deleteDeviceMW = require('../middleware/device/deleteDevice');

const deviceModel = require('../models/device');
const rentModel = require('../models/rent');
const userModel = require('../models/user');

module.exports = function (app) {

    const objectRepository = {
        userModel: userModel,
        rentModel: rentModel,
        deviceModel: deviceModel
    };

    /*
    get the list of devices
     */
    app.get('/device/list',
        authMW(objectRepository),
        getDeviceListMW(objectRepository),
        renderMW(objectRepository, 'deviceList')
    );

    /*
    get device that has the given id
    */
    app.use('/device/edit/:id',
        authMW(objectRepository),
        getDeviceMW(objectRepository),
        updateDeviceMW(objectRepository),
        function(req, res, next) {
            if(res.local.redir)
                return res.redirect('/device/list');

            return next();
        },
        renderMW(objectRepository, 'editDevice')
    );

    /*
    add new device
     */
    app.use('/device/new',
        authMW(objectRepository),
        updateDeviceMW(objectRepository),
        function(req, res, next) {
            if(res.local.redir)
                return res.redirect('/device/list');

            return next();
        },
        renderMW(objectRepository, 'newDevice')
    );

    /*
    delete device
     */
    app.use('/device/:id/delete',
        authMW(objectRepository),
        getDeviceMW(objectRepository),
        deleteDeviceMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/device/list');
        }
    );
};