var express = require('express');
var app = express();
var myMiddleware = require('./bin/authenticatorMiddleware')
var hardwareLibrary = require('./routes/hardwareLibrary');

//TO BE DELETED
var mongoModule = require('./bin/mongoModule');
//TO BE DELETED

app.use(myMiddleware);
app.use(express.static('public'));
app.use('/ajax/hardwarelibrary', hardwareLibrary);

app.get('/', function(request,response){
  //mongoModule.insertObject("tokenList", {"token" : "birkan.kolcu", "status" : "available" }, function(err, result){console.log("ok.")});
  //mongoModule.getCollection("tokenList", function(err, result){console.log(JSON.stringify(result))});
  response.send('Hello World!');
  console.log("served successfully");
});

app.listen(3000, function(){
  console.log('Listening on port 3000 \n');
});
