Back-End
	-Middlewares
		-Authanticator: (Authanticates and adds userMail parameter to request)
		-Routes

	-Routes (ozurobotik.com)
		/ajax
			/hardwarelibrary
				hardwarelist (query:hardwareID --all, returns ALL hardwares.)
	-Required Modules
		-mongoModule
			getCollection(collectionName,callBack)
		-mailModule


Client Side
	-Post: What hardware to request
	-Auth: Google Auth.
	-Get: get Hardware list (as json object)

User(client-side): (???)
	*Token (Auth.)
	*mail (ozu edu auth.)
