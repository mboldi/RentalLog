const Schema = require('mongoose').Schema;
let db = require('../config/db');

let Device = db.model('device', {
    name: String,
    value: Number,
    quantity: Number,
    out: Number,
    deleted: Boolean
});

module.exports = Device;