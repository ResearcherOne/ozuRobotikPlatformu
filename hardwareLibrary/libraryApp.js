var express = require('express');
var app = express();
var session = require('express-session');
var mongoStorage = require('connect-mongo')(session);
var appConfig = require('./appConfig');

var hardwareLibraryRoute = require('./routes/hardwareLibraryRoute');
var getUserProfile = require('./models/getUserProfileMiddleware');
var allowCrossOrigin = require('./models/allowCrossOriginMiddleware');

app.use(session({
	secret: 'appConfig.sessionSecret',
	store: new mongoStorage({url: appConfig.mongoModule.url}),
	resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));
app.use('/hardwarelibrary', allowCrossOrigin, getUserProfile, hardwareLibraryRoute);


app.listen(appConfig.applicationPort, function(){
  console.log('Listening on port '+appConfig.applicationPort+' \n');
});
