$(document).ready(function() {
	"use strict";
	var _url = 'http://localhost:3000';
	var _home = 'http://localhost:8080/Bug_And_Issue_Tracker';

	if ($.cookie('Session')) {
		var userData = JSON.parse($.cookie('Session'));

		$('#dashboard-profile').attr('src', userData.picture);
		$('.profile-usertitle-name').text(userData.fname + ' ' + userData.lname);
		$('.profile-usertitle-job').text(userData.email);

		getIssues(userData.id, 'In Progress');

		$(document).on('click', '.issue', function() {
			$('#issues').html('');
			loadTaskView(this.id);
		});

		$(document).on('click', '.cmnt-modal-btn', function() {
			$('#cmnt-modal').modal();
		});

		$(document).on('click', '.cmnt-btn', function() {
			var issueId = $('.cmnt-modal-btn').attr('issue-id');

			$.post(_url + '/issueComments', {
				comment: $('#comment-area').val(),
				userId: userData.id,
				userFname: userData.fname,
				userLname: userData.lname,
				issueId: issueId
			}).done(function() {
				$('#cmnt-modal').modal('hide');
				loadTaskView(issueId);
			});
		});

		$(document).on('click', '#all-tasks', function() {
			getIssues();
			$(document).find('li').removeClass('active');
			$(this).parent().addClass('active');
			$('.panel-heading').text(' All Tasks');
			$('.panel-heading').prepend('<i class="fa fa-code"></i>');
		});

		$(document).on('click', '#overview', function() {
			getIssues(userData.id, 'In Progress');
			$(document).find('li').removeClass('active');
			$(this).parent().addClass('active');
			$('.panel-heading').text(' Assigned to me');
			$('.panel-heading').prepend('<i class="fa fa-code"></i>');
		});

	} else {
		window.location.href = _home + '/index.html';
	}

	function getIssues(userId, status) {
		$.ajax({
			url: _url + '/issues',
			dataType: 'json',
			data: {
				userId: userId,
				status: status
			},
			success: function(data) {
				$('#issues').html('');

				if (data.length != 0) {
					$('#issues').append('<div class="list-group" id="issue-list"></div>');
					$.each(data, function(i, val) {
						var glyph = (val.type == 'task') ? '<i class="fa fa-wrench"></i>' : 
							'<i class="fa fa-bomb"></i>';
						var span = (val.status == 'Resolved') ? 
						'<span class="label label-success pull-right">Resolved</span>' :
						'<span class="label label-primary pull-right">In Progress</span>';

						$('#issue-list').append('<button class="list-group-item issue" issue-type="'
							+val.type+'" id="'+val.id+'">'+
							glyph + ' ' + val.issueTitle + span +'</button>'
						);
					});
				} else {
					$('#issues').html('<img src="../images/rabota.jpg">');
				}
			}
		});
	}

	function getSubTasks(id) {
		return $.get(_url + '/subTasks', {
			issueId: id
		}).done(function(data) {
				
			$.each(data, function(i, val) {
				$('#sub-tasks').append(
					'<a href="#" class="list-group-item sub-task" id="'+val.id+'">'
					+val.title+'</a>'
				);
			});
		});
	}

	function getIssueComments(id) {
		return $.get(_url + '/issueComments', {
			issueId: id
		}).done(function(data) {
			$.each(data, function(i, val) {

				$('#comment-list').append(
					'<a href="#" class="list-group-item"><h4 class="list-group-item-heading">'
					+val.userFname+' '+val.userLname+'</h4></p class="list-group-item-text">'
					+val.comment+'</p></a>'
				);
			});
		});
	}

	function getTaskView(issue) {
		$.get(_home+'/views/tasks.html', {}).done(function(resp) {
			var priority = (issue.priority = 'Major') ? 
			'<i class="fa fa-arrow-up" aria-hidden="true" style="color: red;"></i>' :
			'<i class="fa fa-arrow-down" aria-hidden="true" style="color: green;"></i>';

			var span = (issue.status == 'Resolved') ? 
				'<span class="label label-success">Resolved</span>' :
				'<span class="label label-primary">In Progress</span>';

			$('#issues').html(resp);
			$('#type').append(issue.type);
			$('#assignee').append(issue.userFname + ' ' + issue.userLname);
			$('#priority').append(priority);
			$('#status').append(span);
		
			$('.cmnt-modal-btn').attr('issue-id', issue.id);
		});
	}

	function loadTaskView(id) {
		$.get(_url + '/issues', {id:id}).done(function(data) {
			var issue = data[0];
			getTaskView(issue);
		});
		

		getSubTasks(id);
		getIssueComments(id);
	}
});