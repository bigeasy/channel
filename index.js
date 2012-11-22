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
    return new RegExp('^' + regular(path) + '$');
  }

  function Router () {
    this._routes = [];
  }

  Router.prototype.on = function (methods, path, callback) {
    var routes = this._routes, match = parse(path), route, i, I;
    routes.push(function (method, path) {
      var i, I, $;
      for (i = 0, I = methods.length; i < I; i++) {
        if ((method == method) && ($ = match.exec(path))) {
          callback.apply(null, $.slice(1));
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
      if (routes[i](method, path)) return true;
    }
    return false;
  }

  return { createRouter:  function () { return new Router } }
});
