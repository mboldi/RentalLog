const express = require('express');
const app = new express();
const fs = require('fs');

app.get('/', function(req, res){
  res.sendfile('html/login.html');
});

app.get('/styles.css', function(req, res) {
  /*res.writeHead(200, {'Content-Type': 'text/css'});
  fs.readfile('html/styles.css', null, function(error, data) {
    if(error) {
      res.writeHead(404);
      res.write('File not found!');
    }
    else {
      res.write('alma');
    }
  });
  res.end();*/
  res.sendfile('html/styles.css');
});

var port = 3000;
app.listen(port, function() {
  console.log('server listening on port ' + port);
});
