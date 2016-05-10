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
  exp.setTime(exp.getTime() + (day * 1000 * 60 * 60 * 24));
  return exp.toGMTString();
}

export default function(opts = {}) {
  opts.key = opts.key || 'koa:sid';
  return async function(ctx, next) {
    var sessionID = opts.key;
    var sessionObject = decode(ctx.cookies.get(sessionID, {
    }) || encode('{}'));
    ctx.session = sessionObject;
    await next();
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
  }
}
