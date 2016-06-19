#Front-End
	

#Back-End
	-Routes
		/librarymanagement
			/adduser
			/deleteuser
			/getusers
			/addhardware
			/deletehardware
		/useractions
			/borrowhardware
			/returnhardware
			/gethardwarelist
	-Required Modules
		Model:
			-mongoModule (uses mongoDbWrapper)
			-mailerModule (uses sendGridWrapper)
				sendDueDateMail(user)
				sendCloseDueDateNotification(user, dueList)
				sendReportToLibrarian(user, dueList)
		Controller:
			-schedulerModule (functions triggered end of the day)
				checkDueDates
				checkCloseDueDates
				checkReportDay
			-routes

#TODO
	cross-origin
+	returnhardware rotasini tamamla
	Authantication ekle (PassportJS, google plus)
	node_modules'u githubdan kaldir (best practice.)
	ilk kullanilabilir versiyondan sonra mongoose'u kullan.
	jsdoc dokumentasyon ekle