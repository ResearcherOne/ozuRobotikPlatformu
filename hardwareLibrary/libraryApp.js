var express = require('express');
var app = express();

var myMiddleware = require('./models/authenticatorMiddleware')
var hardwareLibraryRoute = require('./routes/hardwareLibraryRoute');

app.use(myMiddleware);
app.use(express.static('public'));
app.use('/hardwarelibrary', hardwareLibraryRoute); //isAuthenticated middleware will be used


app.listen(801, function(){
  console.log('Listening on port 801 \n');
});
