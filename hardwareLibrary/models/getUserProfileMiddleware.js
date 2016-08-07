var mongoModule = require('./mongoModule');

var anonymousUser = {
				fullName: "anonymous",
				userMail: "",
				phone: "",
				status: "anonymous",
				borrowLimit: 0,
				reputation: 0,
				hardwareBorrowed: [],
				addedDate: Date.now()
			};
			
var debugUser = {
				fullName: "anonymous",
				userMail: "",
				phone: "",
				status: "librarian",
				borrowLimit: 0,
				reputation: 0,
				hardwareBorrowed: [],
				addedDate: Date.now()
			};

module.exports = function(request, response, next){
	if (typeof request.session.token !== 'undefined') {
		authModule.isValidToken(token, function(isValid){
			if (isValid) {
				authModule.getUserMail(request.session.token,function(result) {
					if (result) {
						request.userMail = result;
						mongoModule.getUser(request.userMail, function(user){
							if (user !== null) {
								request.libraryUser = user;
							} else {
								request.libraryUser = anonymousUser;
							}
							next();
						});
					} else {
						request.libraryUser = anonymousUser;
						next();
					}
				});
			} else {
				request.libraryUser = anonymousUser;
				next();
			}
		});
	} else {
		request.libraryUser = anonymousUser;
		next();
	}
};