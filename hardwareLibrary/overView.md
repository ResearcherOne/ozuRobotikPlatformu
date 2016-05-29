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
	node_modules'u githubdan kaldir (best practice.)
	jsdoc dokumentasyon ekle
	ilk kullanilabilir versiyondan sonra mongoose'u kullan.
	returnhardware rotasini tamamla
#Changelog:
	v0.1
		*Basarili bir sekilde "tokenList" koleksiyonuna OBJE eklendi.

	v0.2
		*Basarili bir sekilde koleksiyon find method'u ile veritabanindan cekildi.

	v0.3
		*Changelog eklendi.

	v0.4
		*Middleware basarili bir sekilde calistirildi.
		*Changelog, overview.md'ye tasindi.
		
	v0.5
		*Authantication, hardwareLibrary uygulamasinin kapsami disinda kaldigi icin authentication işi
			"ozuRobotikPlatformu" uygulamasina taşındı.
		
	v0.6
		*Implemented addHardware function in mongoModule