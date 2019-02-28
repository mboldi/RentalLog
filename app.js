const express = require('express');
const app = new express();
const fs = require('fs');

app.get('/', function(req, res){
  res.sendfile('html/login.html');
});

app.get('/login.html', function(req, res){
  res.sendfile('html/login.html');
});

app.get('/devices', function(req, res){
  res.sendfile('html/devices.html');
});

app.get('/styles.css', function(req, res) {
  res.sendfile('html/styles.css');
});

var port = 3000;
app.listen(port, function() {
  console.log('server listening on port ' + port);
});
