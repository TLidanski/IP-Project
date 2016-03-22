$(document).ready(function() {
	"use strict";
	var _url = 'http://localhost:3000';
	var _home = 'http://localhost:8080/Bug_And_Issue_Tracker';

	if ($.cookie('Session')) {
		var userData = JSON.parse($.cookie('Session'));

		$('.page-header').text(userData[0].fname + ' ' + userData[0].lname);
		$('#profile-pic').attr('src', userData[0].picture);
		$('#fname').attr('placeholder', userData[0].fname);
		$('#lname').attr('placeholder', userData[0].lname);
		$('#email').attr('placeholder', userData[0].email);

		$(document).on('click', '#sub-changes', function() {
			$.ajax({
				url: _url + '/users/' + userData[0].id,
				type: 'PATCH',
				data: {
					fname: ($('#fname').val().length > 0) ? $('#fname').val() : undefined,
					lname: ($('#lname').val().length > 0) ? $('#lname').val() : undefined,
					email: ($('#email').val().length > 0) ? $('#email').val() : undefined,
					password: ($('#password').val().length > 0 
						&& $('#pass').val() == $('#conf-pass').val()) ? $('#pass').val() : undefined,
					picture: ($('#pic-url').val().length > 0) ? $('#pic-url').val() : undefined
				},
				success: function() {
					location.reload();
				}
			});
		});
	} else {
		window.location.href = _home + '/index.html';
	}
});