# koa2-cookie-session

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

Middleware for Koa2 cookie session

## Install
```
npm install koa2-cookie-session --save
```

## Usage
```js
import Koa from "koa";
import session from "koa2-cookie-session";

const app = new Koa();

//Options
app.use(session({
    key: "SESSIONID",   //default "koa:sid"
    expires:3, //default 7
    path:"/" //default "/"
}));

app.use(ctx => {
    ctx.session.user = {
        name: "myname"
    };
    ctx.body = ctx.session;
});


```

## License

MIT


[npm-image]: https://img.shields.io/npm/v/koa2-cookie-session.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa2-cookie-session
[downloads-image]: http://img.shields.io/npm/dm/koa2-cookie-session.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/koa2-cookie-session
[travis-image]: https://img.shields.io/travis/gomeplusFED/koa2-cookie-session.svg?style=flat-square
[travis-url]: https://travis-ci.org/gomeplusFED/koa2-cookie-session
