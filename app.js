const express = require('express');
const app = new express();

app.set('view engine', 'ejs');

//app.use(express.static('static'));
/*
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/static/login.ejs");
});*/

require('./routes/deviceRoutes')(app);
require('./routes/rentRoutes')(app);
require('./routes/outside')(app);

var port = 3000;
app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
