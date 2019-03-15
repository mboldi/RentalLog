const express = require('express');
const app = new express();

app.use(express.static('static'));
/*
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/static/login.html");
});*/

require('./routes/deviceRoutes')(app);
require('./routes/outside')(app);
require('./routes/rentRoutes')(app);

var port = 3000;
app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
