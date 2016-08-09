var appConfig = require('../appConfig');

var postmark = require("postmark");
var client = new postmark.Client(appConfig.mailApiKey);
 

module.exports = {
	sendMail: function(mailReceiver, mailSender, subject, content){
		console.log(mailSender);
		console.log(mailReceiver);
		console.log(subject);
		console.log(content);
		client.sendEmail({
			"From": mailSender, 
			"To": mailReceiver, 
			"Subject": subject, 
			"TextBody": content
		});
	}
}