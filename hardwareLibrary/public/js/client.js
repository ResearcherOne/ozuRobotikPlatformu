$(function(){
	$('#addHardware').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		var hardwareData = form.serialize(); //Form verisini URL de gonderilecek formata cevirir.
		
		$.ajax({
			type: 'POST', url: '/hardwarelibrary/librarymanagement/addhardware', data: hardwareData
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
			type: 'POST', url: '/hardwarelibrary/librarymanagement/deletehardware', data: hardwareData
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
			type: 'POST', url: '/hardwarelibrary/librarymanagement/adduser', data: userData
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
			type: 'POST', url: '/hardwarelibrary/librarymanagement/deleteuser', data: userMail
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
			type: 'POST', url: '/hardwarelibrary/useractions/borrowhardware', data: borrowData
		}).done(function(responseData){
			form.trigger('reset');
			alert("Description:"+responseData.description+" isSucceed:"+responseData.isSucceed);
		})
	});
});