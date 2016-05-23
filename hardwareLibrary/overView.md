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
#Data Models
	Hardware {
		name: "Arduino UNO",
		description: "This well-known development board has taken over the world. If you did not use this you should get into the Arduino world!",
		imageLink: "http://g02.a.alicdn.com/kf/HTB1iMyHLXXXXXcGXXXXq6xXFXXXx/UNO-R3-MEGA328P-ATMEGA16U2-for-Arduino-Compatible-with-the-cable.jpg_220x220.jpg",
		tags: ["arduino", "development board", "uno"],
		total: 4,
		available: 1,
		addedDate: "properDateGoesHere",
	}
	libraryUser {
		fullName: "birkan kolcu"
		userMail: "birkan.kolcu@ozu.edu.tr"
		phone: "+90532..."
		status: "librarian"
		borrowLimit: 2
		reputation: 8
		hardwareBorrowed: [borrowData,borrowData,...]
		borrowLog: [borrowLogData, borrowLogData,...]
		addedDate: "properDateGoesHere"
	}
		borrowData {
			hardwareName:
			date:
		}
		
		borrowLog {
			hardwareName:
			borrowDate:
			returnDate:
		}

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