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
