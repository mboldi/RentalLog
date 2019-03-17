const renderMW = require('../middleware/generic/render');

const mainRedirectMW = require('../middleware/generic/mainRedirect');
const checkUserLoginMW = require('../middleware/generic/checkUserLogin');
const logoutMW = require('../middleware/generic/logout');
const addUserMW = require('../middleware/user/addUser');
const sendUserPasswMW = require('../middleware/user/sendUserPassw');


module.exports = function (app) {

    let objectRepository = {};

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
        renderMW(objectRepository,'Login')
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
        renderMW(objectRepository, 'Register')
    );

    /*
    forgot password page
     */
    app.use('/forgotpassw',
        sendUserPasswMW(objectRepository),
        renderMW(objectRepository, 'Forgotpassword')
    );

};