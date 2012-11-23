! function (definition) {
  if (typeof module == "object" && module.exports) module.exports = definition();
  else if (typeof define == "function" && typeof define.amd == "object") define(definition);
  else this.tz = definition();
} (function () { 
  var slice = [].slice;

  var REGEX = new RegExp('(\\' + '/ . * + ? | ( ) [ ] { } \\'.split(' ').join('|\\') + ')', 'g');

  function die () {
    console.log.apply(console, slice.call(arguments, 0));
    return process.exit(1);
  };

  function say () { return console.log.apply(console, slice.call(arguments, 0)) }

  function regular (text) { return text.replace(REGEX, '\\$1') }

  function parse (path) {
    if (typeof path != "string") return path;
    var parts = path.split(/\//), i, I, $, match = {}, regex = [];
    for (i = 0, I = parts.length; i < I; i++) {
      if ($ = /^:(\w[\w\d]+)$/.exec(parts[i])) {
        if (!match.params) match.params = [];
        match.params.push($[1]);
        regex.push('([^/]+)');
      } else {
        regex.push(regular(parts[i]));
      }
    }
    match.regex = new RegExp('^' + regex.join('\\/') + '$');
    return match;
  }

  function Router () {
    this._routes = [];
  }

  Router.prototype.on = function (methods, path, callback) {
    var routes = this._routes, match = parse(path), route, i, I;
    routes.push(function (method, path, object) {
      var i, I, j, J, $;
      for (i = 0, I = methods.length; i < I; i++) {
        if ((method == method) && ($ = match.regex.exec(path))) {
          if (match.params) {
            object.params = {}; 
            for (j = 0, J = match.params.length; j < J; j++) {
              object.params[match.params[j]] = $[j + 1]; 
            }
          } else {
            object.params = $.slice(1);
          }
          callback.apply(null, slice.call(arguments, 2));
          return true;
        }
      }
    });
  }

  Router.prototype.get = function () {
    this.on([ 'GET' ], arguments[0], arguments[1]);
  }

  Router.prototype.route = function (method, path) {
    var routes = this._routes, i, I, match;
    for (i = 0, I = routes.length; i < I; i++) {
      if (routes[i].apply(null, arguments)) return true;
    }
    return false;
  }

  return { createRouter:  function () { return new Router } }
});
