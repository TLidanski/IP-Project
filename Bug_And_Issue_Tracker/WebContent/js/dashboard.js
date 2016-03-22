$(document).ready(function() {
	"use strict";
	var _url = 'http://localhost:3000';
	var _home = 'http://localhost:8080/Bug_And_Issue_Tracker';

	if ($.cookie('Session')) {
		var userData = JSON.parse($.cookie('Session'));
		$('#dashboard-profile').attr('src', userData[0].picture);
	} else {
		window.location.href = _home + '/index.html';
	}
});