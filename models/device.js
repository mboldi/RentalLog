const Schema = require('mongoose').Schema;
let db = require('../config/db');

let Device = db.model('device', {
    name: String,
    value: Number,
    quantity: Number
});

module.exports = Device;