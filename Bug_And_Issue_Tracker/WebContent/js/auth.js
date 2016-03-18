$(document).ready(function() {
	"use strict";
	var _url = 'http://localhost:3000';
	var _home = 'http://localhost:8080/Bug_And_Issue_Tracker';

//	$(document).on('click', '#log-in', function() {
//		$.get(_url + '/users', {
//			email: $('#login-email').val(),
//			password: $('#login-password').val()
//		}).done(function(data) {
//			console.log(data);
//		});
//	});

	$(document).on('click', '#reg', function() {
		if ($('#password').val() == $('#conf-password').val())
			$.post(_url + '/users', {
				email: $('#email').val(),
				password: $('#password').val(),
				fname: $('#fname').val(),
				lname: $('#lname').val(),
				picture: ""
			}).done(function() {
				window.location.href = _home + '/index.html';
			});
	});
});