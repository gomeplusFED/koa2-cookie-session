"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  opts.key = opts.key || 'koa:sid';
  return function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
      var sessionID, sessionObject;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              sessionID = opts.key;
              sessionObject = decode(ctx.cookies.get(sessionID, {}) || encode('{}'));

              ctx.session = sessionObject;
              _context.next = 5;
              return next();

            case 5:
              if (ctx.session === null) {
                ctx.cookies.set(sessionID, '', {
                  expires: new Date(getExpTime(-1))
                });
              } else {
                ctx.cookies.set(sessionID, encode(JSON.stringify(ctx.session)), {
                  expires: new Date(getExpTime(opts.expires || 7)),
                  path: opts.path || '/'
                });
              }

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x2, _x3) {
      return ref.apply(this, arguments);
    };
  }();
};

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

/* jshint ignore:start */
/**
 * @author xiaojue
 * @email designsor@gmail.com
 * @fileoverview koa2-cookie-session
 */

function encode(obj) {
  return new Buffer(obj).toString("base64");
}

function decode(objstr) {
  var session = new Buffer(objstr, "base64").toString();
  return JSON.parse(session);
}

function getExpTime(day) {
  var exp = new Date();
  exp.setTime(exp.getTime() + day * 1000 * 60 * 60 * 24);
  return exp.toGMTString();
}