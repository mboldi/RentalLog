const Schema = require('mongoose').Schema;
let db = require('../config/db');

let Group = db.model('group', {
    name: String,
    leader: String
});

module.exports = Device;