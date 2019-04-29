const renderMW = require('../middleware/generic/render');

const mainRedirectMW = require('../middleware/generic/mainRedirect');
const checkUserLoginMW = require('../middleware/generic/checkUserLogin');
const logoutMW = require('../middleware/generic/logout');
const addUserMW = require('../middleware/user/addUser');
const sendUserPasswMW = require('../middleware/user/sendUserPassw');

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
    main page, redirects to login if not logged in, otherwise to devicelist
     */
    app.get('/',
        mainRedirectMW(objectRepository)
    );

    /*
    login screen
     */
    app.use('/login',
        checkUserLoginMW(objectRepository),
        renderMW(objectRepository,'login')
    );

    /*
    logout
     */
    app.get('/logout',
        logoutMW(objectRepository)
    );

    /*
    registration page
     */
    app.use('/register',
        addUserMW(objectRepository),
        renderMW(objectRepository, 'register')
    );

    /*
    forgot password page
     */
    app.use('/forgotpassw',
        sendUserPasswMW(objectRepository),
        renderMW(objectRepository, 'forgotPassword')
    );

};