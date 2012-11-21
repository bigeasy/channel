#!/usr/bin/env node

require('proof')(1, function (ok) {
  var router = require('../..').createRouter();
  ok(router, 'create router');
});
