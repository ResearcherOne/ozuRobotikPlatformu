var mongoModule = require('./mongoModule');

module.exports = function(request, response, next){
	var isAuth = true; //request.isAuth
	request.userMail = "birkan.kolcu@ozu.edu.tr";
	if (isAuth) {
		mongoModule.getUser(request.userMail, function(user){
			if (user !== null) {
				request.libraryUser = user;
				next();
			} else {
				var libraryUser = {
						fullName: "anonymous",
						userMail: "",
						phone: "",
						status: "anonymous",
						borrowLimit: 0,
						reputation: 0,
						hardwareBorrowed: [],
						addedDate: Date.now()
				};
				request.libraryUser = libraryUser;
				next();
			}
		});
	} else {
		var libraryUser = {
				fullName: "anonymous",
				userMail: "",
				phone: "",
				status: "anonymous",
				borrowLimit: 0,
				reputation: 0,
				hardwareBorrowed: [],
				addedDate: Date.now()
			};
		request.libraryUser = libraryUser;
		next();
	}
};