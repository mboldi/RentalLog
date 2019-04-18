const Schema = require('mongoose').Schema;
const db = require('../config/db');

const User = db.model('user', {
    _id: Number,
    name: String,
    password: String,
    email: String
});

module.exports = User;