/**
 * auth
 * description
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(typeof req.session.userid === 'undefined') {
            return res.redirect('/login');
        }
        else {
            return next();
        }

    };
};