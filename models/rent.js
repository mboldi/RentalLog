const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Rent = db.model('rent', {
    _id: Number,
    renter_name: String,
    renter_email: String,
    rented_items: Array,
    planned_back_date: Date,
    actual_back_date: Date
});

module.exports = Rent;