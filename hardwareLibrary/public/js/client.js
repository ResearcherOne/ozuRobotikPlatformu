$(function(){
	$('form').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		var hardwareData = form.serialize(); //Form verisini URL de gonderilecek formata cevirir.
		
		$.ajax({
			type: 'POST', url: '/hardwarelibrary/hardwarelist/addhardware', data: hardwareData
		}).done(function(responseData){
			form.trigger('reset');
			alert("Hardware Description:"+responseData.description+" Result:"+responseData.result);
		})
	})
});

/*
var newHardware = {
		name: postedHardware.name,
		description: postedHardware.description,
		imageLink: postedHardware.imageLink,
		tags: postedHardware.tags,
		total: postedHardware.total,
		available: postedHardware.available,
		addedDate: Date.now(),
	};
*/