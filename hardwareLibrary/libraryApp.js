var express = require('express');
var app = express();
var myMiddleware = require('./bin/authenticatorMiddleware')
var hardwareLibrary = require('./routes/hardwareLibrary');

app.use(myMiddleware);
app.use(express.static('public'));
app.use('/ajax/hardwarelibrary', hardwareLibrary);

app.get('/', function(request,response){
  response.send('Hello World!');
  console.log("served successfully");
});

app.listen(3000, function(){
  console.log('Listening on port 3000 \n');
});
