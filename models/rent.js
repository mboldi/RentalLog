const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Rent = db.model('rent', {
    issuer_name: String,
    renter_name: String,
    renter_email: String,
    rented_items: Array,
    num_of_items: Number,
    out_date: String,
    planned_back_date: String,
    actual_back_date: String,
    total_value: Number
});

module.exports = Rent;