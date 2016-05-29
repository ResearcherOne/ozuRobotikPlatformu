var express = require('express');
var app = express();

var hardwareLibraryRoute = require('./routes/hardwareLibraryRoute');
var getUserProfile = require('./models/getUserProfileMiddleware');

app.use(express.static('public'));
app.use('/hardwarelibrary', getUserProfile, hardwareLibraryRoute);


app.listen(823, function(){
  console.log('Listening on port 823 \n');
});
