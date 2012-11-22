#!/usr/bin/env node

require('proof')(2, function (ok) {
  var router = require('../..').createRouter();
  router.get('/static', function () { ok(1, 'got') });
  ok(router.route('GET', '/static'), 'matched');
});
