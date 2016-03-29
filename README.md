#Back-End
	-Middlewares
		-Authanticator: (Authanticates and adds userMail parameter to request)
			auth. is required to make any call to hardwarelibrary API.
			
		
	-Routes (ozurobotik.com)
		/ajax
			/hardwarelibrary
				/hardwarelist (query:hardwareID --all, returns ALL hardwares.)
					/getlist
					/add
				/user
					/borrow
					/return
			/authentication
					/getToken
					/validateToken