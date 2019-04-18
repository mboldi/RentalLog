const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Device = db.model('device', {
    _id: Number,
    name: String,
    value: Number,
    quantity: Number
});

module.exports = Device;