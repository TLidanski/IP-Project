$(document).ready(function() {
	"use strict";
	var _url = 'http://localhost:3000';
	var _home = 'http://localhost:8080/Bug_And_Issue_Tracker';

	if ($.cookie('Session'))
		$('#go').attr('href', _home + '/views/dashboard.html');
});