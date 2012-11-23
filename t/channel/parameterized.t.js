#!/usr/bin/env node

require('proof')(5, function (ok, equal) {
  var router = require('../..').createRouter();
  router.get('/user/:name', function (object) {
    equal(object.params.name, 'alan');
  });
  router.get('/post/:name/:id', function (object) {
    equal(object.params.name, 'alan');
    equal(object.params.id, '1');
  });
  ok(router.route('GET', '/user/alan', {}), 'matched one parameter');
  ok(router.route('GET', '/post/alan/1', {}), 'matched two parameters');
});
