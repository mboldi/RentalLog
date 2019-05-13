const path = require('path');
const fs = require('fs');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        var data = fs.readFileSync(path.resolve("pdfs/kiviteli_" + req.params.id + ".pdf"));
        res.contentType("application/pdf");
        res.send(data);
        return next();
    };
};