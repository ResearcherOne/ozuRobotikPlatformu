$(function(){
	$('#addHardware').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		var hardwareData = form.serialize(); //Form verisini URL de gonderilecek formata cevirir.
		
		$.ajax({
			type: 'POST', url: 'http://46.101.251.203:823/hardwarelibrary/librarymanagement/addhardware', data: hardwareData
		}).done(function(responseData){
			form.trigger('reset');
			alert("Description:"+responseData.description+" isSucceed:"+responseData.isSucceed);
		})
	});
	
	$('#deleteHardware').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		var hardwareData = form.serialize(); //Form verisini URL de gonderilecek formata cevirir.
		$.ajax({
			type: 'POST', url: 'http://46.101.251.203:823/hardwarelibrary/librarymanagement/deletehardware', data: hardwareData
		}).done(function(responseData){
			form.trigger('reset');
			alert("Description:"+responseData.description+" isSucceed:"+responseData.isSucceed);
		})
	});
	
	$('#addUser').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		var userData = form.serialize(); //Form verisini URL de gonderilecek formata cevirir.
		
		$.ajax({
			type: 'POST', url: 'http://46.101.251.203:823/hardwarelibrary/librarymanagement/adduser', data: userData
		}).done(function(responseData){
			form.trigger('reset');
			alert("Description:"+responseData.description+" isSucceed:"+responseData.isSucceed);
		})
	});
	
	$('#deleteUser').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		var userMail = form.serialize(); //Form verisini URL de gonderilecek formata cevirir.
		$.ajax({
			type: 'POST', url: 'http://46.101.251.203:823/hardwarelibrary/librarymanagement/deleteuser', data: userMail
		}).done(function(responseData){
			form.trigger('reset');
			alert("Description:"+responseData.description+" isSucceed:"+responseData.isSucceed);
		})
	});
	
	$('#borrowHardware').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		var borrowData = form.serialize(); //Form verisini URL de gonderilecek formata cevirir.
		$.ajax({
			type: 'POST', url: 'http://46.101.251.203:823/hardwarelibrary/useractions/borrowhardware', data: borrowData
		}).done(function(responseData){
			form.trigger('reset');
			alert("Description:"+responseData.description+" isSucceed:"+responseData.isSucceed);
		})
	});
	
	$('#deductHardware').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		var borrowData = form.serialize(); //Form verisini URL de gonderilecek formata cevirir.
		$.ajax({
			type: 'POST', url: 'http://46.101.251.203:823/hardwarelibrary/librarymanagement/deducthardware', data: borrowData
		}).done(function(responseData){
			form.trigger('reset');
			alert("Description:"+responseData.description+" isSucceed:"+responseData.isSucceed);
		})
	});
	
	$('#incrementHardware').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		var borrowData = form.serialize(); //Form verisini URL de gonderilecek formata cevirir.
		$.ajax({
			type: 'POST', url: 'http://46.101.251.203:823/hardwarelibrary/librarymanagement/incrementhardware', data: borrowData
		}).done(function(responseData){
			form.trigger('reset');
			alert("Description:"+responseData.description+" isSucceed:"+responseData.isSucceed);
		})
	});
	
	$('#returnHardware').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		var borrowData = form.serialize(); //Form verisini URL de gonderilecek formata cevirir.
		$.ajax({
			type: 'POST', url: 'http://46.101.251.203:823/hardwarelibrary/useractions/returnhardware', data: borrowData
		}).done(function(responseData){
			form.trigger('reset');
			alert("Description:"+responseData.description+" isSucceed:"+responseData.isSucceed);
		})
	});
});