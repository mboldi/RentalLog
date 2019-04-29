/**
 * deleteDevice
 * description
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(typeof res.local === 'undefined') {
            return next();
        }
        else {
            res.local.remove(function (err) {
                return res.redirect('/device/list');
            });
        }
    };
};