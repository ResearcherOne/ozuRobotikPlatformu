var express = require('express');
var app = express();

var hardwareLibraryRoute = require('./routes/hardwareLibraryRoute');
var getUserProfile = require('./models/getUserProfileMiddleware');
var allowCrossOrigin = require('./models/allowCrossOriginMiddleware');

app.use(express.static('public'));
app.use('/hardwarelibrary', allowCrossOrigin, getUserProfile, hardwareLibraryRoute);


app.listen(823, function(){
  console.log('Listening on port 823 \n');
});
