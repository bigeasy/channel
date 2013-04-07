var app = channel('com.prettyrobots.app');

channel(app('loaded'), function (event) {
  $('#user-submit').click(app('user.submit'));
});

channel(app('user.update'), Error, function (error, data) {
  if (error) $('#status').html(error.message);
  else $('#status').html('Update to ' + data.version);
});

channel(app('user.submit'), function () {
  var data = { username: $('#username').val() };
  $.ajax({
    url: '/user',
    data: data,
    success: app('user.update').shift(),
    error: app('user.update')
  });
});

$(app('loaded'));
