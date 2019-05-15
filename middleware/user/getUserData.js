const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        if (typeof res.local === 'undefined')
            res.local = {};

        userModel.findOne(
            {_id: req.session.userid},
            function (err, result) {
                if (err)
                    return next('err');

                res.local.userData = result;

                return next();
            }
        )
    };
};