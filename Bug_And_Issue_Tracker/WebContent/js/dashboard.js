$(document).ready(function() {
	"use strict";
	var _url = 'http://localhost:3000';
	var _home = 'http://localhost:8080/Bug_And_Issue_Tracker';

	if ($.cookie('Session')) {
		var userData = JSON.parse($.cookie('Session'));

		$('#dashboard-profile').attr('src', userData.picture);
		$('.profile-usertitle-name').text(userData.fname + ' ' + userData.lname);
		$('.profile-usertitle-job').text(userData.email);

		$.ajax({
			url: _url + '/issues',
			dataType: 'json',
			data: {
				userId: userData.id
			},
			success: function(data) {
				if (data.length != 0) {
					$('#issues').append('<div class="list-group" id="issue-list"></div>');
					$.each(data, function(i, val) {
						var glyph = (val.type == 'task') ? '<i class="fa fa-wrench"></i>' : 
							'<i class="fa fa-bomb"></i>';

						$('#issue-list').append('<button class="list-group-item" id="'+val.id+'">'+
							glyph + ' ' + val.issueTitle +'</button>'
						);
					});
				} else {
					$('#issues').html('<img src="../images/rabota.jpg">');
				}
			}
		});

		$(document).on('click', '.list-group-item', function() {
			$('#issueModal').modal();
			$('#issueModal .modal-title').text($(this).text());
			getDataByIssueId('/issueComments', this.id).done(function() {

			});
			getDataByIssueId('/subTasks', this.id).done(function(data) {
				console.log(data);
				$.each(data, function(i, val) {
					$('#subTaskList').append('<li>'+val.title+'</li>');
				});
			});
		});

		// $(document).on('hidden.bs.modal', '#issueModal', function() {
		// 	$(this).empty();
		// });

	} else {
		window.location.href = _home + '/index.html';
	}

	function getDataByIssueId(url, id, data) {
		return $.get(_url + url, {
			issueId: id
		});
	}
});