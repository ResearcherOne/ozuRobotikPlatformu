Back-End
	-Middlewares
		-Authanticator: (Authanticates and adds userMail parameter to request)
		
	-Routes (ozurobotik.com)
		/ajax
			/hardwarelibrary
				/hardwarelist (query:hardwareID --all, returns ALL hardwares.)
					/getlist
					/add
				/user
					/borrow
					/return
	-Required Modules
		Model:
			-mongoModule (uses mongoDbWrapper)
				getHardwareCollection(callBack)
				borrowHardware(user,hardwareID,callback)
				returnHardware(user,hardwareID,callback)
				
				getDueDateList()
				getCloseDueDateList()
			-mailerModule (uses sendGridWrapper)
				sendDueDateMail(user)
				sendCloseDueDateNotification(user)
				sendReportToLibrarian(user)
		Controller:
			-schedulerModule (functions triggered end of the day)
				checkDueDates
				checkCloseDueDates
				checkReportDay
			-routes

Data Models
	Hardware {	
		name: "Arduino UNO",
		description: "This well-known development board has taken over the world. If you did not use this you should get into the Arduino world!",
		imageLink: "http://g02.a.alicdn.com/kf/HTB1iMyHLXXXXXcGXXXXq6xXFXXXx/UNO-R3-MEGA328P-ATMEGA16U2-for-Arduino-Compatible-with-the-cable.jpg_220x220.jpg",
		tags: ["arduino", "development board", "uno"],
		total: 4,
		available: 1,
		addedDate: "properDateGoesHere",
		lendData: [{id:"1241231231231", date:"properDateGoesHere"}, {id:"1241231231231", date:"properDateGoesHere"}]
	}

Client Side
	-Post: What hardware to request
	-Auth: Google Auth.
	-Get: get Hardware list (as json object)

User(client-side): (???)
	*Token (Auth.)
	*mail (ozu edu auth.)

TODO
otomatik olarak dosyayi zipleyip adindaki versiyonu 0.1 arttiran script yaz.
stackoverflow'a sormadan once internette arastir. Ardindan MUTLAKA sor
middleware lerin calisma mantigini daha iyi anlamam gerekiyor.

Changelog:
v0.1
*Basarili bir sekilde "tokenList" koleksiyonuna OBJE eklendi.

v0.2
*Basarili bir sekilde koleksiyon find method'u ile veritabanindan cekildi.

v0.3
*Changelog eklendi.

v0.4
*Middleware basarili bir sekilde calistirildi.
*Changelog, overview.md'ye tasindi.
