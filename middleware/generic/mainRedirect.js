/**
 * mainRedirect
 * description
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        return res.redirect('/login');//meg kell majd vizsgálni, hogy be van-e jelentkezve a felhasználó
    };
};