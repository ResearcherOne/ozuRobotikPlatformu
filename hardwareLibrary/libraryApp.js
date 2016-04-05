var express = require('express');
var app = express();

var myMiddleware = require('./models/authenticatorMiddleware')
var hardwareLibraryRoute = require('./routes/hardwareLibraryRoute');

app.use(myMiddleware);
app.use(express.static('public'));
app.use('/hardwarelibrary', hardwareLibraryRoute);


app.listen(80, function(){
  console.log('Listening on port 80 \n');
});
