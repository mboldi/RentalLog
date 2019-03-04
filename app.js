const express = require('express');
const app = new express();

app.use(express.static('static'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/static/login.html");
});

var port = 3000;
app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
