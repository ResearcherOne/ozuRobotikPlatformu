var appConfig = require('../appConfig');

var postmark = require("postmark");
var client = new postmark.Client(appConfig.mailApiKey);
 

module.exports = {
	sendMail: function(mailReceiver, mailSender, subject, content){
		client.sendEmail({
			"From": mailSender, 
			"To": mailSender, 
			"Subject": subject, 
			"TextBody": content
		});
	}
}