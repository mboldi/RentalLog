const express = require('express');
const app = new express();
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(express.static('static'));

app.set('view engine', 'ejs');

app.use(session({
    secret: 'kakaoscsiga',
    cookie: {
        maxAge: 6000000
    },
    resave: true,
    saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

require('./routes/deviceRoutes')(app);
require('./routes/rentRoutes')(app);
require('./routes/outside')(app);

const port = 3000;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
