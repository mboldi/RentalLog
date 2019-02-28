const express = require('express');
const app = new express();

app.use(express.static('static'));

var port = 3000;
app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
