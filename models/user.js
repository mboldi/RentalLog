const Schema = require('mongoose').Schema;
let db = require('../config/db');

let User = db.model('user', {
    name: String,
    password: String,
    email: String
});

module.exports = User;