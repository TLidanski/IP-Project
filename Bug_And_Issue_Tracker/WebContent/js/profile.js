$(document).ready(function() {
	"use strict";
	var _url = 'http://localhost:3000';
	var _home = 'http://localhost:8080/Bug_And_Issue_Tracker';

	if ($.cookie('Session')) {
		var userData = JSON.parse($.cookie('Session'));

		$('.page-header').text(userData.fname + ' ' + userData.lname);
		$('#profile-pic').attr('src', userData.picture);
		$('#fname').attr('placeholder', userData.fname);
		$('#lname').attr('placeholder', userData.lname);
		$('#email').attr('placeholder', userData.email);

		$(document).on('click', '#sub-changes', function() {
			$.ajax({
				url: _url + '/users/' + userData.id,
				type: 'PATCH',
				data: {
					fname: ($('#fname').val().length > 0) ? $('#fname').val() : undefined,
					lname: ($('#lname').val().length > 0) ? $('#lname').val() : undefined,
					email: ($('#email').val().length > 0) ? $('#email').val() : undefined,
					password: ($('#password').val().length > 0 
						&& $('#password').val() === $('#conf-pass').val()) ? $('#password').val() : undefined,
					picture: ($('#pic-url').val().length > 0) ? $('#pic-url').val() : undefined
				},
				success: function(data) {
					$.cookie('Session', JSON.stringify(data), {path: '/', expires: 999});
					
					location.reload();
				}
			});
		});
	} else {
		window.location.href = _home + '/index.html';
	}
});