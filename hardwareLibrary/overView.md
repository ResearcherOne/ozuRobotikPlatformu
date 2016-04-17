#Front-End
	hardwareLibraryPage.js
		var globalHardwareList
		appendToMainContainer(hardwareList)
		clearMainContainer()
		filterHardwareList(tag, globalHardwareList)
	
#Back-End
	-Routes
		/hardwareList (query:hardwareID --all, returns ALL hardwares.)
			/getList
			/addHardware
		/userActions
			/borrowAction
			/returnAction
		/userManagement
			/addUser
			/deleteUser
	-Required Modules
		Model:
			-mongoModule (uses mongoDbWrapper)
				getHardwareArray(function(hardwareArray){})				result format: {hardwareList: []}
				isHardwareExist()
				addHardware(userMail,hardwareObject,function(result){})	result format: {result: boolean}
				borrowHardware(userMail,hardwareID,function(result){}) 	result format: {result: boolean}
				returnHardware(userMail,hardwareID,callback)			result format: {result: boolean}
				
				getDueDateList()
				getCloseDueDateList()
				
				addUser()
				deleteUser()
				isLibrarian()
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
		id: "0"
		name: "Arduino UNO",
		description: "This well-known development board has taken over the world. If you did not use this you should get into the Arduino world!",
		imageLink: "http://g02.a.alicdn.com/kf/HTB1iMyHLXXXXXcGXXXXq6xXFXXXx/UNO-R3-MEGA328P-ATMEGA16U2-for-Arduino-Compatible-with-the-cable.jpg_220x220.jpg",
		tags: ["arduino", "development board", "uno"],
		total: 4,
		available: 1,
		addedDate: "properDateGoesHere",
	}
	libraryUser {
		name: "birkan"
		surname: "kolcu"
		userMail: "birkan.kolcu@ozu.edu.tr"
		phone: "+90532..."
		status: "librarian"
		borrowLimit: 2
		reputation: 8
		hardwareBorrowed: [borrowData,borrowData,...]
	}
	borrowData {
		hardwareID:
		date:
	}
	
#hardwareLibrary API
	initialize(mongoDBinstance)
	createUser
	deleteUser


#TODO
	node_modules'u kaldir (best practice.)

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